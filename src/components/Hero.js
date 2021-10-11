import React from "react";

import logo from "../assets/logo.svg";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src="https://e7.pngegg.com/pngimages/550/487/png-clipart-table-reservation-computer-icons-restaurant-colorful-table-furniture-food-thumbnail.png" alt="React logo" width="120" />
    <h1 className="mb-4">Reserve +</h1>

    <p className="lead">
      Esta es una aplicacion para hacer reservas en tu restaurante de preferencia <a href="https://reactjs.org">Info</a>
    </p>
  </div>
);

export default Hero;
