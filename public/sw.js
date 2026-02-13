self.addEventListener("push", event => {

  const data = event.data.json();

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon || "https://cdn-icons-png.flaticon.com/512/1827/1827392.png",
    image: data.image,
    badge: data.icon,   // small monochrome icon (Android style)
    data: {
      url: "http://localhost:3000/user.html"
    }
  });

});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
