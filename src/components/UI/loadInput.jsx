import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const LocationSearchInput = ({ img, setState, setLocation, startCity }) => {
  const [address, setAddress] = useState("");
  const [t] = useTranslation("global");

  useEffect(() => {
    if (startCity) {
      setAddress(startCity);
    }
  }, [startCity]);

  const handleChange = (newAddress) => {
    setAddress(newAddress);
    setState(newAddress);
  };

  const handleSelect = (newAddress) => {
    try {
      geocodeByAddress(newAddress)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => setLocation([latLng?.lat, latLng?.lng]))
        .catch((error) => console.error("Error", error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      searchOptions={{
        types: ['(cities)'], // Restrict to cities
      }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="relative">
          <input
            {...getInputProps({
              placeholder: t(`sto.st16`),
              className:
                "location-search-input border w-[100%] py-2 rounded-md text-[#667085] text-[14px]  focus:outline-[#1348F9] px-12 font-medium",
            })}
            value={address} // Display the startCity value in the input
          />
          <div className="w-[17px] h-[22px] absolute top-2 left-4">
            <img
              src={img}
              alt="location"
              width={100}
              height={100}
              className="w-[100%] h-[100%]"
            />
          </div>
          {suggestions && (
            <div
              className={`autocomplete-dropdown-container ${
                suggestions[0]?.description
                  ? "p-2 mt-3 z-[9999] gap-y-1 border-[#1348F9] border-2 rounded-lg"
                  : ""
              } `}
            >
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span
                      className="text-[#1348F9] font-semibold"
                      onClick={() => {
                        setAddress(suggestion.description);
                        setState(suggestion.description);
                      }}
                    >
                      {suggestion.description}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
