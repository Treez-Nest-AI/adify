// import { useState, useRef } from "react";
// import { ArrowLeft, Settings, Target, Calendar, MapPin, Edit3, Save, X, DollarSign } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { upsertCampaignConfig,resetCampaignConfig} from "@/Store/campaignSlice";
// import {
//     DropdownMenu,
//     DropdownMenuTrigger,
//     DropdownMenuContent,
//     DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";

// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Slider } from "@/components/ui/slider";
// import { cn } from "@/lib/utils";
// import { DatePicker } from "@/components/ui/DatePicker";
// import { LoadScript, GoogleMap, Marker, Autocomplete, useJsApiLoader } from "@react-google-maps/api";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/Store/store";

// const adGoalOptions = [
//     { value: "REACH", title: "Website", description: "AI Smart Optimization", content: "Get more people to visit your website.", icon: "👥", color: "blue" },
//     { value: "LEAD_GENERATION", title: "Leads", description: "Lead Recommendation", content: "Collect contact information from potential customers.", icon: "🤝", color: "green" },
//     { value: "CONVERSIONS", title: "Purchase", description: "AI Smart Optimization", content: "Drive purchases of your products or services.", icon: "🛒", color: "purple" }
// ];

// const libraries: ("places")[] = ["places"];

// export default function CampaignConfig() {
//     const dispatch = useDispatch();
//     const campaignConfig = useSelector((state: RootState) => state.campaign.campaignConfig);
//     const { isLoaded } = useJsApiLoader({
//         googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyDPq9MIskQ0LPm2j4DNZGHQrxcPA1aQAfM",
//         libraries: ["places"],
//     });
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         projectName: "",
//         adGoal: "REACH",
//         conversionButton: "Shop Now",
//         startDate: undefined as Date | undefined,
//         endDate: undefined as Date | undefined,
//         targetingLocation: "",
//         dailyBudget: 50
//     });

//     const [errors, setErrors] = useState({
//         projectName: false,
//         startDate: false,
//         endDate: false,
//         targetingLocation: false
//     });

//     const [isEditingDescription, setIsEditingDescription] = useState(false);
//     const [productDescription, setProductDescription] = useState("Introducing our premium athletic collection - where performance meets style. Our cutting-edge moisture-wicking technology combines with contemporary design, perfect for both intense workouts and casual streetwear. Featuring breathable fabrics, ergonomic fits, and iconic branding, this collection empowers athletes and fashion enthusiasts alike to express their individuality while achieving peak performance.");
//     const [tempDescription, setTempDescription] = useState(productDescription);

//     // Map related states
//     const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
//     const [selectedCountry, setSelectedCountry] = useState<string>("");
//     const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

//     function handleDateChange(field: "startDate" | "endDate", date: Date | undefined) {
//         setFormData(prev => ({ ...prev, [field]: date }));
//         if (date) {
//             setErrors(prev => ({ ...prev, [field]: false }));
//         }
//     }

//     const handleInputChange = (field: string, value: string | number) => {
//         setFormData(prev => ({ ...prev, [field]: value }));
//         if (value) {
//             setErrors(prev => ({ ...prev, [field]: false }));
//         }
//     };

//     const handleEditDescription = () => {
//         setTempDescription(productDescription);
//         setIsEditingDescription(true);
//     };

//     const handleSaveDescription = () => {
//         setProductDescription(tempDescription);
//         setIsEditingDescription(false);
//     };

//     const handleCancelDescription = () => {
//         setTempDescription(productDescription);
//         setIsEditingDescription(false);
//     };



//     const getCountryCode = (address: string) => {
//         const countryMappings: { [key: string]: string } = {
//             "United States": "US",
//             "USA": "US",
//             "India": "IN",
//             "Canada": "CA",
//             "United Kingdom": "GB",
//             "UK": "GB",
//             "Australia": "AU",
//             "Philippines": "PH",
//             "Germany": "DE",
//             "France": "FR",
//             "Japan": "JP",
//             "China": "CN",
//             "Brazil": "BR"
//         };

