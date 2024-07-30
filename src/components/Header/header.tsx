"use client";
import { Link, useRouter } from "@/lib/i18n";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { AuthUser, signOut } from "aws-amplify/auth";

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
export function SignOutItem({ user }: { user: AuthUser | null }) {
  const router = useRouter();
  if (!user) {
    return null;
  }
  return (
    <DropdownMenuItem
      onClick={() => signOut().then(() => router.push("/"))}
      className="cursor-pointer"
    >
      Sign Out
    </DropdownMenuItem>
  );
}

function HeaderActions({ user }: { user: AuthUser | null }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {!!user ? (
          <>
            <HeaderMenuItem href="/todos">Todos</HeaderMenuItem>
            <HeaderMenuItem href="/chat">Chat</HeaderMenuItem>
            <SignOutItem user={user} />
          </>
        ) : (
          <HeaderMenuItem href="/sign-in">Sign In</HeaderMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default function Header() {
  const { user } = useAuthenticator((c) => [c.user]);
  return (
    <header className="bg-primary text-primary-foreground py-4 px-8 border-b">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link
            href={!!user ? "/todos" : "/"}
            className="flex gap-2 items-center text-xl"
          >
            <h1 className="text-2xl">My App</h1>
          </Link>
        </div>
        <div className="flex items-center">
          <HeaderActions user={user} />
        </div>
      </div>
    </header>
  );
}
