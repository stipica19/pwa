import React, { useState, useEffect } from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import { subscribeUser } from "../subscription";
import { unsubscribe } from "../unsubcribe";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => {
  return {
    active: {
      margin: "10px",
      padding: "5px",
      color: "white",
      minWidth: 40,
      minHeight: 40,
      backgroundColor: "#757575",
      borderRadius: "50%",
    },
    officon: {
      margin: "10px",
      padding: "5px",
      color: "white",
      minWidth: 40,
      minHeight: 40,
      backgroundColor: "#757575",
      borderRadius: "50%",
    },
  };
});

const NotificationComponent = () => {
  const classes = useStyles();
  const [notification, setNotification] = useState(false);
  useEffect(() => {
    setNotification(JSON.parse(localStorage.getItem("notification")));
    console.log(notification);
  }, []);
  return (
    <div>
      {notification ? (
        <NotificationsActiveIcon
          className={classes.active}
          onClick={() => {
            setNotification(!notification);
            localStorage.setItem("notification", false);
            unsubscribe();
          }}
        />
      ) : (
        <NotificationsOffIcon
          className={classes.officon}
          onClick={() => {
            Notification.requestPermission((result) => {
              console.log("User Choicee", result);
              if (result !== "granted") {
                setNotification(!notification);
                console.log("No notification permission granted!");
              } else {
                subscribeUser();
                setNotification(!notification);
                localStorage.setItem("notification", true);
              }
            });
          }}
        />
      )}
    </div>
  );
};

export default NotificationComponent;