//         for (const [country, code] of Object.entries(countryMappings)) {
//             if (address.includes(country)) {
//                 return code;
//             }
//         }
//         return "US";
//     };

//     const validateForm = () => {
//         const newErrors = {
//             projectName: !campaignConfig.projectName.trim(),
//             startDate: !campaignConfig.startDate,
//             endDate: !campaignConfig.endDate,
//             targetingLocation: !campaignConfig.targetingLocation.trim()
//         };

//         setErrors(newErrors);
//         return !Object.values(newErrors).some(error => error);
//     };

//     const handleNext = () => {
//         if (!validateForm()) {
//             // alert("Please fill in all required fields before proceeding.");
//             return;
//         }

//         // Store campaign config data in sessionStorage to pass to next page
//         const campaignConfigData = {
//             ...formData,
//             productDescription,
//             selectedCountry: selectedCountry || getCountryCode(formData.targetingLocation),
//             selectedLocation
//         };

//         sessionStorage.setItem('campaignConfigData', JSON.stringify(campaignConfigData));
//         navigate('/CampaignCard');
//     };

//     const handlePrevious = () => {
//         dispatch(resetCampaignConfig());
//         console.log("Navigate to previous step");
//         // Navigate to your previous page
//         navigate('/product-description');
//     };

//     const handlePlaceChanged = () => {
//         const place = autocompleteRef.current?.getPlace();
//         if (place?.geometry?.location) {
//             const lat = place.geometry.location.lat();
//             const lng = place.geometry.location.lng();
//             setSelectedLocation({ lat, lng });
//             const address = place.formatted_address || "";
//             handleInputChange("targetingLocation", address);

//             const countryComponent = place.address_components?.find(
//                 component => component.types.includes('country')
//             );
//             if (countryComponent) {
//                 setSelectedCountry(countryComponent.short_name);
//             }
//         }
//     };

//     return (
//         <div className="min-h-screen bg-white">
//             {/* Header */}
//             <header className="bg-white border-b border-gray-100">
//                 <div className="max-w-6xl mx-auto px-4 py-4">
//                     <div className="flex items-center gap-4">
//                         <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900" onClick={handlePrevious}>
//                             <ArrowLeft className="h-4 w-4" />
//                             <span className="font-medium">Back</span>
//                         </Button>
//                         <div className="flex items-center gap-2 ml-4">
//                             <Settings className="h-5 w-5 text-primary" />
//                             <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Campaign Setup</span>
//                         </div>
//                     </div>
//                 </div>
//             </header>

//             {/* Main Content */}
//             <main className="max-w-6xl mx-auto px-4 py-8 pb-32">
//                 <div className="text-center mb-12">
//                     <h1 className="text-4xl font-bold text-gray-900 mb-4">
//                         Configure Your <span className="text-primary">Ad Campaign</span>
//                     </h1>
//                     <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                         Set your campaign goals and targeting to generate optimized Meta Ads
//                     </p>
//                 </div>

//                 <div className="space-y-8">
//                     <div className="grid lg:grid-cols-2 gap-8">
//                         {/* Left Column */}
//                         <div className="space-y-8">
//                             {/* Project Information */}
//                             <Card className="shadow-sm hover:shadow-md transition-shadow">
//                                 <CardHeader>
//                                     <CardTitle className="flex items-center gap-2">
//                                         <Settings className="h-5 w-5 text-primary" /> Project name *
//                                     </CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <Input
//                                         value={campaignConfig.projectName}

//                                         onChange={(e) =>
//                                             dispatch(upsertCampaignConfig({ projectName: e.target.value }))
//                                         }
//                                         placeholder="Enter your project name"
//                                         className={cn("text-base", errors.projectName && "border-red-500")}
//                                     />
//                                     {errors.projectName && (
//                                         <p className="text-red-500 text-sm mt-1">Project name is required</p>
//                                     )}
//                                 </CardContent>
//                             </Card>

