'use client'
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Notification } from '@prisma/client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface NotificationBadgeProps {
  fetchNotifications: () => Promise<Notification[]>;
  seconds: number;
}

export default function NotificationBadge({ fetchNotifications, seconds }: NotificationBadgeProps) {
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchAndSetNotifications = async () => {
      try {
        const newNotifications = await fetchNotifications();
        // Increment the notification count by the number of new notifications
        setNotifications(prevNotifications => {
          // Ensure no duplicate notifications
          const newNotificationIds = newNotifications.map(n => n.id);
          const filteredPrevNotifications = prevNotifications.filter(
            n => !newNotificationIds.includes(n.id)
          );
          return [...filteredPrevNotifications, ...newNotifications];
        });
        setNotificationCount(prevCount => prevCount + newNotifications.length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    // Initial fetch
    fetchAndSetNotifications();

    // Set up the interval to fetch notifications every `seconds` seconds
    const interval = setInterval(fetchAndSetNotifications, seconds * 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [fetchNotifications, seconds]);

  const handleBadgeClick = () => {
    // Reset notification count when the dropdown is opened
    setNotificationCount(0);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="mt-2 rounded-full flex items-center justify-center w-8 h-8 cursor-pointer">
          {notificationCount}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <DropdownMenuItem key={notification.id} className="flex flex-col items-start">
              <span>{notification.message}</span>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
              </span>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem className="flex flex-col items-start">
            <span>No new notifications</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
