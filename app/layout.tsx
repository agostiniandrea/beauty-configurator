import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beauty Configurator",
  description: "Configure your perfect beauty look",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
