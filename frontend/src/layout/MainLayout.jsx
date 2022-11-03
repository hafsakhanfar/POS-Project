import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import styles from "../style/mainLayout.module.css";
function MainLayout({ children }) {
  return (
    <div>
      <div>
        <header className={styles.header}>
          <LogoutIcon style={{ fill: "white" }} />
        </header>
      </div>
      <aside>
        <nav className={styles.nav}>
          <div className={styles.pageLink}>
            <Link to="/products">
              <InventoryIcon style={{ fill: "#AA6EBD" }} />
            </Link>
            <p>Products</p>
          </div>
          <div className={styles.pageLink}>
            <Link to="/POS">
              <ShoppingCartIcon style={{ fill: "#5EC186" }} />
            </Link>
            <p>Sell</p>
          </div>
          <div className={styles.pageLink}>
            <Link to="/">
              <CategoryIcon style={{ fill: "#5FBDD8" }} />
            </Link>
            <p>categories</p>
          </div>
        </nav>
      </aside>

      <div>{children}</div>
    </div>
  );
}

export default MainLayout;
