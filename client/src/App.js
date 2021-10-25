import React, { useState, useEffect } from "react";
import "./App.css";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import Chart from "./components/Chart";
import { subscribeUser } from "./subscription";
import { unsubscribe } from "./unsubcribe";
import { makeStyles } from "@material-ui/core";
import NotificationComponent from "./components/NotificationComponent";
const useStyles = makeStyles((theme) => {
  return {
    active: {
      padding: "5px",
      color: "white",
      minWidth: 40,
      minHeight: 40,
      backgroundColor: "#757575",
      borderRadius: "50%",
    },
    officon: {
      padding: "5px",
      color: "white",
      minWidth: 40,
      minHeight: 40,
      backgroundColor: "#757575",
      borderRadius: "50%",
    },
  };
});

const App = () => {
  const classes = useStyles();
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    setNotification(JSON.parse(localStorage.getItem("notification")));
    console.log(notification);
  }, []);

  const onChange = (event) => {
    localStorage.setItem("temperatura", event.target.value);
  };
  const handleChange = () => {
    fetch(`https://stipica10.tk/api/broadcast`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const handleChangeTemp = () => {
    fetch(`https://stipica10.tk/api/addTemp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subs: localStorage.getItem("subs"),
        temp: localStorage.getItem("temperatura"),
      }),
    });
  };

  const tempChange = () => {
    fetch(`https://stipica10.tk/api/tablica`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <div>
      <NotificationComponent />

      <div className="inputTemp">
        <input
          type="text"
          onChange={onChange}
          placeholder="Unesite vrijednost temperature"
        />
        <button className="buttonTemp" onClick={handleChangeTemp}>
          Spremi temperaturu{" "}
        </button>
      </div>

      {/*<button className="button" onClick={handleChange}>
        Prikazi obavijest{" "}
      </button>*/}

      <Chart />
    </div>
  );
};

export default App;
