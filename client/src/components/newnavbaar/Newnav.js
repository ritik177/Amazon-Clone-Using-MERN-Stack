import React from "react";
import "./newnav.css";

const Newnav = () => {
  return (
    <div className="new_nav">
      <div className="nav_data">
        <div className="left_data">
          <p><i className="fas fa-shopping-cart"></i> All</p>
          <p>Mobile</p>
          <p>Best seller</p>
          <p>Fashio</p>
          <p>Customer Services</p>
          <p>Electronics</p>
          <p>Primes</p>
          <p>Today's deal</p>
          <p>Amazon Pay</p>
        </div>

        <div className="right_data">
           <img src="./nav.jpg" alt="navdata"/>
        </div>
      </div>
    </div>
  );
};

export default Newnav;
