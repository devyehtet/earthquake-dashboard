"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: "critical" | "update" | "alert" | "info"
}

export function NotificationSystem() {
  const { language } = useLanguage()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Load notifications from localStorage on component mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem("notifications")
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    } else {
      // Sample notifications for demo
      const demoNotifications: Notification[] = [
        {
          id: "1",
          title: "New Critical Report",
          message: "Building collapse reported in Sagaing region",
          time: "10 minutes ago",
          read: false,
          type: "critical",
        },
        {
          id: "2",
          title: "Aid Distribution Update",
          message: "5 new aid centers established in affected areas",
          time: "1 hour ago",
          read: false,
          type: "update",
        },
        {
          id: "3",
          title: "System Alert",
          message: "Daily report summary is now available",
          time: "3 hours ago",
          read: false,
          type: "alert",
        },
      ]
      setNotifications(demoNotifications)
      localStorage.setItem("notifications", JSON.stringify(demoNotifications))
    }
  }, [])

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem("notifications", JSON.stringify(notifications))
    }
  }, [notifications])

  // Add click outside listener to close the notification panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isOpen && !target.closest("[data-notification-panel]")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const handleNotificationClick = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const toggleNotifications = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className="relative p-2 text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="Notifications"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50"
          data-notification-panel
        >
          <div className="py-2 px-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {language === "my" ? "အကြောင်းကြားချက်များ" : "Notifications"}
            </h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-4 px-4 text-center text-gray-500">
                {language === "my" ? "အကြောင်းကြားချက်များ မရှိပါ" : "No notifications"}
              </div>
            ) : (
              <div>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
                      notification.read
                        ? "bg-white hover:bg-gray-50"
                        : notification.type === "critical"
                          ? "bg-red-50 hover:bg-red-100"
                          : notification.type === "update"
                            ? "bg-blue-50 hover:bg-blue-100"
                            : notification.type === "alert"
                              ? "bg-yellow-50 hover:bg-yellow-100"
                              : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        handleNotificationClick(notification.id)
                      }}
                      className="block"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-semibold text-gray-900">{notification.title}</h4>
                        {!notification.read && <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>}
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                      <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="py-2 px-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            <Button variant="ghost" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
              {language === "my" ? "အားလုံးကို ဖတ်ပြီးအဖြစ် မှတ်ပါ" : "Mark all as read"}
            </Button>
            <Button variant="link" size="sm" onClick={() => setIsOpen(false)}>
              {language === "my" ? "အကြောင်းကြားချက်အားလုံးကို ကြည့်ရှုပါ" : "View all notifications"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

