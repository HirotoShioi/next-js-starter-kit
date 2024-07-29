import "./globals.css";

type PageProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default function RootLayout({ children, params }: PageProps) {
  return <>{children}</>;
}
