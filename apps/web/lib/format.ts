export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0
  }).format(value);
}

export function lastPickupLabel(closeTime: string) {
  const [hours, minutes] = closeTime.split(":").map(Number);
  const close = new Date(2026, 0, 1, hours, minutes);
  const lastPickup = new Date(close.getTime() - 30 * 60 * 1000);

  return `${String(lastPickup.getHours()).padStart(2, "0")}:${String(lastPickup.getMinutes()).padStart(2, "0")}`;
}
