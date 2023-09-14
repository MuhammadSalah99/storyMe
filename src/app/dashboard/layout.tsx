import Sidebar from "./components/sidebar"

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section className="flex w-full h-full bg-gray-600">
            <div className="w-1/4 ">  
                <Sidebar />
            </div>
            {/* Include shared UI here e.g. a header or sidebar */}
            {children}
        </section>
    )
}
