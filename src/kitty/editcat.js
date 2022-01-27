import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";

// пробовал запихать всё в одну переменную внутри state, однако сложно менять через setState вложенные какие-то данные,
// нужно подменивать всю переменную целиком
// по этой же причине не получилось запустить this.setState через цикл
export default class EditCat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      nameCat: "",
      age: "",
      price: "",
      breed: "",
      color: "",
      breedslist: props.breeds,
      colorlist: [
        { id: 1, title: "Black" },
        { id: 2, title: "Черный" },
      ],
    };
    this.submitHandler = this.submitHandler.bind(this);
  }
  // !!!Почему-то вызывается дважды!!!
  componentDidUpdate(prevProps) {
    if (this.props.infocat !== prevProps.infocat && this.props.infocat !== "") {
      this.setState({ infocat: this.props.infocat });
      this.setState({ id: this.props.infocat.id });
      this.setState({ nameCat: this.props.infocat.nameCat });
      this.setState({ age: this.props.infocat.age });
      this.setState({ price: this.props.infocat.price });
      this.setState({ color: this.props.infocat.color });
      this.setState({
        breed: this.state.breedslist.find((obj) => {
          return obj.breedID == this.props.infocat.breed.breedID;
        }),
      });
    }
    if (this.props.breeds !== prevProps.breeds) {
      this.setState({ breedslist: this.props.breeds });
    }
  }
  submitHandler(event) {
    event.preventDefault();
    let form = {
      id: this.state.id,
      nameCat: this.state.nameCat,
      age: this.state.age,
      price: this.state.price,
      breed: this.state.breed,
      color: this.state.color,
    };
    if (
      this.state.nameCat.trim() &&
      this.state.age.trim() >= 1 &&
      this.state.price.trim() >= 150 &&
      this.state.breed &&
      this.state.color
    ) {
      this.props.addCat(form);
      this.setState({ nameCat: "", color: "", age: "", price: "", breed: "" });
    } else {
      alert("Кажется, что-то заполнено неправильно!");
    }
  }
  render() {
    return (
      <FormControl sx={{ width: "25ch" }} onSubmit={this.submitHandler}>
        <Box
          className="formcat"
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            value={this.state.nameCat}
            onChange={(event) => this.setState({ nameCat: event.target.value })}
            id="outlined-basic"
            label="Имя котика"
            variant="outlined"
          />
          <TextField
            value={this.state.age}
            onChange={(event) => this.setState({ age: event.target.value })}
            id="outlined-basic"
            label="Возраст"
            error={this.state.age < 1 && this.state.age !== ""}
            type="number"
            variant="outlined"
            helperText="Котики только старше года!"
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Порода"
            value={this.state.breed}
            onChange={(event) => this.setState({ breed: event.target.value })}
            helperText="Пожалуйста, укажите породу"
          >
            {this.state.breedslist.map((option) => (
              <MenuItem key={option.breedID} value={option}>
                {option.nameBreed}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="Цвет"
            value={this.state.color}
            onChange={(event) => this.setState({ color: event.target.value })}
            helperText="Пожалуйста, укажите цвет"
          >
            {this.state.colorlist.map((option) => (
              <MenuItem key={option.id} value={option.title}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            value={this.state.price}
            onChange={(event) => this.setState({ price: event.target.value })}
            id="outlined-basic"
            label="Стоимость аренды"
            variant="outlined"
            type="number"
            helperText="Минимальная стоимость 150р/ч"
            error={this.state.price < 150 && this.state.price !== ""}
          />
          {/* <input type="file" accept="image/*" className="addphoto"></input> */}
          <div className="btn-submit">
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Сохранить
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => this.props.toggleCreate("none")}
            >
              Отменить
            </Button>
          </div>
        </Box>
      </FormControl>
    );
  }
}
EditCat.propTypes = {
  addCat: PropTypes.func.isRequired,
  breeds: PropTypes.array.isRequired,
};
