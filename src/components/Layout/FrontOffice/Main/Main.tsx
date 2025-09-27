export default function Main ({ children }: { children: React.ReactNode }){
    return (
        <main className="pt-16 sm:pt-20 bg-black-bg-main min-h-[calc(100svh-5rem-1.45rem)]">
            {children}
        </main>
    )
}