import React, { useState, useEffect } from "react";
import { SidebarData } from "./SideBarData";
import MenuIcon from '@mui/icons-material/Menu';
import SubMenu from "./submenu";
import "./Sidebar.css";
export default function Sidebar() {
  const [displayMenu, setDisplayMenu] = useState(localStorage.getItem(""));
  const [displayIcon, setDisplayIcon] = useState(localStorage.getItem(""));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(()=>{
    handleResize()
  },[]);
  const handleResize = () => {
    if (window.innerWidth < 767) {
      setIsMobile(true);
      setDisplayMenu("none");
      setDisplayIcon("");
    } else {
      setIsMobile(false);
      setDisplayMenu("");
      setDisplayIcon("none");
    }
  };
  const changeDisplay = () => {
    if (isMobile && displayMenu == "") {
      setDisplayMenu("none");
    } else {
      setDisplayMenu("");
    }
  };

  return (
    <>
      <MenuIcon
        size={30}
        className="icon_menu"
        style={{ display: displayIcon }}
        onClick={changeDisplay}
      />
      <nav className="SideBarNav" style={{ display: displayMenu }}>
        <div className="SideBarWrap">
          {SidebarData.map((item, index) => {
            return <SubMenu item={item} key={index} />;
          })}
        </div>
      </nav>
    </>
  );
}
