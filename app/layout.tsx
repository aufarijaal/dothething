import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ModalContainer, ModalProvider } from "@faceless-ui/modal";
import { cookies } from "next/headers";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Do The Thing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");

  return (
    <html lang="en" data-theme={theme?.value ?? "default"}>
      <body className={`${inter.className}`}>
        <NextTopLoader color="oklch(var(--a))" showSpinner={false} />
        <Toaster
          closeButton
          duration={2000}
          toastOptions={{
            unstyled: true,
            classNames: {
              toast: "w-full p-4 shadow-sm shadow-base-300 flex font-sans items-center gap-4",
              content: "text-sm w-full",
              success: "bg-success text-success-content",
              info: "bg-info text-info-content",
              warning: "bg-warning text-warning-content",
              error: "bg-error text-error-content",
              default: "bg-base-100 text-base-content",
              description: "text-white text-xs",
              closeButton: "bg-base-100 text-base-content",
            },
          }}
        />
        <ModalProvider transTime={250}>
          <ModalContainer className="grid place-items-center bg-base-200/70" />
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
