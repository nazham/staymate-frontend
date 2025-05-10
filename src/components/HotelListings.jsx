import { useGetHotelsForSearchQueryQuery } from "@/lib/api";
import { forwardRef, useState } from "react";
import { useSelector } from "react-redux";
import HotelCard from "./HotelCard";
import LocationTab from "./LocationTab";
;

const HotelListings = forwardRef((props, ref) => {
  const searchValue = useSelector((state) => state.search.value);
  const {
    data: hotels,
    isLoading,
    isError,
    error,
  } = useGetHotelsForSearchQueryQuery({
    query: searchValue,
  });

  const locations = ["ALL", "France", "Italy", "Australia", "Japan"];

  const [selectedLocation, setSelectedLocation] = useState("ALL");

  const handleSelectedLocation = (location) => {
    setSelectedLocation(location);
  };

  if (isLoading) {
    return (
      <section ref={ref} className="px-8 py-8 lg:py-16">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Top trending hotels worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the most trending hotels worldwide for an unforgettable
            experience.
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          {locations.map((location, i) => {
            return (
              <LocationTab
                key={i}
                selectedLocation={selectedLocation}
                name={location}
                onClick={handleSelectedLocation}
              />
            );
          })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse space-y-4 p-4 border rounded shadow"
            >
              <div className="h-40 bg-gray-300 rounded w-full" />
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-1/3" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    console.log(error);

    return (
      <section ref={ref} className="px-8 py-8 lg:py-16">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Top trending hotels worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the most trending hotels worldwide for an unforgettable
            experience.
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          {locations.map((location, i) => {
            return (
              <LocationTab
                key={i}
                selectedLocation={selectedLocation}
                name={location}
                onClick={handleSelectedLocation}
              />
            );
          })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          <p className="text-red-500">
            {error?.message || "An error occurred"}
          </p>{" "}
        </div>
      </section>
    );
  }

  const filteredHotels =
    selectedLocation === "ALL"
      ? hotels
      : hotels.filter(({ hotel }) => {
          return hotel.location
            ?.toLowerCase()
            .includes(selectedLocation.toLowerCase());
        });

  return (
    <section ref={ref} className="px-8 py-8 lg:py-16">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Top trending hotels worldwide
        </h2>
        <p className="text-lg text-muted-foreground">
          Discover the most trending hotels worldwide for an unforgettable
          experience.
        </p>
      </div>
      <div className="flex items-center gap-x-4">
        {locations.map((location, i) => {
          return (
            <LocationTab
              key={i}
              selectedLocation={selectedLocation}
              name={location}
              onClick={handleSelectedLocation}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {filteredHotels.map(({ hotel, confidence }) => {
          return (
            <HotelCard key={hotel._id} hotel={hotel} confidence={confidence} />
          );
        })}
      </div>
    </section>
  );
});

export default HotelListings;
