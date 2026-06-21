import { Router } from "express";
import { z } from "zod";
import { locations, menuItems } from "@los-aguachiles/shared";
import { prisma } from "../db.js";

const itemSchema = z.object({
  menuItemId: z.string(),
  quantity: z.number().int().positive().max(25)
});

const orderSchema = z.object({
  customerName: z.string().trim().min(2),
  customerPhone: z.string().trim().min(7),
  locationId: z.string(),
  pickupDate: z.string(),
  pickupTime: z.string().regex(/^\d{2}:\d{2}$/),
  notes: z.string().trim().max(500).optional(),
  items: z.array(itemSchema).min(1)
});

function parsePickupDate(dateValue: string, timeValue: string) {
  const [year, month, day] = dateValue.split("-").map(Number);
  const [hours, minutes] = timeValue.split(":").map(Number);

  if (!year || !month || !day || Number.isNaN(hours) || Number.isNaN(minutes)) {
    return null;
  }

  return new Date(year, month - 1, day, hours, minutes, 0, 0);
}

function minutesFromTime(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

export const ordersRouter = Router();

ordersRouter.post("/", async (req, res) => {
  const parsed = orderSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: "INVALID_ORDER", details: parsed.error.flatten() });
  }

  const location = locations.find((item) => item.id === parsed.data.locationId);

  if (!location) {
    return res.status(400).json({ error: "INVALID_LOCATION" });
  }

  const pickupDate = parsePickupDate(parsed.data.pickupDate, parsed.data.pickupTime);
  const pickupMinutes = minutesFromTime(parsed.data.pickupTime);
  const openMinutes = minutesFromTime(location.openTime);
  const lastPickupMinutes = minutesFromTime(location.closeTime) - 30;

  if (!pickupDate || pickupMinutes < openMinutes || pickupMinutes > lastPickupMinutes) {
    return res.status(400).json({ error: "INVALID_PICKUP_TIME" });
  }

  const orderItems = parsed.data.items.map((orderItem) => {
    const menuItem = menuItems.find((item) => item.id === orderItem.menuItemId);

    if (!menuItem) {
      return null;
    }

    return {
      menuItem,
      quantity: orderItem.quantity,
      lineTotal: orderItem.quantity * menuItem.priceMxn
    };
  });

  if (orderItems.some((item) => item === null)) {
    return res.status(400).json({ error: "INVALID_MENU_ITEM" });
  }

  const validItems = orderItems.filter((item): item is NonNullable<typeof item> => item !== null);
  const subtotalMxn = validItems.reduce((sum, item) => sum + item.lineTotal, 0);

  const order = await prisma.pickupOrder.create({
    data: {
      customerName: parsed.data.customerName,
      customerPhone: parsed.data.customerPhone,
      locationId: location.id,
      locationName: location.city,
      pickupDate,
      pickupTime: parsed.data.pickupTime,
      notes: parsed.data.notes,
      subtotalMxn,
      items: {
        create: validItems.map((item) => ({
          menuItemId: item.menuItem.id,
          name: item.menuItem.name,
          quantity: item.quantity,
          unitPrice: item.menuItem.priceMxn,
          lineTotal: item.lineTotal
        }))
      }
    },
    include: {
      items: true
    }
  });

  return res.status(201).json({ order });
});
