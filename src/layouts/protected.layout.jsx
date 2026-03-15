import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";

const ProtectedLayout = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="space-y-6">
          <Skeleton className="h-12 w-64 mb-12" />
          <div className="grid md:grid-cols-2 gap-8">
             <Skeleton className="h-[250px] w-full rounded-xl" />
             <Skeleton className="h-[250px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