//                             {/* Campaign Goals */}
//                             <Card className="shadow-sm hover:shadow-md transition-shadow">
//                                 <CardHeader>
//                                     <CardTitle className="flex items-center gap-2">
//                                         <Target className="h-5 w-5 text-primary" /> Ad Goal
//                                     </CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <RadioGroup
//                                         value={campaignConfig.adGoal} // use redux value
//                                         onValueChange={(value) =>
//                                             dispatch(upsertCampaignConfig({ adGoal: value }))
//                                         }

//                                         className="grid md:grid-cols-3 gap-4"
//                                     >
//                                         {adGoalOptions.map((option) => {
//                                             const isSelected = campaignConfig.adGoal === option.value;
//                                             return (
//                                                 <div key={option.value} className="relative">
//                                                     <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
//                                                     <label
//                                                         htmlFor={option.value}
//                                                         className={cn(
//                                                             "cursor-pointer border-2 rounded-lg p-4 transition-all block h-full min-h-[200px] flex flex-col justify-between",
//                                                             isSelected ? "border-primary bg-primary/5 shadow-lg scale-[1.03]" : "border-gray-200 bg-white"
//                                                         )}
//                                                     >
//                                                         <div>
//                                                             <div className="flex items-center gap-3 mb-2">
//                                                                 <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-2xl", isSelected ? "bg-primary/20" : "bg-gray-100")}>
//                                                                     {option.icon}
//                                                                 </div>
//                                                                 <div>
//                                                                     <h4 className="font-medium text-gray-900 flex items-center gap-2">
//                                                                         {option.title}
//                                                                         {isSelected && (
//                                                                             <span className="absolute -top-3 left-1/4 bg-primary text-white text-xs px-2 py-1 rounded-full">Selected</span>
//                                                                         )}
//                                                                     </h4>
//                                                                     <p className="text-xs text-gray-600">{option.description}</p>
//                                                                 </div>
//                                                             </div>
//                                                             <p className="text-sm text-gray-600">{option.content}</p>
//                                                         </div>
//                                                     </label>
//                                                 </div>
//                                             );
//                                         })}
//                                     </RadioGroup>
//                                 </CardContent>
//                             </Card>


//                             {/* Campaign Settings */}
//                             <Card className="shadow-sm hover:shadow-md transition-shadow">
//                                 <CardHeader>
//                                     <CardTitle className="flex items-center gap-2">
//                                         <Settings className="h-5 w-5 text-primary" /> Campaign Settings
//                                     </CardTitle>
//                                 </CardHeader>
//                                 <CardContent className="space-y-6">
//                                     <div>
//                                         <Label className="text-base font-medium mb-2 block">
//                                             Ad Conversion Button
//                                         </Label>

//                                         <DropdownMenu>
//                                             <DropdownMenuTrigger className="w-full rounded-md border border-input bg-background px-3 py-2 text-left text-base">
//                                                 {campaignConfig.conversionButton || "Select an option"}
//                                             </DropdownMenuTrigger>

//                                             <DropdownMenuContent
//                                                 className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-full"
//                                                 align="start"
//                                             >
//                                                 {["Contact Us", "Call Us", "Shop Now", "Learn More", "Sign Up"].map(
//                                                     (option) => (
//                                                         <DropdownMenuItem
//                                                             key={option}
//                                                             onSelect={() => handleInputChange("conversionButton", option)}
//                                                         >
//                                                             {option}
//                                                         </DropdownMenuItem>
//                                                     )
//                                                 )}
//                                             </DropdownMenuContent>
//                                         </DropdownMenu>
//                                     </div>


//                                     <div className="grid md:grid-cols-2 gap-4">
//                                         <div>
//                                             <Label className="flex items-center gap-2 mb-2">
//                                                 <Calendar className="h-4 w-4" /> Start Date *
//                                             </Label>
//                                             <DatePicker

