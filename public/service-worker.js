// Service Worker for Push Notifications
self.addEventListener("push", (event) => {
  try {
    const data = event.data
      ? event.data.json()
      : {
          title: "Earthquake Alert",
          body: "New earthquake information available.",
        }

    const options = {
      body: data.body,
      icon: "/notification-icon.png",
      badge: "/notification-badge.png",
      data: {
        url: data.url || "/",
      },
      vibrate: [100, 50, 100],
      actions: data.actions || [],
    }

    event.waitUntil(self.registration.showNotification(data.title, options))
  } catch (error) {
    console.error("Error showing notification:", error)
    // Fallback notification
    event.waitUntil(
      self.registration.showNotification("Earthquake Alert", {
        body: "New earthquake information available.",
        icon: "/notification-icon.png",
      }),
    )
  }
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action) {
    // Handle specific actions
    console.log("Action clicked:", event.action)
  } else {
    // Default action is to open the app
    event.waitUntil(clients.openWindow(event.notification.data?.url || "/"))
  }
})

// Service worker installation
self.addEventListener("install", (event) => {
  self.skipWaiting()
})

// Service worker activation
self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim())
})

console.log("Earthquake Alert Service Worker Loaded")

