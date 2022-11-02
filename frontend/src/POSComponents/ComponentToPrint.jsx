import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { cart, totalAmount, tax, discount } = props;
  return (
    <div ref={ref} className="p-5">
      <table className="table">
        <thead>
          <tr>
            <td>#</td>
            <td>Name</td>
            <td>Price</td>
            <td>Qty</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          {cart.map((cartProduct, key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{cartProduct.name}</td>
              <td>{cartProduct.price}</td>
              <td>{cartProduct.quantity}</td>
              <td>{cartProduct.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-2">discount Amount: ${discount * totalAmount}</p>
      <p className="px-2">Tax Amount: ${discount * totalAmount * tax}</p>
      <h5 className="px-2">Total Amount: ${totalAmount}</h5>
    </div>
  );
});
