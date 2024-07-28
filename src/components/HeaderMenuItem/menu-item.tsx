"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function HeaderMenuItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <DropdownMenuItem
      onClick={() => router.push(href)}
      className="cursor-pointer"
    >
      {children}
    </DropdownMenuItem>
  );
}
