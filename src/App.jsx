import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "typeface-raleway";

import {
  AddClient,
  AddConsignessComp,
  AddDispatch,
  AddShippers,
  AdminLogin,
  AdminPage,
  Chat,
  Clients,
  Conignees,
  Dispatch,
  Message,
  Rates,
  Shippers,
  Wallet,
  Way,
} from "./app/dashboard";
import React, { Suspense, useCallback, useContext, useEffect, useState } from "react";

import {
  Gruze,
  Profile,
  UserChat,
  UserHomePage,
  UserMessage,
} from "./app/user";
import AddServices from "./app/dashboard/AddServices";
import AddBlog from "./app/dashboard/AddBlog";
import { Toaster } from "react-hot-toast";
import EditShipersTable from "./components/admin/a/editShipers";
import EditConsignees from "./components/admin/b/editConsignees";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import RootLayout from "./components/layouts/RootLayout";
import { SideContext } from "./context/sidemenu";
import { DropContext } from "./context/DropdownContext";
import DropProvider from "./context/DropdownContext";
import Sidedata from "./components/sidedata";
import Usluga from "./app/delivery/usluga";
import { ServiceContextProvider } from "./context/ServiceContext";
import Example from "./context/Example";
import Sitemap from "./route";
import LocationSearchInput from "./components/UI/loadInput";
import { useTranslation } from "react-i18next";
import ResetPassword from "./components/client/ResetPassword";
import Partners from "./app/delivery/Partners";
import Ref from "./app/delivery/Ref";
import Politics from "./app/delivery/Politics";
import axios from "axios";
import { BASE_URL } from "./service/auth";
import Thank from "./app/delivery/Thank";
import MainLoader from "./components/client/MainLoader";

const Blog = React.lazy(() => import('./app/delivery/blog'));
const BlogDetail = React.lazy(() => import('./app/delivery/blogDetail'));
const Calculator = React.lazy(() => import('./app/delivery/calculator'));
const Main = React.lazy(() => import('./app/delivery/main'));
const Service = React.lazy(() => import('./app/delivery/service'));
const Reviews = React.lazy(() => import('./app/delivery/reviews'));

function App() {
  const [t, i18n] = useTranslation("global");
  const location = useLocation();
  const navigation = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const isStepTrue = queryParams.get("token");
  const { user, setUser } = useContext(AuthContext);
  const [nav, setNav] = useState(false);
  const [side, setSide] = useState(false);

  const setUserData = useCallback(async () => {
    try {
      if (isStepTrue) {
        localStorage.setItem("token", JSON.stringify(isStepTrue));
        const config = {
          headers: {
            Authorization: `Bearer ${isStepTrue}`,
          },
        };
        const res = await axios.get(
          `${BASE_URL}/a_api/admin_panel/user_profiles_views/`,
          config
        );
        let auth = {
          username: res?.data?.username,
          uidd: "",
          isUser: true,
          id: 0,
          adress: "",
          context: "",
          email: res?.data?.email || "",
          first_name: "",
          side: false,
          last_name: "",
          groups: res?.data?.groups,
        };
        setUser(auth);
        localStorage.setItem("user", JSON.stringify(auth));
        navigation("/user-profile");
      }
    } catch (error) {
      console.log(error);
    }
  }, [isStepTrue, setUser, navigation]);

  useEffect(() => {
    setUserData()
  }, [setUserData]);

  const handleChangeLanguage = useCallback(() => {
    const lang = localStorage.getItem("user_lang")
      ? localStorage.getItem("user_lang")
      : "ru";
    i18n.changeLanguage(lang);
    localStorage.setItem("user_lang", lang);
  }, []);

  console.log('App component re-rendered')

  useEffect(() => {
    handleChangeLanguage();
  }, [handleChangeLanguage]);
  return (
    <Suspense fallback={<MainLoader />}>
      <AuthProvider>
        <SideContext.Provider value={{ side, setSide }}>
          <DropProvider>
            <ServiceContextProvider>
              <div
                className="relative w-full h-full"
                onClick={() => setSide(false)}
              >
                {side && <Sidedata setSide={setSide} setUser={setUser} />}
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route
                    path="/services"
                    element={
                      <RootLayout setNav={setNav} nav={nav} title="Услуги">
                        <Service />
                      </RootLayout>
                    }
                  />
                  <Route
                    path="/reset-password/:slug/:id"
                    element={<ResetPassword />}
                  />
                  <Route path="/services/:id" element={<Usluga />} />
                  <Route path="/partners" element={<Partners />} />
                  <Route path="/input" element={<LocationSearchInput />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/example" element={<Example />} />
                  <Route path="/blog/:id" element={<BlogDetail />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/calculator" element={<Calculator />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/addclient" element={<AddClient />} />
                  <Route path="/client" element={<Clients />} />
                  <Route path="/addshippers" element={<AddShippers />} />
                  <Route path="/ref" element={<Ref />} />
                  <Route path="/politics" element={<Politics />} />
                  <Route path="/thank-you" element={<Thank />} />
                  <Route
                    path="/editshippers/:id"
                    element={<EditShipersTable />}
                  />
                  <Route
                    path="/editconsignees/:id"
                    element={<EditConsignees />}
                  />
                  <Route path="/shippers" element={<Shippers />} />
                  <Route path="/addconsignees" element={<AddConsignessComp />} />
                  <Route path="/consignees" element={<Conignees />} />
                  <Route path="/adddispatch" element={<AddDispatch />} />
                  <Route path="/dispatch" element={<Dispatch />} />
                  <Route path="/message" element={<Message />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/rates" element={<Rates />} />
                  <Route path="/way" element={<Way />} />
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route path="/user-home" element={<UserHomePage />} />
                  <Route path="/user-about/:id" element={<Gruze />} />
                  <Route path="/user-profile" element={<Profile />} />
                  <Route path="/user-message" element={<UserMessage />} />
                  <Route path="/user-chat" element={<UserChat />} />
                  <Route path="/add-service" element={<AddServices />} />
                  <Route path="/add-blog" element={<AddBlog />} />
                  <Route path="/sitemap.xml" element={<Sitemap />} />
                </Routes>
              </div>
              <Toaster toastOptions={{ duration: 4000 }} />
            </ServiceContextProvider>
          </DropProvider>
        </SideContext.Provider>
      </AuthProvider>
    </Suspense>
  );
}

export default App
