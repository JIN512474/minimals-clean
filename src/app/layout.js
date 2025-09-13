import "./globals.css";
import { LanguageProvider } from "../components/LanguageProvider";

export const metadata = {
  title: "MINIMALS — Small Frame, Big Style",
  description: "160~170cm 전용핏, 수선 없이 입는 완벽 비율.",
};

export default function RootLayout({ children }) {
  // 서버 컴포넌트여도 내부에서 클라이언트 Provider 렌더링 가능
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
