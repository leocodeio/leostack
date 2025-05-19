// import { useState } from "react";
// import { Button } from "@./shadcn";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CommonSidebar } from "../../components/common/CommonSidebar";
import { loader as dashboardLoader } from "../loader+/feature+/dashboard+/dashboard.loader";
import { Outlet, useLoaderData } from "@remix-run/react";
import { CommonHeader } from "../../components/common/CommonHeader";
export const loader = dashboardLoader;
const navlinks = [
  {
    title: "Dashboard",
    url: "/feature/dashboard",
  },
];
export default function Dashboard() {
  // const { role, userName } = useLoaderData<typeof loader>();

  return (
    <SidebarProvider>
      <CommonSidebar data={navlinks} variant="inset" />
      <SidebarInset>
        <CommonHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
