const unsubscribeSend = async (unsub) => {
  return await fetch(`https://stipica10.tk/api/unsubscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      unsub,
      temperatura: localStorage.getItem("temperatura"),
    }),
  });
};

export const unsubscribe = () => {
  console.log("unsubscribe");
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
      serviceWorkerRegistration.pushManager
        .getSubscription()
        .then((subscription) => {
          if (!subscription) {
            console.log("Not subscribed, nothing to do.");
            return;
          }
          subscription
            .unsubscribe()
            .then(function () {
              unsubscribeSend(localStorage.getItem("subs"));
              localStorage.removeItem("subs");
              console.log("Successfully unsubscribed!.");
            })
            .catch((e) => {
              console.log(
                "Error thrown while unsubscribing from push messaging",
                e
              );
            });
        });
    });
  }
};
