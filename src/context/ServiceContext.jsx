import { createContext, useState } from "react";

const defaultState = {
    id: "",
    from: "",
    to: "",
    categoryName: ""
}

export const ServiceContext = createContext(defaultState)


export const ServiceContextProvider = ({children}) => {
    const [location, setLocation] = useState(defaultState)

    return (
        <ServiceContext.Provider value={{location, setLocation}}>
            {children}
        </ServiceContext.Provider>
    )
}