import Hero from "@/components/Hero";
import HotelListings from "@/components/HotelListings";
import { useRef } from "react";

const HomePage = () => {
  const hotelListingsRef = useRef(null);
  return (
    <main>
      <div className="relative min-h-screen">
        <Hero scrollToResults={() => hotelListingsRef.current?.scrollIntoView({ behavior: "smooth" })}/>
        <img
          src="/assets/hero/hero_1.jpg"
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
      </div>
      <HotelListings ref={hotelListingsRef}/>
    </main>
  )
}

export default HomePage
