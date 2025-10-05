export default function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="hover:bg-gray-50 transition-colors">{children}</tr>;
}