//                                                 value={
//                                                     campaignConfig.startDate
//                                                         ? (typeof campaignConfig.startDate === "string"
//                                                             ? new Date(campaignConfig.startDate)
//                                                             : campaignConfig.startDate)
//                                                         : undefined
//                                                 }
//                                                 onChange={(date) =>
//                                                     dispatch(upsertCampaignConfig({ startDate: date }))
//                                                 }
//                                                 placeholder="Select start date"
//                                             />
//                                             {errors.startDate && (
//                                                 <p className="text-red-500 text-xs mt-1">Start date is required</p>
//                                             )}
//                                         </div>
//                                         <div>
//                                             <Label className="flex items-center gap-2 mb-2">
//                                                 <Calendar className="h-4 w-4" /> End Date *
//                                             </Label>
//                                             <DatePicker
//                                                 // value={formData.endDate}
//                                                 // onChange={(date) => handleDateChange("endDate", date)}
//                                                 value={
//                                                     campaignConfig.endDate
//                                                         ? (typeof campaignConfig.endDate === "string"
//                                                             ? new Date(campaignConfig.endDate)
//                                                             : campaignConfig.endDate)
//                                                         : undefined
//                                                 }
//                                                 onChange={(date) =>
//                                                     dispatch(upsertCampaignConfig({ endDate: date }))
//                                                 }
//                                                 placeholder="Select end date"
//                                             />
//                                             {errors.endDate && (
//                                                 <p className="text-red-500 text-xs mt-1">End date is required</p>
//                                             )}
//                                         </div>
//                                     </div>

//                                     {/* Location + Map */}
//                                     {/* Location + Map */}
//                                     <div>
//                                         <Label className="flex items-center gap-2 mb-2">
//                                             <MapPin className="h-4 w-4" /> Cities and Countries to Advertise *
//                                         </Label>

//                                         {isLoaded ? (
//                                             <>
//                                                 <Autocomplete
//                                                     onLoad={(ac) => (autocompleteRef.current = ac)}
//                                                     onPlaceChanged={handlePlaceChanged}
//                                                 >
//                                                     <Input
//                                                         // value={formData.targetingLocation}
//                                                         // onChange={(e) => handleInputChange("targetingLocation", e.target.value)}
//                                                         value={campaignConfig.targetingLocation}

//                                                         onChange={(e) =>
//                                                             dispatch(upsertCampaignConfig({ targetingLocation: e.target.value }))
//                                                         }
//                                                         placeholder="Add a city or country"
//                                                         className={cn("text-base", errors.targetingLocation && "border-red-500")}
//                                                     />
//                                                 </Autocomplete>

//                                                 {errors.targetingLocation && (
//                                                     <p className="text-red-500 text-xs mt-1">Location is required</p>
//                                                 )}

//                                                 {selectedLocation && (
//                                                     <div className="h-64 w-full rounded-lg overflow-hidden border mt-4">
//                                                         <GoogleMap
//                                                             mapContainerStyle={{ width: "100%", height: "100%" }}
//                                                             center={selectedLocation}
//                                                             zoom={12}
//                                                         >
//                                                             <Marker position={selectedLocation} />
//                                                         </GoogleMap>
//                                                     </div>
//                                                 )}
//                                             </>
//                                         ) : (
//                                             <Input
//                                                 placeholder="Loading Google Maps..."
//                                                 disabled
//                                                 className="text-base"
//                                             />
//                                         )}
//                                     </div>

//                                 </CardContent>
//                             </Card>

//                         </div>

