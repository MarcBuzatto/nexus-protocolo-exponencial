import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXUS — Protocolo Exponencial",
  description:
    "Você é o último hacker. REAPER dobra a cada turno. Resolva a matemática antes que 1024 servidores caiam. Jogo educativo com IA.",
  keywords: [
    "nexus",
    "jogo de matemática",
    "exponencial",
    "logaritmo",
    "PA",
    "PG",
    "cyberpunk",
    "educativo",
  ],
  authors: [
    { name: "Marc Correa Buzatto" },
    { name: "João Pedro Sandi" },
    { name: "Bruno Neiva Puntoni" },
    { name: "Giovanne Silva" },
  ],
  openGraph: {
    title: "NEXUS — Protocolo Exponencial",
    description:
      "Jogo educativo cyberpunk: pare o vírus REAPER usando Exponencial, Logaritmo, PA e PG.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05050a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&family=Orbitron:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
