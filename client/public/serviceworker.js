const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests
self.addEventListener("fetch", (event) => {
  console.log("fetch sw");
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

// Activate the SW
self.addEventListener("activate", (event) => {
  console.log("activate sw");
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

self.addEventListener("notificationclick", (event) => {
  var notification = event.notification;
  var action = event.action;

  console.log(notification);

  if (action === "cancel") {
    console.log("Confirm was chosen");
    notification.close();
  } else {
    console.log(action);
    event.waitUntil(
      self.clients.matchAll().then((clis) => {
        var client = clis.find(function (c) {
          return c.visibilityState === "visible";
        });
        if (client !== undefined) {
          client.navigate("https://stipica10.tk");
          client.focus();
        } else {
          self.clients.openWindow("https://stipica10.tk");
        }
        notification.close();
      })
    );
  }
});

self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log("New notification", data);
  const options = {
    body: data.body,
    icon: "/images/thermometer64.png",
    badge: "/images/thermometer64.png",
    actions: [{ action: "cancel", title: "Zatvori" }],
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});
