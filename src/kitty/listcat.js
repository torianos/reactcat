import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import CardCat from "./cardcat.js";

function ListCat(props) {
  return (
    <div className="card-grid">
      {props.catlist.map((cat, index) => {
        return (
          <CardCat
            cat={cat}
            key={index}
            booking={props.booking}
            index={index}
            handleDrawerToggle={props.handleDrawerToggle}
          />
        );
      })}
    </div>
  );
}

ListCat.propTypes = {
  catlist: PropTypes.arrayOf(PropTypes.object).isRequired,
  booking: PropTypes.func.isRequired,
};

export default ListCat;
