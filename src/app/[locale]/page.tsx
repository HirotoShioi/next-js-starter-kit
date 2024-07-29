import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { pageWrapperStyles } from "@/styles/common";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations();
  return (
    <div className={cn(pageWrapperStyles, "max-w-3xl space-y-8")}>
      <h1 className="text-2xl font-bold">My App</h1>
      <Button size={"lg"} asChild>
        <Link href="/sign-in">Sign in</Link>
      </Button>
    </div>
  );
}
