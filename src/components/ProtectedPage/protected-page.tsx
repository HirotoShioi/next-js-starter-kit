import { getCurrentUser } from "@/lib/auth/server";
import { redirect } from "@/lib/i18n";

export default async function ProtectedPage({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/");
    }
    return <>{children}</>;
}