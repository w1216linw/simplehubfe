export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex-col flex w-full">{children}</div>;
}
