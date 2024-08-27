import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "../components/provider";
import { dark } from "@clerk/themes";

const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Base",
  description: "Welcome to the Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: dark,
      variables: {
        colorPrimary: "#6366f1", // Purple color for buttons
        borderRadius: "8px",     // Rounded corners for input and buttons
        colorBackground: "#1f1f1f", // Background color of the login form
        colorText: "#ffffff",    // Text color
      },
      elements: {
        formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors", // Primary button style
        formFieldInput: "bg-gray-800 text-white border-none py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500", // Input fields style
        formFieldLabel: "text-sm text-gray-300", // Label for the inputs
        formHeader: "text-white text-4xl font-semibold ", // Updated "Sign In" header style with larger text
        formFieldText: "text-indigo-500 hover:text-indigo-600 text-lg text-bold underline cursor-pointer", // Link style (Forgot password, etc.)
        card: "bg-gray-900 shadow-lg rounded-lg p-8 space-y-3 text-left font-bold", // Card background, padding, and spacing
      },
    }}
  >
  
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} flex justify-center items-center h-screen`}>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
