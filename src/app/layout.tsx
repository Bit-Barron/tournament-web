import QueryProvider from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex h-full flex-col">
              <ScrollArea className="flex-grow">{children}</ScrollArea>
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
