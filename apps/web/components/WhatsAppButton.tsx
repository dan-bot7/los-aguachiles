"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@los-aguachiles/shared";

type WhatsAppButtonProps = {
  message: string;
  children: React.ReactNode;
  className?: string;
  size?: number;
};

export function WhatsAppButton({ message, children, className = "btn btn-primary", size = 18 }: WhatsAppButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.open(buildWhatsAppUrl(message), "_blank", "noopener")}
    >
      <MessageCircle size={size} aria-hidden="true" />
      {children}
    </button>
  );
}
