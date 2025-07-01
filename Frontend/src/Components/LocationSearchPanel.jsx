// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import mapIcon from '../assets/map-pin.png';
// import { useRide } from '../Context/RideContext';

// const LocationSearchPanel = ({
//   vehiclePanelOpen,
//   setPanelOpen,
//   setVehiclePanelOpen,
//   searchQuery = '', // Add searchQuery as a prop
//   onLocationSelect, // Callback to handle location selection
//   activeField, // Which field is currently active (pickup/destination)
//   formData
// }) => {
//   const [locations, setLocations] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   const { ride, setRide } = useRide();

//   // Function to fetch location suggestions
//   const fetchLocationSuggestions = async (query) => {
//     if (!query.trim()) {
//       setLocations([])
//       // Don't clear error here - let validation errors persist
//       return
//     }

//     setLoading(true)
//     // Only clear error if we're actually searching
//     setError(null)

//     try {
//       const token = localStorage.getItem("UserToken");

//       const response = await axios.post('http://localhost:8080/api/maps/get-suggestions', {
//         input: query
//       }, {
//         withCredentials: true,
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (response.data.success) {
//         setLocations(response.data.data)
//       } else {
//         setError('Failed to fetch suggestions')
//         setLocations([])
//       }
//     } catch (err) {
//       console.error('Error fetching location suggestions:', err)
//       setError('Failed to fetch suggestions')
//       setLocations([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const findRide = async () => {
//     // Always validate current form data regardless of API state
//     const pickupEmpty = !formData.pickup || formData.pickup.trim() === ''
//     const destinationEmpty = !formData.destination || formData.destination.trim() === ''

//     if (pickupEmpty && destinationEmpty) {
//       setError("Enter pickup and destination locations")
//       return;
//     }

//     if (pickupEmpty) {
//       setError("Enter pickup location")
//       return;
//     }

//     if (destinationEmpty) {
//       setError("Enter destination location")
//       return;
//     }


//     // set pickup and destination to ride context
//     // setRide((prevData) => {
//     //   return {
//     //     ...prevData,
//     //     pickup: formData.pickup,
//     //     destination: formData.destination
//     //   }
//     // })

//     // now fetch journey details from server

//     const token = localStorage.getItem("UserToken");
//     // make api call
//     const response = await axios.post('http://localhost:8080/api/rides/get-journey-details', {
//       pickup: formData.pickup,
//       destination: formData.destination
//     }, {
//       withCredentials: true,
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     console.log(response.data)

//     // set distance and fare to context
//     if (response.data.success) {
//       setRide((prevData) => {
//         return {
//           ...prevData,
//           pickup: formData.pickup,
//           destination: formData.destination,
//           fare: response.data.fare,
//           distance: response.data.distance,
//           time: response.data.time
//         }
//       })

//       console.log(ride)

//       // Clear any existing errors and proceed
//       setError(null)
//       setPanelOpen(false);
//       setVehiclePanelOpen(true);

//     } else {
//       console.error("failed to fetch fair");
//       setError("internal server error")
//     }

//   }

//   // Effect to fetch suggestions when searchQuery changes
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       fetchLocationSuggestions(searchQuery)
//     }, 1000) // Debounce API calls by 1000ms

//     return () => clearTimeout(timeoutId)
//   }, [searchQuery])

//   // Additional effect to validate form data changes
//   useEffect(() => {
//     // Clear validation errors when user starts typing in either field
//     if (formData.pickup?.trim() || formData.destination?.trim()) {
//       // Only clear validation errors, not API errors
//       if (error && (
//         error.includes("pickup") ||
//         error.includes("destination") ||
//         error.includes("Enter pickup and destination locations")
//       )) {
//         setError(null)
//       }
//     }
//   }, [formData.pickup, formData.destination])

//   // Show loading state
//   if (loading) {
//     return (
//       <div className="flex flex-col justify-center items-center gap-2">
//         <div className="text-gray-500">Loading suggestions...</div>
//         {error && (
//           <div className="text-red-500 text-sm text-center px-4">{error}</div>
//         )}
//         <button
//           className='bg-black w-[90%] h-10 mt-16 rounded-lg text-white font-semibold'
//           onClick={findRide}
//         >Find a Ride</button>
//       </div>
//     )
//   }

//   // Show error state (but still allow button interaction)
//   if (error) {
//     return (
//       <div className="flex flex-col justify-center items-center gap-2 py-4">
//         <div className="text-red-500 text-sm text-center px-4">{error}</div>
//         <button
//           className='bg-black w-[90%] h-10 mt-16 rounded-lg text-white font-semibold'
//           onClick={findRide}
//         >Find a Ride</button>
//       </div>
//     )
//   }

//   // Show no results state
//   if (searchQuery && locations.length === 0 && !loading) {
//     return (
//       <div className="flex flex-col gap-2 justify-center items-center py-4">
//         <div className="text-gray-500">No suggestions found</div>
//         <button
//           className='bg-black w-[90%] h-10 mt-16 rounded-lg text-white font-semibold'
//           onClick={findRide}
//         >Find a Ride</button>
//       </div>
//     )
//   }

//   // Show location suggestions
//   return (
//     <div>
//       {locations.map((loc, idx) => {
//         return (
//           <div
//             key={idx}
//             onClick={() => {
//               onLocationSelect(loc); // Call the callback with selected location
//               // setVehiclePanelOpen(true);
//             }}
//             className='flex items-center justify-start px-5 gap-3 cursor-pointer py-3 border-2 border-white rounded-lg ml-2 mr-2 mb-2 active:border-black hover:bg-gray-50 transition-colors'
//           >
//             <img
//               src={mapIcon}
//               alt="map-icon"
//               className='h-8 w-8 bg-[#eee] p-2 rounded-full flex justify-center items-center flex-shrink-0'
//             />
//             <h4 className='font-medium text-sm leading-tight'>{loc}</h4>
//           </div>
//         )
//       })}
//       <div className='w-full p-4 flex justify-center items-center'>
//         <button
//           className='bg-black w-[90%] h-10 mt-16 rounded-lg text-white font-semibold'
//           onClick={findRide}
//         >Find a Ride</button>
//       </div>
//     </div>
//   )
// }

// export default LocationSearchPanel;




import { useState, useEffect } from 'react'
import axios from 'axios'
import mapIcon from '../assets/map-pin.png';
import { useRide } from '../Context/RideContext';

const LocationSearchPanel = ({
  vehiclePanelOpen,
  setPanelOpen,
  setVehiclePanelOpen,
  searchQuery = '',
  onLocationSelect,
  activeField,
  formData
}) => {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { ride, setRide } = useRide();

  // Function to fetch location suggestions
  const fetchLocationSuggestions = async (query) => {
    if (!query.trim()) {
      setLocations([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const token = localStorage.getItem("UserToken");

      const response = await axios.post('http://localhost:8080/api/maps/get-suggestions', {
        input: query
      }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setLocations(response.data.data)
      } else {
        setError('Failed to fetch suggestions')
        setLocations([])
      }
    } catch (err) {
      console.error('Error fetching location suggestions:', err)
      console.log(err)
      setError('Failed to fetch suggestions')
      setLocations([])
    } finally {
      setLoading(false)
    }
  }

  const findRide = async () => {
    // console.log('🚀 findRide function called'); // Debug log
    // console.log('📍 Form data:', formData); // Debug log

    // Always validate current form data regardless of API state
    const pickupEmpty = !formData.pickup || formData.pickup.trim() === ''
    const destinationEmpty = !formData.destination || formData.destination.trim() === ''

    if (pickupEmpty && destinationEmpty) {
      console.log('❌ Validation failed: Both locations empty');
      setError("Enter pickup and destination locations")
      return;
    }

    if (pickupEmpty) {
      console.log('❌ Validation failed: Pickup empty');
      setError("Enter pickup location")
      return;
    }

    if (destinationEmpty) {
      console.log('❌ Validation failed: Destination empty');
      setError("Enter destination location")
      return;
    }

    // console.log('✅ Validation passed, making API call...');

    try {
      // Clear any existing errors
      setError(null);
      
      const token = localStorage.getItem("UserToken");
      // console.log('🔑 Token:', token ? 'Present' : 'Missing');

      // Make API call with detailed logging
      // console.log('📡 Making API request to get journey details...');
      
      const response = await axios.post('http://localhost:8080/api/rides/get-journey-details', {
        pickup: formData.pickup,
        destination: formData.destination
      }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // console.log('✅ API Response received:', response.data);

      // Set distance and fare to context
      if (response.data.success) {
        // console.log('🎉 Journey details fetched successfully');
        
        const newRideData = {
          ...ride,
          pickup: formData.pickup,
          destination: formData.destination,
          fare: response.data.data.fare,
          distance: response.data.data.distance,
          time: response.data.data.time
        };

        // console.log('📝 Updating ride context with:', newRideData);
        
        setRide(newRideData);

        // Clear any existing errors and proceed
        setError(null)
        setPanelOpen(false);
        setVehiclePanelOpen(true);

      } else {
        console.error("❌ API returned success: false");
        console.error("Response data:", response.data);
        setError("Failed to get journey details")
      }

    } catch (err) {
      console.error('💥 API call failed:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again.");
      } else {
        setError("Failed to get journey details. Please try again.");
      }
    }
  }

  // Effect to fetch suggestions when searchQuery changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchLocationSuggestions(searchQuery)
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  // Additional effect to validate form data changes
  useEffect(() => {
    if (formData.pickup?.trim() || formData.destination?.trim()) {
      if (error && (
        error.includes("pickup") ||
        error.includes("destination") ||
        error.includes("Enter pickup and destination locations")
      )) {
        setError(null)
      }
    }
  }, [formData.pickup, formData.destination])

  // Effect to log ride context changes
  useEffect(() => {
    console.log('🔄 Ride context updated:', ride);
  }, [ride]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="text-gray-500">Loading suggestions...</div>
        {error && (
          <div className="text-red-500 text-sm text-center px-4">{error}</div>
        )}
        <button
          className='bg-black w-[90%] h-10 mt-16 rounded-lg text-white font-semibold'
          onClick={findRide}
        >Find a Ride</button>
      </div>
    )
  }

  // Show error state (but still allow button interaction)
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center gap-2 py-4">
        <div className="text-red-500 text-sm text-center px-4">{error}</div>
        <button
          className='bg-black w-[90%] h-10 mt-16 rounded-lg text-white font-semibold'
          onClick={findRide}
        >Find a Ride</button>
      </div>
    )
  }

  // Show no results state
  if (searchQuery && locations.length === 0 && !loading) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center py-4">
        <div className="text-gray-500">No suggestions found</div>
        <button
          className='bg-black w-[90%] h-10 mt-16 rounded-lg text-white font-semibold'
          onClick={findRide}
        >Find a Ride</button>
      </div>
    )
  }

  // Show location suggestions
  return (
    <div>
      {locations.map((loc, idx) => {
        return (
          <div
            key={idx}
            onClick={() => {
              onLocationSelect(loc);
            }}
            className='flex items-center justify-start px-5 gap-3 cursor-pointer py-3 border-2 border-white rounded-lg ml-2 mr-2 mb-2 active:border-black hover:bg-gray-50 transition-colors'
          >
            <img
              src={mapIcon}
              alt="map-icon"
              className='h-8 w-8 bg-[#eee] p-2 rounded-full flex justify-center items-center flex-shrink-0'
            />
            <h4 className='font-medium text-sm leading-tight'>{loc}</h4>
          </div>
        )
      })}
      <div className='w-full p-4 flex justify-center items-center'>
        <button
          className='bg-black w-[90%] h-10 mt-16 rounded-lg text-white font-semibold'
          onClick={findRide}
        >Find a Ride</button>
      </div>
    </div>
  )
}

export default LocationSearchPanel;