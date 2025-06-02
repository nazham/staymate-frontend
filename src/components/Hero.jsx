import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, MapPin, Calendar, Users, Star, Hotel } from "lucide-react";
import { useDispatch } from "react-redux";
import { submit } from "@/lib/features/searchSlice";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion"; // For smooth animations

export default function Hero({ scrollToResults }) {
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [searchData, setSearchData] = useState({
    destination: "",
    travelDates: "",
    travelers: "",
    budgetRange: "",
    preferences: "",
    experience: "",
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchQuery = Object.values(searchData).join(" ");
    await dispatch(submit(searchQuery));
    scrollToResults?.();
  };

  const steps = [
    {
      title: "Destination",
      icon: <MapPin className="w-5 h-5" />,
      component: (
        <div className="space-y-4">
          <Input
            name="destination"
            value={searchData.destination}
            onChange={handleInputChange}
            placeholder="Where do you want to go?"
            className="w-full border-none text-lg focus-visible:ring-1 focus-visible:ring-sky-500"
          />
          <p className="text-sm text-white/70">
            City, country, or region you're interested in
          </p>
        </div>
      ),
    },
    {
      title: "Travel Dates",
      icon: <Calendar className="w-5 h-5" />,
      component: (
        <div className="space-y-4">
          <Select
            onValueChange={(value) =>
              setSearchData({ ...searchData, travelDates: value })
            }
            value={searchData.travelDates}
          >
            <SelectTrigger className="h-10 text-lg">
              <SelectValue placeholder="When are you going to travel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Winter">Winter</SelectItem>
              <SelectItem value="Summer">Summer</SelectItem>
              <SelectItem value="Spring">Spring</SelectItem>
              <SelectItem value="Fall">Fall</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      title: "Travelers",
      icon: <Users className="w-5 h-5" />,
      component: (
        <div className="space-y-4">
          <Select
            onValueChange={(value) =>
              setSearchData({ ...searchData, travelers: value })
            }
            value={searchData.travelers}
          >
            <SelectTrigger className="h-10 text-lg">
              <SelectValue placeholder="Number of travelers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Solo">Solo</SelectItem>
              <SelectItem value="Couple">Couple</SelectItem>
              <SelectItem value="Family (3-4)">Family (3-4)</SelectItem>
              <SelectItem value="Group (5+)">Group (5+)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      title: "Budget",
      icon: <Star className="w-5 h-5" />,
      component: (
        <div className="space-y-4">
          <Select
            onValueChange={(value) =>
              setSearchData({ ...searchData, budgetRange: value })
            }
            value={searchData.budgetRange}
          >
            <SelectTrigger className="h-10 text-lg">
              <SelectValue placeholder="Select your budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Budget">Budget ($)</SelectItem>
              <SelectItem value="Mid-range">Mid-range ($$)</SelectItem>
              <SelectItem value="Luxury">Luxury ($$$)</SelectItem>
              <SelectItem value="Premium">Premium ($$$$)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      title: "Preferences",
      icon: <Hotel className="w-5 h-5" />,
      component: (
        <div className="space-y-4">
          <Textarea
            name="preferences"
            value={searchData.preferences}
            onChange={handleInputChange}
            placeholder="Any specific preferences? (e.g., beachfront, mountain view, city center)"
            className="text-lg min-h-[100px]"
          />
        </div>
      ),
    },
    {
      title: "Experience",
      icon: <Sparkles className="w-5 h-5" />,
      component: (
        <div className="space-y-4">
          <Textarea
            name="experience"
            value={searchData.experience}
            onChange={handleInputChange}
            placeholder="Describe your ideal experience (e.g., relaxing spa weekend, adventurous hiking trip)"
            className="text-lg min-h-[100px]"
          />
        </div>
      ),
    },
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Input
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              placeholder="Where are you planning to stay? (e.g., Bali, New York)"
              className="w-full bg-transparent border-none text-white placeholder:text-white/60 text-lg focus-visible:ring-1 focus-visible:ring-sky-500"
            />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Input
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="What experience are you looking for? (e.g., relaxing, adventurous)"
              className="w-full bg-transparent border-none text-white placeholder:text-white/60 text-lg focus-visible:ring-1 focus-visible:ring-sky-500"
            />
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Input
              name="preferences"
              value={formData.preferences}
              onChange={handleInputChange}
              placeholder="Any specific preferences? (e.g., beachfront, luxury)"
              className="w-full bg-transparent border-none text-white placeholder:text-white/60 text-lg focus-visible:ring-1 focus-visible:ring-sky-500"
            />
          </motion.div>
        );
      default:
        return null;
    }
    6;
  };

  return (
    <div className="relative ">
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-white justify-center px-8 pt-24 pb-32">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-purple-500"
        >
          Discover Your Perfect Staycation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl mb-12 text-center max-w-2xl text-white/80"
        >
          Let our AI craft personalized recommendations based on your unique
          preferences
        </motion.p>

        {/* Step-by-Step Search Card */}
        <Card className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                {steps[step].icon}
                <span>{steps[step].title}</span>
              </div>
              <span className="text-sm font-normal text-white/70">
                Step {step + 1} of {steps.length}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress
              value={(step + 1) * (100 / steps.length)}
              className="h-2 mb-6"
            />
            <form onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {steps[step].component}
              </motion.div>

              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 0}
                  className="gap-2"
                >
                  Back
                </Button>

                {step < steps.length - 1 ? (
                  <Button type="button" onClick={handleNext} className="gap-2">
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Sparkles className="w-5 h-5" />
                    Find My Staycation
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Subtle background overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
    </div>
  );
}
