import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchProvider from "@/components/ٍSearchProvider";
import ErrorBoundary from "@/components/ErrorBoundary";



export const metadata: Metadata = {
  title: {
    default: "FreshCart",
    template: "FreashCart online store "
  },
  description: "Shopcart online store , Your one stop shop for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <SearchProvider>
        <ErrorBoundary>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ErrorBoundary>
      </SearchProvider>
    </ClerkProvider>
  );
}
