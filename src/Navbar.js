import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
const Navbar = (props) => {
  return (
    <div style={styles.nav}>
      <div>
        <Link to="/add/product" style={{ textDecoration: "none" }}>
          <h5 style={{ marginRight: 15, cursor: "pointer", color: "black" }}>
            Add Product
          </h5>
        </Link>
      </div>
      <div style={styles.cartIconContainer}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <ShoppingCartIcon
            style={styles.cartIcon}
            fontSize="large"
          ></ShoppingCartIcon>
        </Link>
        <span style={styles.cartCount}>{props.count}</span>
      </div>
    </div>
  );
};
const styles = {
  cartIcon: {
    height: 32,
    marginRight: 20,
    color: "black",
  },
  nav: {
    height: 70,
    background: "#4267b2",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cartIconContainer: {
    position: "relative",
  },
  cartCount: {
    background: "yellow",
    borderRadius: "50%",
    padding: "4px 8px",
    position: "absolute",
    right: 0,
    top: -9,
  },
};
export default Navbar;
