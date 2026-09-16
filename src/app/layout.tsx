import type { Metadata } from "next";
import { Space_Grotesk , Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Space_Grotesk ({
 variable: '--font-space-grotesk',
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pooja Services Online | Book Authentic Hindu Poojas",
  description: "Book authentic Hindu pooja and spiritual services with experienced priests. Explore traditional poojas, ceremonies and devotional services with easy online booking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
