import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBookingMutation } from "@/lib/api";
import { toast } from "sonner";

export default function BookingModal({ open, setOpen, hotelId }) {
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
        <form onSubmit={handleSubmit(handleBook)} className="space-y-4">
          {/* Date Range Selection */}
          <Popover>
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

          {/* Submit Button */}
          <Button type="submit" className="w-full text-white">
            Confirm Booking
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
