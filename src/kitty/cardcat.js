import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useMemo } from "react";
import DeleteCat from "./deletecat.js";
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import Context from "../context";

function CardCat({ cat, handleDrawerToggle, booking }) {
  const { editCat } = useContext(Context);
  // вычисляемое свойство для того, чтобы вебпак видел ДИНАМИЧЕСКИ отрисованные изображения
  let imageCat = useMemo(() => {
    if (!cat.image) {
      return;
    }
    return require("../img/" + cat.image);
  }, [cat.image]);
  function settings(cat) {
    editCat(cat);
    handleDrawerToggle();
  }
  return (
    <article
      className={cat.isBooked ? "borderred wrap-card" : "bordergreen wrap-card"}
    >
      <div className="head-card">
        <div className="head-card-floor">{cat.price} руб/час</div>
        <DeleteCat cat={cat} />
      </div>
      <div className="body-card">
        <div className="body-card-number">
          <div>
            {cat.age}
            {cat.age > 4 ? " лет" : cat.age > 1 ? " года" : " год"}
          </div>
          <SettingsIcon className="settingscat" onClick={() => settings(cat)} />
        </div>
        <div className="body-card-image">
          <img alt="Изображение котика" src={imageCat} />
        </div>
      </div>

      <div className="footer-card">
        <div className="footer-card-price">{cat.nameCat}</div>
        <div className="footer-card-pricesquare">
          {cat.color}&nbsp;
          {cat.breed.nameBreed}
        </div>
        <Button
          className={cat.isBooked ? "booked" : "nobooked"}
          variant="contained"
          onClick={() => booking(cat.id)}
        >
          {cat.isBooked ? "Разбронировать" : "Забронировать"}
        </Button>
      </div>
    </article>
  );
}
CardCat.propTypes = {
  cat: PropTypes.object.isRequired,
  index: PropTypes.number,
  booking: PropTypes.func.isRequired,
};

export default CardCat;
