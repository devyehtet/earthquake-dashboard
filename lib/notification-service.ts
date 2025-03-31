// Notification service for handling push notifications

// Check if service workers and push messaging are supported
export function isPushSupported(): boolean {
  return typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window
}

// Check if we're in the preview environment
export function isPreviewEnvironment(): boolean {
  return (
    typeof window !== "undefined" &&
    (window.location.hostname.includes("lite.vusercontent.net") || window.location.hostname.includes("localhost"))
  )
}

// Function to convert base64 to Uint8Array for VAPID key
export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

// This would be your VAPID public key from your server
export const VAPID_PUBLIC_KEY =
  "BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U"

// Function to show a notification (for demo purposes)
export function showDemoNotification(title: string, options: NotificationOptions = {}) {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications")
    return
  }

  if (Notification.permission === "granted") {
    new Notification(title, {
      body: options.body || "This is a demo notification",
      icon: options.icon || "/notification-icon.png",
      ...options,
    })
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        showDemoNotification(title, options)
      }
    })
  }
}

// Mock subscription for preview environment
export interface MockSubscription {
  endpoint: string
  keys: {
    p256dh: string
    auth: string
  }
}

// Create a mock subscription for preview mode
export function createMockSubscription(): MockSubscription {
  return {
    endpoint: "https://mock-push-service.example.com/subscription/" + Math.random().toString(36).substring(2, 15),
    keys: {
      p256dh: "mock-p256dh-key-" + Math.random().toString(36).substring(2, 15),
      auth: "mock-auth-key-" + Math.random().toString(36).substring(2, 15),
    },
  }
}

export async function subscribeToNotifications() {
  if (!isPushSupported()) {
    console.warn("Push notifications are not supported in this browser.")
    return
  }

  if (Notification.permission === "denied") {
    console.warn("Notifications are blocked.")
    return
  }

  if (isPreviewEnvironment()) {
    const mockSubscription = createMockSubscription()
    console.log("Mock subscription created:", mockSubscription)
    showDemoNotification("Subscribed! (Preview Mode)")
    return
  }

  try {
    const registration = await navigator.serviceWorker.register("/service-worker.js")
    const existingSubscription = await registration.pushManager.getSubscription()

    if (existingSubscription) {
      console.log("Already subscribed:", existingSubscription)
      return
    }

    const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey,
    })

    console.log("Subscribed:", subscription)
    showDemoNotification("Subscribed!")

    // TODO: Send subscription to server
  } catch (error) {
    console.error("Failed to subscribe:", error)
  }
}

export async function unsubscribeFromNotifications() {
  if (!isPushSupported()) {
    console.warn("Push notifications are not supported in this browser.")
    return
  }

  try {
    const registration = await navigator.serviceWorker.register("/service-worker.js")
    const subscription = await registration.pushManager.getSubscription()

    if (subscription) {
      await subscription.unsubscribe()
      console.log("Unsubscribed:", subscription)
      showDemoNotification("Unsubscribed!")
      // TODO: Remove subscription from server
    } else {
      console.log("Not subscribed.")
    }
  } catch (error) {
    console.error("Failed to unsubscribe:", error)
  }
}

