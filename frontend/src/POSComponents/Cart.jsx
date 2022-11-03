import { useState, useEffect, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../style/cart.module.css";
import RemoveTwoToneIcon from "@mui/icons-material/RemoveTwoTone";
import AddIcon from "@mui/icons-material/Add";
import input from "../assetsStayles/input.module.css";
import { ComponentToPrint } from "./ComponentToPrint";
import { useReactToPrint } from "react-to-print";
import button from "../assetsStayles/addButton.module.css";

function Cart({ cartItems, setCart }) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  };

  useEffect(() => {
    let total = 0;
    for (const item of cartItems) {
      total = total + +item.totalPrice;
    }
    total = total - discount * total;
    total = total + tax * total;
    setTotalAmount(total);
  }, [cartItems, tax, discount]);
  const DeleteFromCart = (id) => {
    const newCart = cartItems.filter((cartItem) => cartItem.id !== id);
    setCart(newCart);
  };
  const handleIncreaseOuantity = (id) => {
    let newCart = [];
    let newItem;

    cartItems.forEach((cartItem) => {
      if (cartItem.id === id) {
        newItem = {
          ...cartItem,
          quantity: cartItem.quantity + 1,
          totalPrice: cartItem.price * (cartItem.quantity + 1),
        };
        newCart.push(newItem);
      } else {
        newCart.push(cartItem);
      }
      setCart(newCart);
    });
  };

  const handleDecreaseOuantity = (id) => {
    let newCart = [];
    let newItem;

    cartItems.forEach((cartItem) => {
      if (cartItem.id === id) {
        newItem = {
          ...cartItem,
          quantity: cartItem.quantity - 1,
          totalPrice: cartItem.price * (cartItem.quantity - 1),
        };
        newCart.push(newItem);
      } else {
        newCart.push(cartItem);
      }
      setCart(newCart);
    });
  };

  return (
    <div className={styles.container}>
      <div style={{ color: "#678E98", cursor: "pointer", marginLeft: "auto" }}>
        <a
          onClick={() => {
            setCart([]);
          }}
        >
          <DeleteIcon />
          Discard Sale
        </a>
      </div>
      <div className={styles.cartProduct}>
        <div>name</div>
        <div>price</div> <div>Quntity</div>
        <div>Total Price</div>
      </div>
      <div style={{ display: "none" }}>
        <ComponentToPrint
          cart={cartItems}
          totalAmount={totalAmount}
          ref={componentRef}
          tax={tax}
          discount={discount}
        />
      </div>
      <div className={styles.productsList}>
        {cartItems.map((item, index) => {
          return (
            <div key={index} className={styles.cartProduct}>
              <div style={{ maxWidth: 30 }}>{item.name}</div>
              {item.price}
              <AddIcon
                style={{ fill: "#41af4b", cursor: "pointer", marginRight: -35 }}
                onClick={() => {
                  handleIncreaseOuantity(item.id);
                }}
              />
              <div>{item.quantity}</div>
              <RemoveTwoToneIcon
                style={{ fill: "#41af4b", cursor: "pointer", marginLeft: -35 }}
                onClick={() => {
                  if (item.quantity > 1) handleDecreaseOuantity(item.id);
                }}
              />
              <div>{item.totalPrice}</div>
              <div>
                <DeleteIcon
                  style={{
                    fill: "#41af4b",
                    cursor: "pointer",
                    paddingLeft: -35,
                  }}
                  onClick={() => {
                    DeleteFromCart(item.id);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div>
        Tax :
        <input
          className={input.input}
          type="number"
          name="tax"
          onChange={(e) => {
            setTax(e.target.value * 0.01);
          }}
          value={tax * 100}
        />
      </div>
      <div>
        Discount :
        <input
          className={input.input}
          type="number"
          name="tax"
          onChange={(e) => {
            setDiscount(e.target.value * 0.01);
          }}
          value={discount * 100}
        />
      </div>
      Total Amount :
      <div
        className={input.input}
        style={{
          color: "#41af4b",
        }}
      >
        {totalAmount}
      </div>
      {totalAmount !== 0 ? (
        <div>
          <button
            className={button.addButton}
            style={{ width: 350 }}
            onClick={handlePrint}
          >
            Pay Now
          </button>
        </div>
      ) : (
        "Please add a product to the cart"
      )}
    </div>
  );
}

export default Cart;
