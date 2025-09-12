import "./globals.css";
import { AppProvider } from "./appContext";

export default function RootLayout({ children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">

      <body > <AppProvider>{children}</AppProvider> </body>

    </html>
  );
}
