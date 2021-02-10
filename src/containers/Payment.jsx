import React, { useContext } from "react";
import { PayPalButton } from "react-paypal-button";
import { Link, useHistory } from "react-router-dom";

import AppContext from "../context/AppContext";

import "../styles/components/Payment.css";

export default function Payment() {
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer } = state;

  const history = useHistory();

  const paypalOptions = {
    clientId:
      "AcjhDV-HtC2bBQr4LPi6fZdJS-ttatZ6LMCBmMTwAYz7BrIfq_duaYGrtALV7l8s2aF5tILmPxKtPMhH",
    intent: "capture",
    currency: "USD",
  };

  const buttonStyle = {
    layout: "vertical",
    shape: "rect",
  };

  const handleSumProducts = () => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  };

  const handlePaymentSuccess = (data) => {
    if (data.status === "COMPLETED") {
      const newOrder = {
        buyer,
        products: cart,
        payment: data,
      };

      addNewOrder(newOrder);

      history.push("/checkout/success");
    }
  };

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido:</h3>
        {cart.map((product) => (
          <div className="Payment-item" key={product.id}>
            <div className="Payment-element">
              <h4>{product.title}</h4>
              <span>
                {product.price}
                {"$"}
              </span>
            </div>
          </div>
        ))}
        <Link to="/">
          <div className="Payment-button">
            <PayPalButton
              paypalOptions={paypalOptions}
              buttonStyles={buttonStyle}
              amount={handleSumProducts()}
              onPaymentStart={() => console.log("Payment started...")}
              onPaymentSuccess={(data) => handlePaymentSuccess(data)}
              onPaymentError={(error) => console.log(error)}
              onPaymentCanceled={(data) => console.log(data)}
            />
          </div>
        </Link>
      </div>
      <div />
    </div>
  );
}
