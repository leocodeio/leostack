import { loader as HomeLoader } from "~/routes/loader+/feature+/home+/home.loader";

export const loader = HomeLoader;
export default function DashboardIndex() {
  return (
    <div className="flex flex-col gap-6 m-2 w-full h-full justify-center items-center">
      Dashboard
    </div>
  );
}
