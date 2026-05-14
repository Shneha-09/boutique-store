import "./globals.css";

export const metadata = {
  title: "Boutique Store",
  description: "Amazon Style Boutique Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}