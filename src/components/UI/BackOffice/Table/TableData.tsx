export default function TableData({
  children,
  nowrap = true,
}: {
  children: React.ReactNode;
  nowrap?: boolean;
}) {
  return (
    <td
      className={
        `space-x-4 px-6 py-4 text-sm font-medium text-gray-900` +
        (nowrap ? " whitespace-nowrap" : "")
      }
    >
      {children}
    </td>
  );
}
