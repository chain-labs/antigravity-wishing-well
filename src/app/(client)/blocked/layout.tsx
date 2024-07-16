import GoogleAnalytics from "../analytics";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
