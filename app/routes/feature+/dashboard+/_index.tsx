import { Button } from "~/components/ui/button";
import { checkout } from "~/server/services/payments/payment-client";
import { loader as HomeLoader } from "~/routes/loader+/feature+/home+/home.loader";
import { useToast } from "~/hooks/use-toast";

export const loader = HomeLoader;
export default function DashboardIndex() {
  const { toast } = useToast();
  
  const handleCheckout = async () => {
    try {
      const response = await checkout();
      console.log("response", response);
    } catch (error) {
      toast({
        title: "Checkout Error",
        description: "Failed to initiate checkout. Please try again.",
        variant: "destructive",
      });
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 m-2 w-full h-full justify-center items-center">
      Dashboard
      <Button onClick={handleCheckout}>Checkout</Button>
    </div>
  );
}
