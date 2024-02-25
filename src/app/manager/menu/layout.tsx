export default function MenuLayout({
  children,
  cate,
}: Readonly<{
  children: React.ReactNode;
  cate: React.ReactNode;
}>) {
  return (
    <div className="flex-col flex">
      {children}
      {cate}
    </div>
  );
}
