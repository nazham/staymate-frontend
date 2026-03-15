import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
};

export default RootLayout;
