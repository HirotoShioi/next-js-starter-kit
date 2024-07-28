import { Link } from "@/lib/i18n";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { HeaderMenuItem } from "../HeaderMenuItem/menu-item";
function HeaderActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <HeaderMenuItem href="/">Todos</HeaderMenuItem>
        <HeaderMenuItem href="/chat">Chat</HeaderMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-8 border-b">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex gap-2 items-center text-xl">
            <h1 className="text-2xl">My App</h1>
          </Link>
        </div>
        <div className="flex items-center">
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}
