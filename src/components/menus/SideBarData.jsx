import React from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <HomeIcon/>,
  },
  {
    title: "Cadastro",
    path: "",
    icon: <LibraryBooksIcon />,
    iconClosed: <ArrowDropDownIcon />,
    iconOpened: <ArrowDropUpIcon />,

    subNav: [
      {
        title: "Categorias",
        path: "/Category",

        cName: "sub-nav",
      },
      {
        title: "Marcas",
        path: "/Branch",

        cName: "sub-nav",
      },
      {
        title: "Produtos",
        path: "/Products",

        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Usuario",
    path: "/user",
    icon: <ManageAccountsIcon/>,
  },
  {
    title: "Configurações",
    path: "/dashboard",
    icon: <SettingsIcon/>,
  },
];
