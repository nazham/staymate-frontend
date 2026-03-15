import { useUser } from "@clerk/clerk-react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star, Calendar, Hotel, User, Mail, Clock, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useGetMyBookingsQuery, useCancelBookingMutation } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const AccountPage = () => {
  const { isSignedIn, user } = useUser();

  const { data: bookings, isLoading, isError } = useGetMyBookingsQuery(undefined, {
    skip: !isSignedIn,
  });
  
  const [cancelBooking] = useCancelBookingMutation();

  const handleCancel = async (id) => {
    const toastId = toast.loading("Cancelling booking...");
    try {
      await cancelBooking(id).unwrap();
      toast.dismiss(toastId);
      toast.success("Booking cancelled successfully!");
    } catch (error) {
      toast.dismiss(toastId);
      const errorMessage = error?.data?.message || "Failed to cancel booking. Please try again.";
      toast.error(errorMessage);
    }
  };

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
            {isLoading && (
              <>
                <Card className="overflow-hidden border-none shadow-lg bg-white/50 backdrop-blur-sm">
                  <div className="grid md:grid-cols-3">
                    <Skeleton className="md:col-span-1 h-full min-h-[250px] rounded-none" />
                    <CardContent className="md:col-span-2 p-8 space-y-6">
                      <div className="flex justify-between">
                        <div className="space-y-2">
                          <Skeleton className="h-8 w-64" />
                          <Skeleton className="h-4 w-48" />
                        </div>
                        <Skeleton className="h-10 w-24" />
                      </div>
                      <div className="grid md:grid-cols-3 gap-6 mt-8">
                        <Skeleton className="h-16 w-full rounded-lg" />
                        <Skeleton className="h-16 w-full rounded-lg" />
                        <Skeleton className="h-16 w-full rounded-lg" />
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </>
            )}
            {isError && <p>Error loading bookings. Please try again later.</p>}
            {!isLoading && !isError && (!bookings || bookings.length === 0) && (
              <p className="text-muted-foreground">You don't have any bookings yet.</p>
            )}
            {!isLoading && !isError && bookings && bookings.map((booking) => (
              <Card key={booking._id} className="overflow-hidden border-none shadow-lg bg-white/50 backdrop-blur-sm">
                <div className="grid md:grid-cols-3">
                  <div className="md:col-span-1 relative group">
                    <img
                      src={booking.hotelId.image}
                      alt={booking.hotelId.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardContent className="md:col-span-2 p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-semibold mb-3">{booking.hotelId.name}</h3>
                        <div className="flex items-center text-muted-foreground mb-3">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{booking.hotelId.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                          <span className="font-medium">{booking.hotelId.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end">
                        <div className="text-right">
                          <p className="text-3xl font-bold text-primary">${booking.hotelId.price}</p>
                          <p className="text-sm text-muted-foreground">per night</p>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              className="mt-4"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Cancel Booking
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Cancel your booking?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to cancel your stay at <strong>{booking.hotelId.name}</strong>? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleCancel(booking._id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                Confirm Cancellation
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AccountPage;
