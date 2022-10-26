import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
function MainLayout({ children }) {
  return (
    <div>
      <div>
        <header className="header">
          <LogoutIcon style={{ fill: "white" }} />
        </header>
      </div>
      <aside>
        <nav className="pagesLink">
          <Link to="/">
            <InventoryIcon style={{ fill: "white" }} />
          </Link>
          <Link to="/pos">
            <ShoppingCartIcon />
          </Link>
          <Link to="/catacgories">
            <CategoryIcon />
          </Link>
        </nav>
      </aside>

      <div>{children}</div>
    </div>
  );
}

export default MainLayout;
