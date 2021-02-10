import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AppContext from "../context/AppContext";

import "../styles/components/Checkout.css";

export default function Checkout() {
  const { state, removeFromCart } = useContext(AppContext);
  const { cart } = state;

  const handleRemoveFromCart = (product) => () => {
    removeFromCart(product);
  };

  const handleSumProducts = () => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  };

  return (
    <div className="Checkout">
      <div className="Checkout-content">
        <h3>
          {cart.length > 0
            ? "Lista de pedidos"
            : "No se han seleccionado productos"}
        </h3>
        {cart.map((product) => (
          <div className="Checkout-item" key={product.id}>
            <div className="Checkout-element">
              <h4>{product.title}</h4>
              <span>
                {product.price}
                {"$"}
              </span>
            </div>
            <i
              className="fas fa-trash-alt"
              onClick={handleRemoveFromCart(product)}
              title="delete"
              role="button"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
      <div className="Checkout-sidebar">
        {cart.length > 0 && (
          <h3>
            {"Precio total: "}
            {handleSumProducts()}
            {"$"}
          </h3>
        )}

        <Link to="/checkout/information">
          <button type="button">Continuar pedido</button>
        </Link>
      </div>
    </div>
  );
}
