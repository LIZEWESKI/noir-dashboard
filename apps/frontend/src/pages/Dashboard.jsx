import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import api from "@/lib/axios"
import data from "@/lib/data"
import SecureStorage from "@/lib/secure-storage"
import { redirect, useLoaderData } from "react-router-dom"
export async function loader() {
  const savedToken = SecureStorage.getToken()
  if(savedToken) {
    try{
      const stats = await api.get("/api/dashboard/stats");
      const bookingsTable = await api.get("/api/dashboard/bookings-table");
      const data = [stats.data, bookingsTable.data];
      return data;
    }catch(err) {
      console.error("Failed to fetch stats:", err)
    }
  }
  return redirect("/login")
}
export default function Dashboard() {
  const [stats,bookingsTable] = useLoaderData();
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards stats={stats}/>
              <DataTable data={bookingsTable} />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
