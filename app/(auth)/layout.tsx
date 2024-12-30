
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="h-full flex justify-center items-center bg-slate-400"
      >
        {children}
      </body>
    </html>
  );
}