//                         {/* Right Column */}
//                         <div className="space-y-8">
//                             {/* Product Description */}
//                             <Card className="shadow-sm hover:shadow-md transition-shadow">
//                                 <CardHeader>
//                                     <CardTitle className="flex items-center justify-between">
//                                         <div className="flex items-center gap-2">
//                                             <Target className="h-5 w-5 text-primary" /> Product Description
//                                         </div>
//                                         {!isEditingDescription && (
//                                             <Button variant="outline" size="sm" onClick={handleEditDescription}>
//                                                 <Edit3 className="h-4 w-4 mr-2" /> Edit
//                                             </Button>
//                                         )}
//                                     </CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     {isEditingDescription ? (
//                                         <div className="space-y-4">
//                                             <Textarea
//                                                 value={tempDescription}
//                                                 onChange={(e) => setTempDescription(e.target.value)}
//                                                 className="min-h-[200px] text-base"
//                                             />
//                                             <div className="flex gap-2">
//                                                 <Button onClick={handleSaveDescription} size="sm">
//                                                     <Save className="h-4 w-4 mr-2" /> Save
//                                                 </Button>
//                                                 <Button variant="outline" onClick={handleCancelDescription} size="sm">
//                                                     <X className="h-4 w-4 mr-2" /> Cancel
//                                                 </Button>
//                                             </div>
//                                         </div>
//                                     ) : (
//                                         <div className="prose max-w-none">
//                                             <p className="text-gray-700 leading-relaxed text-base">{productDescription}</p>
//                                         </div>
//                                     )}
//                                 </CardContent>
//                             </Card>
//                         </div>
//                     </div>

//                     {/* Bottom Actions */}
//                     <div className="flex flex-col sm:flex-row gap-6 justify-center fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50">
//                         <div className="max-w-7xl mx-auto px-6 py-4">
//                             <div className="flex items-center justify-center space-x-4">
//                                 <Button variant="outline" onClick={handlePrevious} className="px-8">
//                                     Previous
//                                 </Button>
//                                 <Button onClick={handleNext} className="px-8 bg-primary hover:bg-primary/90">
//                                     Next
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }




