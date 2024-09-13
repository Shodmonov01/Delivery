import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const FinishInput = ({  setState, state, name, pl }) => {
  const [address, setAddress] = useState("");
  const [t] = useTranslation("global");


  const handleChange = (newAddress) => {
    setAddress(newAddress);
    setState({...state, [name]: newAddress});
  };

  const handleSelect = (newAddress) => {
    try {
      geocodeByAddress(newAddress)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => console.log(latLng))
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
        types: ['address'], // Address types to get suggestions for streets, villages, etc.
      }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="relative">
          <input
            {...getInputProps({
              placeholder: pl,
              className:
                "location-search-input border w-[100%] py-2 rounded-md text-[#667085] text-[14px]  focus:outline-[#1348F9] px-3 font-medium",
            })}
            value={address} // StartCity qiymatini inputda ko'rsatish
        required
          />
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
                        setState({...state, [name]: suggestion.description});
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

export default FinishInput;
