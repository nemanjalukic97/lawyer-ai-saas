import { DashboardNavbar } from "./components/DashboardNavbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <main>{children}</main>
    </div>
  )
}
