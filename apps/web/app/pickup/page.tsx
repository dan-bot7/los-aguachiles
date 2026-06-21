import type { Metadata } from "next";
import { PickupOrder } from "../../components/PickupOrder";

export const metadata: Metadata = {
  title: "Pick-up"
};

export default function PickupPage() {
  return (
    <main className="pt-[var(--header-height)]">
      <PickupOrder />
    </main>
  );
}
