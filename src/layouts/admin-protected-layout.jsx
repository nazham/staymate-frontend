import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";

const AdminProtectedLayout = () => {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-10 w-48 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (user?.publicMetadata?.role !== "admin") {
    return <Navigate to="/" />
  }

  return <Outlet />;
};

export default AdminProtectedLayout;
