export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-4 bg-gray-100 flex-1 flex flex-col items-center ">
      {children}
    </main>
  );
}
