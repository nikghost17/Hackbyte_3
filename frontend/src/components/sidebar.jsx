import React, { useState } from "react";
import { Home, Grid, Folder, List, Calendar, ChevronDown, ChevronRight } from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState({});

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <div className={sidebar ${isOpen ? "open" : "collapsed"}}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "⏪" : "⏩"}
      </button>
      <ul className="menu-list">
        <li><Home /> {isOpen && "Home"}</li>
        <li><Grid /> {isOpen && "Dashboard"}</li>
        
        <li className="menu-item" onClick={() => toggleMenu("create")}> 
          <Folder /> {isOpen && "Create"} {isOpen && (openMenus.create ? <ChevronDown /> : <ChevronRight />)}
        </li>
        {openMenus.create && isOpen && (
          <ul className="submenu">
            <li>Folder</li>
            <li>Document</li>
            <li>Project</li>
          </ul>
        )}

        <li className="menu-item" onClick={() => toggleMenu("tasks")}> 
          <List /> {isOpen && "Todo Lists"} {isOpen && (openMenus.tasks ? <ChevronDown /> : <ChevronRight />)}
        </li>
        {openMenus.tasks && isOpen && (
          <ul className="submenu">
            <li>Personal</li>
            <li>Work</li>
          </ul>
        )}

        <li><Calendar /> {isOpen && "Calendar"}</li>
      </ul>
    </div>
  );
};

export default Sidebar;