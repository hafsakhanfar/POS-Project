import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function Cart({ cartItems, setCart }) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    let total = 0;
    for (const item of cartItems) {
      total = total + item.totalPrice;
    }
    total = total - (discount * total);
    total = total + (tax * total);
    setTotalAmount(total);
  }, [cartItems, tax, discount]);
const DeleteFromCart = (id)=>{
    const newCart =cartItems.filter(cartItem => cartItem.id !== id);
    setCart(newCart);
}
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
    <>
      <div className="cartItems">
        {cartItems.map((item, index) => {
          return (
            <div key={index}>
              <span>{item.name}</span> <span>{item.price}</span>
              <button
                onClick={() => {
                  handleIncreaseOuantity(item.id);
                }}
              />
              <span>{item.quantity}</span>
              <button
                onClick={() => {
                  if (item.quantity > 1) handleDecreaseOuantity(item.id);
                }}
              />
              <span>{item.totalPrice}</span>
              <span><DeleteIcon onClick={()=>{DeleteFromCart(item.id)}}/></span>
            </div>
          );
        })}
      </div>
      <div>
        Tax :
        <input
          type="number"
          name="tax"
          onChange={(e) => {
            setTax(e.target.value * 0.01);
          }}
          value={tax * 100}
        />
      </div>
      <div>
        Discoint :
        <input
          type="number"
          name="tax"
          onChange={(e) => {
            setDiscount(e.target.value * 0.01);
          }}
          value={discount * 100}
        />
      </div>

      <div>Total Amount : {totalAmount}</div>
    </>
  );
}

export default Cart;
