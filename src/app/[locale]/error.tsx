"use client";
import { cn } from "@/lib/utils";
import { pageWrapperStyles } from "@/styles/common";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type PageProps = {
  error: Error & { digest?: string };
};

export default function ErrorPage({ error }: PageProps) {
  console.log(error);
  return (
    <main className={cn(pageWrapperStyles, "flex flex-col items-center gap-8")}>
      <h1 className="text-2xl text-center">Oops! Something went wrong</h1>
      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </main>
  );
}
