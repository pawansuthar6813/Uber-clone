import axios from 'axios'
import { Captain as captainModel } from '../models/captain.model.js';


export const getAddressCoordinate = async (address) => {
    try {
        const api_key = process.env.GOOGLE_MAPS_API_KEY;

        // URL encode the address to handle spaces and special characters
        const encodedAddress = encodeURIComponent(address);
        const path = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodedAddress}&key=${api_key}`;
        
        const response = await axios.get(path);
        
        
        // Check if the API call was successful
        if (response.data.status !== 'OK') {
            console.log('Geocoding API error:', response.data.status);
            return null;
        }
        
        // Check if results exist
        if (!response.data.results || response.data.results.length === 0) {
            console.log('No results found for address:', address);
            return null;
        }
        
        
        
        // Extract coordinates from response.data, not response directly
        const ltd = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;

        // Return the coordinates

        return { ltd, lng, data: response.data };
        // return {lat, lng, data: response.data};
        
    } catch (error) {
        console.log('Error in addressCoordinate:', error.message);
        return null;
    }
}


export const getDistanceTime = async (originAddress, destinationAddress ) => {

  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json`;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const params = {
    origins: originAddress,
    destinations: destinationAddress,
    units: 'metric',
    key: apiKey
  };

  const { data } = await axios.get(url, { params });

  if (data.status !== "OK") {
    throw new Error("API Error: " + data.status);
  }

  const result = data.rows[0].elements[0];

  if (result.status !== "OK") {
    throw new Error("Route error: " + result.status);
  }

  return {
    distanceText: result.distance.text,
    distanceValue: result.distance.value, // in meters
    durationText: result.duration.text,
    durationValue: result.duration.value // in seconds
  };
}

export async function getAddressSuggestions(input) {
  if (!input || input.trim() === "") {
    throw new Error("Input address is empty.");
  }

  const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json`;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const params = {
    input: encodeURIComponent(input.trim()), // ensure safe input
    key: apiKey,
    types: 'address'
  };

  const { data } = await axios.get(url, { params });

  if (data.status !== "OK") {
    throw new Error(`Autocomplete Error: ${data.status} - ${data.error_message || "No details"}`);
  }

  return data.predictions.map(prediction => prediction.description);
}

export const getCaptainsNearMe = async (ltd, lng, radius) => {

  
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [ [ ltd, lng ], radius / 6371]
      }
    }
  }).select("-location -password")

  return captains;
}
