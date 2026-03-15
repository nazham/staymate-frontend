import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-primary/5 py-12 px-8 mt-auto border-t">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            StayMate
          </Link>
          <p className="text-muted-foreground mt-4 max-w-sm">
            Discover the most trending hotels worldwide for an unforgettable
            experience. Book securely, stay happily.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/hotels" className="text-muted-foreground hover:text-primary transition-colors">Browse Hotels</Link>
            </li>
            <li>
              <Link to="/account" className="text-muted-foreground hover:text-primary transition-colors">My Account</Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
            </li>
            <li>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} StayMate. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
