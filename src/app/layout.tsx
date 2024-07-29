import "./globals.css";

type PageProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: PageProps) {
  return <>{children}</>;
}
