import Chat from "@/components/Chat/chat";
import ProtectedPage from "@/components/ProtectedPage/protected-page";
import { cn } from "@/lib/utils";
import { pageWrapperStyles } from "@/styles/common";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <ProtectedPage>
      <div className={cn(pageWrapperStyles)}>
        <Chat />
      </div>
    </ProtectedPage>
  );
}
