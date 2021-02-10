import React, { useContext } from "react";

import AppContext from "../context/AppContext";

import Map from "../components/Map";

import "../styles/components/Success.css";

export default function Success() {
  const { state } = useContext(AppContext);
  const { buyer } = state;

  return (
    <div className="Success">
      <div className="Success-content">
        <h3>
          {"Gracias por tu compra, "}
          {buyer[0].name}
        </h3>
        <span>Tu pedido llegará en 3 días, a la dirección:</span>
        <div className="Success-map">
          <Map />
        </div>
      </div>
    </div>
  );
}
