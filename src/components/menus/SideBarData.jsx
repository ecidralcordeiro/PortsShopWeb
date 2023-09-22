import React from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import HomeIcon from '@mui/icons-material/Home';
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
        title: "Bloco",
        path: "/bloc",

        cName: "sub-nav",
      },
    ],
  },
];
