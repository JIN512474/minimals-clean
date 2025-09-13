import "./globals.css";
import { LanguageProvider } from "../components/LanguageProvider";

export const metadata = {
  title: "MINIMALS — Small Frame, Big Style",
  description: "160~170cm 전용핏, 수선 없이 입는 완벽 비율.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-neutral-900">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
