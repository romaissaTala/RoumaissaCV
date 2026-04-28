import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Talaboulma Roumaissa — Mobile Developer & AI Engineer",
  description:
    "Portfolio de Roumaissa Talaboulma — Développeuse Flutter, Ingénieure en Intelligence Artificielle. Spécialisée en applications mobiles cross-platform, deep learning, NLP et computer vision.",
  keywords: [
    "Flutter developer",
    "Mobile developer Algeria",
    "Développeuse Flutter",
    "Ingénieure IA",
    "USTHB",
    "Talaboulma Roumaissa",
  ],
  openGraph: {
    title: "Talaboulma Roumaissa — Mobile Developer & AI Engineer",
    description: "Portfolio CV — Flutter · IA · React",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased bg-dark text-white">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#222",
              color: "#fff",
              border: "1px solid #333",
            },
            success: {
              iconTheme: { primary: "#D4A843", secondary: "#222" },
            },
          }}
        />
      </body>
    </html>
  );
}
