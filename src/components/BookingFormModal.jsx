import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, differenceInDays } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBookingMutation } from "@/lib/api";
import { toast } from "sonner";

export default function BookingModal({ open, setOpen, hotelId, hotelPrice }) {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [createBooking, isLoading] = useCreateBookingMutation();

  const bookingSchema = z.object({
    checkIn: z.date({ required_error: "Check-in date is required" }),
    checkOut: z.date().refine((date) => date > dateRange.from, {
      message: "Check-out must be after check-in",
    }),
    roomNumber: z.string().min(1, "Room number is required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: { checkIn: null, checkOut: null, roomNumber: "" },
  });

  const nights = dateRange.from && dateRange.to 
    ? Math.max(1, differenceInDays(dateRange.to, dateRange.from))
    : 0;
  
  const totalCost = nights * hotelPrice;

  const handleBook = async (data) => {
    if (!dateRange.from || !dateRange.to) {
      toast.error("Please select a valid check-in and check-out date.");
      return;
    }
    const toastId = toast.loading("Booking hotel...");
    try {
      await createBooking({
        hotelId,
        checkIn: dateRange.from,
        checkOut: dateRange.to,
        roomNumber: parseInt(data.roomNumber),
      }).unwrap();

      toast.dismiss(toastId);
      toast.success("Booking confirmed!");
      setOpen(false);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Booking failed", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-6 space-y-4">
        <DialogTitle className="text-xl font-semibold">
          Confirm Your Booking
        </DialogTitle>
        <DialogDescription className="sr-only">
          Select check-in and check-out dates, and provide a room number to confirm your hotel booking.
        </DialogDescription>
        <form onSubmit={handleSubmit(handleBook)} className="space-y-4">
          {/* Date Range Selection */}
          <Popover modal={true}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                {dateRange?.from && dateRange?.to
                  ? `${format(dateRange.from, "PPP")} - ${format(dateRange.to, "PPP")}`
                  : "Select Check-in and Check-out Dates"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) => {
                  setDateRange(range);
                  setValue("checkIn", range?.from);
                  setValue("checkOut", range?.to);
                }}
                disabled={(date) => date < new Date().setHours(0, 0, 0, 0)}
              />
            </PopoverContent>
          </Popover>
          {errors.checkIn && (
            <p className="text-red-500 text-sm">{errors.checkIn.message}</p>
          )}
          {errors.checkOut && (
            <p className="text-red-500 text-sm">{errors.checkOut.message}</p>
          )}

          {/* Room Number */}
          <Input
            type="text"
            placeholder="Room Number"
            {...register("roomNumber")}
          />
          {errors.roomNumber && (
            <p className="text-red-500 text-sm">{errors.roomNumber.message}</p>
          )}

          {/* Pricing Summary */}
          {nights > 0 && (
            <div className="bg-muted p-4 rounded-lg mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>${hotelPrice} × {nights} night{nights !== 1 && 's'}</span>
                <span>${totalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total</span>
                <span>${totalCost.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full text-white">
            Confirm Booking
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
