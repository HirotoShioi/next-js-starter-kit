import { Link } from "@/lib/i18n";

export default function Header() {
  return (
    <header className="bg-primary text-white py-4 px-8">
      <Link href="/">
        <h1 className="text-2xl">My App</h1>
      </Link>
    </header>
  );
}
