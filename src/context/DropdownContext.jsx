
import { createContext, useEffect, useState } from 'react'


const defaultData = {
    address:  "",
    context: "",
    email:  "",
    first_name: "",
    id:  Number,
    last_name: "",
    phone:  "",
    pochta_index: "",
    uidd: "",
    username: ""
}

export const DropContext = createContext(defaultData);

export default function DropProvider({children}) {
    const [drop, setDrop] = useState()

    useEffect(() => {
        const storedUser = localStorage.getItem("drop");
        if (storedUser) {
          setDrop(JSON.parse(storedUser));
        }
      }, []);

    return (
        <DropContext.Provider value={{drop, setDrop}}>
            {children}
        </DropContext.Provider>
    )
}