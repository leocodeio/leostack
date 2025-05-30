import { Card, CardContent, CardDescription } from "@/components/ui/card";

export function CommonSubHeader({
  userName,
  role,
}: {
  userName: string;
  role: string;
}) {
  // console.log(role, userName);
  const makeCamle = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <Card className="shadow-none bg-transparent border-b rounded-md m-2">
      <CardContent className="flex flex-col p-4">
        <CardDescription>Welcome {makeCamle(role!)}</CardDescription>
        <div className="text-xl font-medium mt-0.5">{userName}</div>
      </CardContent>
    </Card>
  );
}
