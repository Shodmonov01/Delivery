export const sidebars = [
  {
    id: 1,
    title: "Информационная панель",
    logo: "/side1.svg",
    nav: 0,
    visible: true,
    link: "/admin",
    submenu: []
  },
  {
    id: 2,
    title: "Клиенты",
    logo: "/side2.svg",
    nav: 1,
    visible: false,
    link: "",
    submenu: [
        // {
        //     id: 1,
        //     title: "Добавить клиента",
        //     visible: false,
        //     link: "/addclient"
        // },
        {
            id: 2,
            title: "Список клиентов",
            visible: false,
            link: '/client'
        },
    ]
  },
  {
    id: 3,
    title: "Продукты",
    logo: "/iconmonstr-product-3.svg",
    nav: 1,
    visible: false,
    link: "",
    submenu: [
        {
            id: 3,
            title: "Добавить Услуги",
            visible: false,
            link: "/add-service"
        },
        {
            id: 4,
            title: "Добавить Блог",
            visible: false,
            link: '/add-blog'
        },
    ]
  },
  {
    id: 4,
    title: "Грузоотправители",
    logo: "/side3.svg",
    nav: 1,
    visible: false,
    link: "",
    submenu: [
        {
            id: 5,
            title: "Добавить грузоотправителя",
            visible: false,
            link: "/addshippers"
        },
        {
            id: 6,
            title: "Список грузоотправителя",
            visible: false,
            link: "/shippers"
        },
    ]
  },
  {
    id: 5,
    title: "Грузополучатели",
    logo: "/side3.svg",
    nav: 1,
    visible: false,
    link: "",
    submenu: [
        {
            id: 7,
            title: "Добавить грузополучатели",
            visible: false,
            link: "/addconsignees"
        },
        {
            id: 8,
            title: "Список грузополучатели",
            visible: false,
            link: "/consignees"
        },
    ]
  },
  {
    id: 6,
    title: "Отправки",
    logo: "/side4.svg",
    nav: 1,
    visible: false,
    link: "",
    submenu: [
        {
            id: 9,
            title: "Добавить отправки",
            visible: false,
            link: "/adddispatch"
        },
        {
            id: 10,
            title: "Список грузополучателей",
            visible: false,
            link: "/dispatch"
        },
    ]
  },
  {
    id: 7,
    title: "Сообщения",
    logo: "/side5.svg",
    nav: 1,
    visible: false,
    link: "",
    submenu: [
        {
            id: 11,
            title: "SMS-отправка",
            visible: false,
            link: "/message"
        },
    ]
  },
  {
    id: 8,
    title: "Кошелек",
    logo: "/side6.svg",
    nav: 0,
    visible: false,
    link: "/wallet",
    submenu: []
  },
  {
    id: 9,
    title: "Тарифы",
    logo: "/side7.svg",
    nav: 0,
    visible: false,
    link: "/rates",
    submenu: []
  },
  {
    id: 10,
    title: "В пути",
    logo: "/side8.svg",
    nav: 0,
    visible: false,
    link: "/way",
    submenu: []
  },
  {
    id: 11,
    title: "Настройки",
    logo: "/side9.svg",
    nav: 0,
    visible: false,
    link: "/admin",
    submenu: []
  },
];
