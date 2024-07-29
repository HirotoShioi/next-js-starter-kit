import ProtectedPage from "@/components/ProtectedPage/protected-page";
import { cn } from "@/lib/utils";
import { pageWrapperStyles } from "@/styles/common";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <ProtectedPage>
      <div className={cn(pageWrapperStyles, "space-y-8")}>
        <h1>Chat</h1>
      </div>
    </ProtectedPage>
  );
}
