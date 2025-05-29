import { CommonHeader } from "@/components/common/CommonHeader";
import { Outlet } from "@remix-run/react";

export default function HomeLayout() {
  return <Outlet />;
}
