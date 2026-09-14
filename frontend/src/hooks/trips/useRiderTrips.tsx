// type formStructure = {
//   latitude: number;
//   longitude: number;
// };

// export const useRiderTrips = () => {
//   const appendAddressToRequest = (
//     form: FormData,
//     pickup: string,
//     destination: string,
//   ) => {
//     form.append("pickup-address", pickup);
//     form.append("destination-address", destination);
//     return form;
//   };
//   const generateFormSubmission = (
//     intent: string,
//     pickupCoord?: formStructure,
//     dstCoord?: formStructure,
//   ) => {
//     const form = new FormData();
//     const pickup = pickupCoord ?? geoCords;
//     const dest = dstCoord ?? destination;
//     if (!pickup || !dest) return;
//     form.append("intent", intent);
//     form.append("pickup-latitude", String(pickup.latitude));
//     form.append("pickup-longitude", String(pickup.longitude));
//     form.append("destination-latitude", String(dest?.latitude));
//     form.append("destination-longitude", String(dest?.longitude));
//     return form;
//   };

//   useEffect(() => {
//     if (!quoteFetcher) return;
//     console.log("actionData", quoteFetcher.data);
//     setFare(quoteFetcher.data?.fare ?? null);
//   }, [quoteFetcher]);

//   const handleQuickSelect = async (type: "home" | "work") => {
//     console.log("type: ", type);
//     switch (type) {
//       case "home":
//         if (!rider) return;
//         const home = {
//           latitude: rider?.homeLatitude ?? 0,
//           longitude: rider?.homeLongitude ?? 0,
//         };
//         setRideType("home");
//         const form = generateFormSubmission("quote", undefined, home);
//         if (!form || !geoCords) return;
//         quoteFetcher.submit(form, {
//           method: "POST",
//           action: "/rider",
//         });
//         break;
//       case "work":
//         setRideType("work");
//     }
//   };
// };
