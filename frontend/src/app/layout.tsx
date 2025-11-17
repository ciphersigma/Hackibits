import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "./components/ConditionalLayout";
import { ThemeProvider } from "./context/ThemeContext";

export const metadata: Metadata = {
  title: "HackiBits - Learn. Build. Secure.",
  description: "Democratize cybersecurity education with affordable, modular, and ethical hacking hardware kits for students. Made in India.",
  keywords: "cybersecurity, education, hardware, hacking, ethical hacking, India, students, RFID, WiFi, security",
  authors: [{ name: "Prashant Chettiyar" }],
  openGraph: {
    title: "HackiBits - Learn. Build. Secure.",
    description: "Democratize cybersecurity education with affordable, modular hardware kits",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "HackiBits - Learn. Build. Secure.",
    description: "Democratize cybersecurity education with affordable, modular hardware kits",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            })();
          `
        }} />
      </head>
      <body className="font-inter antialiased bg-white dark:bg-[#0A0F1F] text-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
        <ThemeProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
