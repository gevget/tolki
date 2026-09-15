import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Наши идеи — продуктовая лаборатория толк+юсайт",
  description:
    "Собственные продукты, цифровые сервисы, AI-инструменты, B2B-платформы и продуктовые концепции толк+юсайт.",
  applicationName: "толк+юсайт / Наши идеи",
  openGraph: {
    title: "толк+юсайт / Наши идеи",
    description:
      "Продукты и системы, которые мы придумываем, исследуем, проектируем и превращаем в работающие решения.",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "толк+юсайт / Наши идеи",
    description:
      "Продукты и системы, которые мы придумываем, исследуем и собираем.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
