import React, { useContext } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import Context from "../context";

function DeleteCat(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { removeCats } = useContext(Context);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const acceptDelete = () => {
    removeCats(props.cat.id);
    handleClose();
    fetch(
      "https://internship.apps.robotbull.com/cats/delete_cat/" + props.cat.id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
  };

  return (
    <div>
      <Button
        variant="outlined"
        className="deletecat"
        onClick={handleClickOpen}
      >
        <CloseIcon />
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" className="dialoghead">
          {"Вы действительно хотите удалить этого милого котика?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Возможно, он будет скучать :(</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={acceptDelete} className="accept">
            Удалить
          </Button>
          <Button onClick={handleClose} autoFocus className="closebtn">
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
DeleteCat.propTypes = {
  cat: PropTypes.object.isRequired,
};
export default DeleteCat;
