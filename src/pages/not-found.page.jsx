import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { SearchX, Home } from "lucide-react";

const NotFoundPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4 text-center">
      <div className="bg-primary/10 p-6 rounded-full mb-8">
        <SearchX className="h-16 w-16 text-primary" />
      </div>
      <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        404
      </h1>
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground text-lg max-w-md mb-8">
        Oops! We couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/">
          <Button size="lg" className="w-full sm:w-auto h-12 px-8">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