import { useState, useRef } from "react";
import { ArrowLeft, Settings, Target, Calendar, MapPin, Edit3, Save, X, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { upsertCampaignConfig, resetCampaignConfig } from "@/Store/campaignSlice";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/DatePicker";
import { LoadScript, GoogleMap, Marker, Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store/store";

const adGoalOptions = [
    { value: "REACH", title: "Website", description: "AI Smart Optimization", content: "Get more people to visit your website.", icon: "👥", color: "blue" },
    { value: "LEAD_GENERATION", title: "Leads", description: "Lead Recommendation", content: "Collect contact information from potential customers.", icon: "🤝", color: "green" },
    { value: "CONVERSIONS", title: "Purchase", description: "AI Smart Optimization", content: "Drive purchases of your products or services.", icon: "🛒", color: "purple" }
];

const libraries: ("places")[] = ["places"];

export default function CampaignConfig() {
    const dispatch = useDispatch();
    const campaignConfig = useSelector((state: RootState) => state.campaign.campaignConfig);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "AIzaSyDPq9MIskQ0LPm2j4DNZGHQrxcPA1aQAfM",
        libraries: ["places"],
    });
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        projectName: false,
        startDate: false,
        endDate: false,
        targetingLocation: false
    });

    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [productDescription, setProductDescription] = useState(
        campaignConfig.productDescription || 
        "Introducing our premium athletic collection - where performance meets style. Our cutting-edge moisture-wicking technology combines with contemporary design, perfect for both intense workouts and casual streetwear. Featuring breathable fabrics, ergonomic fits, and iconic branding, this collection empowers athletes and fashion enthusiasts alike to express their individuality while achieving peak performance."
    );
    const [tempDescription, setTempDescription] = useState(productDescription);

    // Map related states
    const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(
        campaignConfig.selectedLocation || null
    );
    const [selectedCountry, setSelectedCountry] = useState<string>(
        campaignConfig.selectedCountry || ""
    );
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    function handleDateChange(field: "startDate" | "endDate", date: Date | undefined) {
        const dateString = date ? date.toISOString() : null;
        dispatch(upsertCampaignConfig({ [field]: dateString }));
        if (date) {
            setErrors(prev => ({ ...prev, [field]: false }));
        }
    }

    const handleInputChange = (field: string, value: string | number) => {
        dispatch(upsertCampaignConfig({ [field]: value }));
        if (value) {
            setErrors(prev => ({ ...prev, [field]: false }));
        }
    };

    const handleEditDescription = () => {
        setTempDescription(productDescription);
        setIsEditingDescription(true);
    };

    const handleSaveDescription = () => {
        setProductDescription(tempDescription);
        dispatch(upsertCampaignConfig({ productDescription: tempDescription }));
        setIsEditingDescription(false);
    };

    const handleCancelDescription = () => {
        setTempDescription(productDescription);
        setIsEditingDescription(false);
    };

    const getCountryCode = (address: string) => {
        const countryMappings: { [key: string]: string } = {
            "United States": "US",
            "USA": "US",
            "India": "IN",
            "Canada": "CA",
            "United Kingdom": "GB",
            "UK": "GB",
            "Australia": "AU",
            "Philippines": "PH",
            "Germany": "DE",
            "France": "FR",
            "Japan": "JP",
            "China": "CN",
            "Brazil": "BR"
        };

        for (const [country, code] of Object.entries(countryMappings)) {
            if (address.includes(country)) {
                return code;
            }
        }
        return "US";
    };

    const validateForm = () => {
        const newErrors = {
            projectName: !campaignConfig.projectName.trim(),
            startDate: !campaignConfig.startDate,
            endDate: !campaignConfig.endDate,
            targetingLocation: !campaignConfig.targetingLocation.trim()
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleNext = () => {
        if (!validateForm()) {
            return;
        }

        // Save additional data to Redux that might not be saved yet
        dispatch(upsertCampaignConfig({ 
            productDescription,
            selectedCountry: selectedCountry || getCountryCode(campaignConfig.targetingLocation),
            selectedLocation
        }));

        // Navigate to campaign studio
        navigate('/CampaignCard');
    };

    const handlePrevious = () => {
        dispatch(resetCampaignConfig());
        console.log("Navigate to previous step");
        navigate('/product-description');
    };

    const handlePlaceChanged = () => {
        const place = autocompleteRef.current?.getPlace();
        if (place?.geometry?.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            const newLocation = { lat, lng };
            setSelectedLocation(newLocation);
            
            const address = place.formatted_address || "";
            // Update both local state and Redux
            dispatch(upsertCampaignConfig({ 
                targetingLocation: address,
                selectedLocation: newLocation
            }));

            const countryComponent = place.address_components?.find(
                component => component.types.includes('country')
            );
            if (countryComponent) {
                const countryCode = countryComponent.short_name;
                setSelectedCountry(countryCode);
                dispatch(upsertCampaignConfig({ selectedCountry: countryCode }));
            }
            
            // Clear error if location was selected
            setErrors(prev => ({ ...prev, targetingLocation: false }));
        }
    };

    // Handle manual input change for location field
    const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(upsertCampaignConfig({ targetingLocation: value }));
        if (value) {
            setErrors(prev => ({ ...prev, targetingLocation: false }));
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900" onClick={handlePrevious}>
                            <ArrowLeft className="h-4 w-4" />
                            <span className="font-medium">Back</span>
                        </Button>
                        <div className="flex items-center gap-2 ml-4">
                            <Settings className="h-5 w-5 text-primary" />
                            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Campaign Setup</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-8 pb-32">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Configure Your <span className="text-primary">Ad Campaign</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Set your campaign goals and targeting to generate optimized Meta Ads
                    </p>
                </div>

                <div className="space-y-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-8">
                            {/* Project Information */}
                            <Card className="shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Settings className="h-5 w-5 text-primary" /> Project name *
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Input
                                        value={campaignConfig.projectName}
                                        onChange={(e) =>
                                            dispatch(upsertCampaignConfig({ projectName: e.target.value }))
                                        }
                                        placeholder="Enter your project name"
                                        className={cn("text-base", errors.projectName && "border-red-500")}
                                    />
                                    {errors.projectName && (
                                        <p className="text-red-500 text-sm mt-1">Project name is required</p>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Campaign Goals */}
                            <Card className="shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="h-5 w-5 text-primary" /> Ad Goal
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <RadioGroup
                                        value={campaignConfig.adGoal}
                                        onValueChange={(value) =>
                                            dispatch(upsertCampaignConfig({ adGoal: value as "REACH" | "LEAD_GENERATION" | "CONVERSIONS" }))
                                        }
                                        className="grid md:grid-cols-3 gap-4"
                                    >
                                        {adGoalOptions.map((option) => {
                                            const isSelected = campaignConfig.adGoal === option.value;
                                            return (
                                                <div key={option.value} className="relative">
                                                    <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                                                    <label
                                                        htmlFor={option.value}
                                                        className={cn(
                                                            "cursor-pointer border-2 rounded-lg p-4 transition-all block h-full min-h-[200px] flex flex-col justify-between",
                                                            isSelected ? "border-primary bg-primary/5 shadow-lg scale-[1.03]" : "border-gray-200 bg-white"
                                                        )}
                                                    >
                                                        <div>
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-2xl", isSelected ? "bg-primary/20" : "bg-gray-100")}>
                                                                    {option.icon}
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                                                        {option.title}
                                                                        {isSelected && (
                                                                            <span className="absolute -top-3 left-1/4 bg-primary text-white text-xs px-2 py-1 rounded-full">Selected</span>
                                                                        )}
                                                                    </h4>
                                                                    <p className="text-xs text-gray-600">{option.description}</p>
                                                                </div>
                                                            </div>
                                                            <p className="text-sm text-gray-600">{option.content}</p>
                                                        </div>
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </RadioGroup>
                                </CardContent>
                            </Card>

                            {/* Campaign Settings */}
                            <Card className="shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Settings className="h-5 w-5 text-primary" /> Campaign Settings
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <Label className="text-base font-medium mb-2 block">
                                            Ad Conversion Button
                                        </Label>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button 
                                                    variant="outline" 
                                                    className="w-full justify-between text-left"
                                                >
                                                    {campaignConfig.conversionButton || "Select an option"}
                                                    <span className="ml-2">▼</span>
                                                </Button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent
                                                className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-full"
                                                align="start"
                                            >
                                                {["Contact Us", "Call Us", "Shop Now", "Learn More", "Sign Up"].map(
                                                    (option) => (
                                                        <DropdownMenuItem
                                                            key={option}
                                                            onSelect={() => dispatch(upsertCampaignConfig({ conversionButton: option }))}
                                                        >
                                                            {option}
                                                        </DropdownMenuItem>
                                                    )
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="flex items-center gap-2 mb-2">
                                                <Calendar className="h-4 w-4" /> Start Date *
                                            </Label>
                                            <DatePicker
                                                value={
                                                    campaignConfig.startDate
                                                        ? (typeof campaignConfig.startDate === "string"
                                                            ? new Date(campaignConfig.startDate)
                                                            : campaignConfig.startDate)
                                                        : undefined
                                                }
                                                onChange={(date) => handleDateChange("startDate", date)}
                                                placeholder="Select start date"
                                            />
                                            {errors.startDate && (
                                                <p className="text-red-500 text-xs mt-1">Start date is required</p>
                                            )}
                                        </div>
                                        <div>
                                            <Label className="flex items-center gap-2 mb-2">
                                                <Calendar className="h-4 w-4" /> End Date *
                                            </Label>
                                            <DatePicker
                                                value={
                                                    campaignConfig.endDate
                                                        ? (typeof campaignConfig.endDate === "string"
                                                            ? new Date(campaignConfig.endDate)
                                                            : campaignConfig.endDate)
                                                        : undefined
                                                }
                                                onChange={(date) => handleDateChange("endDate", date)}
                                                placeholder="Select end date"
                                            />
                                            {errors.endDate && (
                                                <p className="text-red-500 text-xs mt-1">End date is required</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Location + Map */}
                                    <div>
                                        <Label className="flex items-center gap-2 mb-2">
                                            <MapPin className="h-4 w-4" /> Cities and Countries to Advertise *
                                        </Label>

                                        {isLoaded ? (
                                            <>
                                                <Autocomplete
                                                    onLoad={(ac) => (autocompleteRef.current = ac)}
                                                    onPlaceChanged={handlePlaceChanged}
                                                >
                                                    <Input
                                                        value={campaignConfig.targetingLocation}
                                                        onChange={handleLocationInputChange}
                                                        placeholder="Add a city or country"
                                                        className={cn("text-base", errors.targetingLocation && "border-red-500")}
                                                    />
                                                </Autocomplete>

                                                {errors.targetingLocation && (
                                                    <p className="text-red-500 text-xs mt-1">Location is required</p>
                                                )}

                                                {selectedLocation && (
                                                    <div className="h-64 w-full rounded-lg overflow-hidden border mt-4">
                                                        <GoogleMap
                                                            mapContainerStyle={{ width: "100%", height: "100%" }}
                                                            center={selectedLocation}
                                                            zoom={12}
                                                        >
                                                            <Marker position={selectedLocation} />
                                                        </GoogleMap>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <Input
                                                placeholder="Loading Google Maps..."
                                                disabled
                                                className="text-base"
                                            />
                                        )}
                                    </div>

                                    {/* Daily Budget */}
                                    <div>
                                        <Label className="flex items-center gap-2 mb-2">
                                            <DollarSign className="h-4 w-4" /> Daily Budget
                                        </Label>
                                        <div className="space-y-4">
                                            <Slider
                                                value={[campaignConfig.dailyBudget || 50]}
                                                onValueChange={(value) => 
                                                    dispatch(upsertCampaignConfig({ dailyBudget: value[0] }))
                                                }
                                                max={200}
                                                min={10}
                                                step={5}
                                                className="w-full"
                                            />
                                            <div className="flex justify-between text-sm text-gray-600">
                                                <span>$10</span>
                                                <span className="font-medium text-primary">
                                                    ${campaignConfig.dailyBudget || 50}/day
                                                </span>
                                                <span>$200</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8">
                            {/* Product Description */}
                            <Card className="shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Target className="h-5 w-5 text-primary" /> Product Description
                                        </div>
                                        {!isEditingDescription && (
                                            <Button variant="outline" size="sm" onClick={handleEditDescription}>
                                                <Edit3 className="h-4 w-4 mr-2" /> Edit
                                            </Button>
                                        )}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {isEditingDescription ? (
                                        <div className="space-y-4">
                                            <Textarea
                                                value={tempDescription}
                                                onChange={(e) => setTempDescription(e.target.value)}
                                                className="min-h-[200px] text-base"
                                            />
                                            <div className="flex gap-2">
                                                <Button onClick={handleSaveDescription} size="sm">
                                                    <Save className="h-4 w-4 mr-2" /> Save
                                                </Button>
                                                <Button variant="outline" onClick={handleCancelDescription} size="sm">
                                                    <X className="h-4 w-4 mr-2" /> Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="prose max-w-none">
                                            <p className="text-gray-700 leading-relaxed text-base">{productDescription}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50">
                        <div className="max-w-7xl mx-auto px-6 py-4">
                            <div className="flex items-center justify-center space-x-4">
                                <Button variant="outline" onClick={handlePrevious} className="px-8">
                                    Previous
                                </Button>
                                <Button onClick={handleNext} className="px-8 bg-primary hover:bg-primary/90">
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}