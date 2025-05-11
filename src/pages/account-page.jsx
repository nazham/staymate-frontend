import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Calendar, Hotel, User, Mail, Clock } from "lucide-react";
import { format } from "date-fns";

const AccountPage = () => {
  const { isSignedIn, user } = useUser();

  // Mock booking data - in a real app, this would come from an API
  const booking = {
    _id: "67daae4f5910ef3ab312606d",
    checkIn: "2025-03-19T11:45:19.933Z",
    checkOut: "2025-03-19T11:45:19.933Z",
    roomNumber: 200,
    hotel: {
      _id: "67a8bd8f45ac306e09cd97a7",
      name: "Montmartre Majesty Hotel",
      location: "Paris, France",
      rating: 4.7,
      image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/297840629.jpg?k=d20e005d5404a7bea91cb5fe624842f72b27867139c5d65700ab7f69396026ce&o=&hp=1",
      price: 160
    }
  };

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <main className="container mx-auto px-4 py-12 min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          My Account
        </h1>
        
        {/* Personal Information Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-primary rounded-full"></div>
            <h2 className="text-2xl font-semibold">Personal Information</h2>
          </div>
          <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                      <p className="text-lg font-medium">{user?.fullName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email Address</p>
                      <p className="text-lg font-medium">{user?.emailAddresses[0].emailAddress}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Account Created</p>
                      <p className="text-lg font-medium">
                        {format(new Date(user?.createdAt), "MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Bookings Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-primary rounded-full"></div>
            <h2 className="text-2xl font-semibold">My Bookings</h2>
          </div>
          <div className="grid gap-6">
            <Card className="overflow-hidden border-none shadow-lg bg-white/50 backdrop-blur-sm">
              <div className="grid md:grid-cols-3">
                <div className="md:col-span-1 relative group">
                  <img
                    src={booking.hotel.image}
                    alt={booking.hotel.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="md:col-span-2 p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-semibold mb-3">{booking.hotel.name}</h3>
                      <div className="flex items-center text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{booking.hotel.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                        <span className="font-medium">{booking.hotel.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary">${booking.hotel.price}</p>
                      <p className="text-sm text-muted-foreground">per night</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Check-in</p>
                        <p className="font-medium">
                          {format(new Date(booking.checkIn), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Check-out</p>
                        <p className="font-medium">
                          {format(new Date(booking.checkOut), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5">
                      <Hotel className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Room Number</p>
                        <p className="font-medium">{booking.roomNumber}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AccountPage;
