/* eslint-disable react/display-name, jsx-a11y/click-events-have-key-events */
import { Navigation } from "react-minimal-side-navigation";
import { useHistory, useLocation } from "react-router-dom";
import Icon from "awesome-react-icons";
import React, { useState } from "react";

import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

export const NavSidebar = () => {
  const history = useHistory();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <React.Fragment>
      {/* Sidebar Overlay */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 z-20 block transition-opacity bg-black opacity-50 lg:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      />

      <div className="absolute right-0">
        <a href="#"></a>
      </div>

      <div>
        <button
          className="btn-menu"
          onClick={() => setIsSidebarOpen(true)}
          type="button"
        >
          <Icon name="burger" className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-yellow-400 border-r-2 lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}
      >
        

        <Navigation
          activeItemId={location.pathname}
          onSelect={({ itemId }) => {
            history.push(itemId);
          }}
          items={[
            {
              title: "Информационная панель",
              itemId: "/admin",
              elemBefore: () => <Icon name="coffee" />
            },
            {
              title: "Клиенты",
              itemId: "/client",
              elemBefore: () => <Icon name="user" />,
              subNav: [
                // {
                //   title: "Добавить клиента",
                //   itemId: "/addclient"
                // },
                {
                  title: "Список клиентов",
                  itemId: "/client"
                }
              ]
            },

            {
              title: "Продукты",
              itemId: "/add-blog",
              elemBefore: () => <Icon name="user" />,
              subNav: [
                {
                  title: "Добавить Услуги",
                  itemId: "/add-service"
                },
                {
                  title: "Добавить Блог",
                  itemId: "/add-blog"
                }
              ]
            },

            {
              title: "Грузоотправители",
              itemId: "/shippers",
              elemBefore: () => <Icon name="user" />,
              subNav: [
                {
                  title: "Добавить грузоотправителя",
                  itemId: "/addshippers"
                },
                {
                  title: "Список грузоотправителейг",
                  itemId: "/shippers"
                }
              ]
            },

            {
              title: "Грузополучатели",
              itemId: "/consignees",
              elemBefore: () => <Icon name="user" />,
              subNav: [
                {
                  title: "Добавить грузополучатели",
                  itemId: "/addconsignees"
                },
                {
                  title: "Список грузополучатели",
                  itemId: "/consignees"
                }
              ]
            },
            {
              title: "Отправки",
              itemId: "/dispatch",
              elemBefore: () => <Icon name="user" />,
              subNav: [
                {
                  title: "Добавить отправки",
                  itemId: "/adddispatch"
                },
                {
                  title: "Список отправки",
                  itemId: "/dispatch"
                }
              ]
            },
            {
              title: "Сообщения",
              itemId: "/message",
              elemBefore: () => <Icon name="user" />,
              subNav: [
                {
                  title: "SMS-отправка",
                  itemId: "/message"
                }
              ]
            },

            {
              title: "Кошелек",
              itemId: "/wallet",
              elemBefore: () => <Icon name="coffee" />
            },
            {
              title: "Тарифы",
              itemId: "/rates",
              elemBefore: () => <Icon name="coffee" />
            },
            {
              title: "В пути",
              itemId: "/way",
              elemBefore: () => <Icon name="coffee" />
            },
            {
              title: "Настройки",
              itemId: "/settings",
              elemBefore: () => <Icon name="coffee" />
            },
            
          ]}
        />

        <div className="absolute bottom-0 w-full my-8">
          <Navigation
            activeItemId={location.pathname}
            items={[
              {
                title: "Settings",
                itemId: "/settings",
                elemBefore: () => <Icon name="activity" />
              }
            ]}
            onSelect={({ itemId }) => {
              history.push(itemId);
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
