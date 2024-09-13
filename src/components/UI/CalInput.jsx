import React, { memo, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const CalSectionInput = ({ state, setState, setLocation, placeholder }) => {

  const handleChange = (newAddress) => {
    setState(newAddress);
  };
  
  const handleSelect = (newAddress) => {
    geocodeByAddress(newAddress)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setLocation([latLng.lat, latLng.lng]);
      })
      .catch((error) => {
        console.error("Error fetching geolocation data", error);
      });
  };
  

  return (
    <PlacesAutocomplete
      value={state}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="relative z-20">
          <input
            {...getInputProps({
              placeholder,
              className:
                "h-[50px] w-full md:h-[61.67px] rounded-lg md:rounded-[9px] cursor-pointer outline-none border border-[#D0D5DD] text-base md:text-[17px] placeholder:text-[#667085CC] text-[#667085CC] placeholder:text-[16px] px-4 font-semibold placeholder:font-semibold",
            })}
            required
          />
          
          {suggestions && (
            <div
              className={`autocomplete-dropdown-container bg-white  ${
                suggestions[0]?.description
                  ? "p-2 mt-3 z-[9] gap-y-1 border-[#1348F9] border-2 rounded-lg"
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
                        setState(suggestion.description);
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

export default memo(CalSectionInput);
