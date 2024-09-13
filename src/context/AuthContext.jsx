import {
  createContext,
  useState,
  useEffect,
} from "react";


const defaultState = {
  user: {
    username: "",
    phone: "",
    uidd: "",
    pochta_index: "",
    isUser: false,
    side: false,
    id: 0,
    adress: "",
    context: "",
    email: "",
    first_name: "",
    last_name: "",
    groups: [{ id: NaN, name: "" }],
  },
  setUser: (user) => {},
};

export const AuthContext = createContext(defaultState);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    {
      side: false,
      phone: "",
      pochta_index: "",
      username: "",
      uidd: "",
      isUser: false,
      id: 0,
      adress: "",
      context: "",
      email: "",
      first_name: "",
      last_name: "",
      groups: [{ id: NaN, name: "" }],
    } || localStorage.getItem("user")
  );
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
