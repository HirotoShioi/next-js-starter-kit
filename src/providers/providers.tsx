import Auth from "./AuthProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Auth />
      {children}
    </>
  );
}
