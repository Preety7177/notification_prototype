// /app/page.tsx

import { createDummyUsers, fetchUsers, getUserNotificationCount, fetchNewNotifications } from '../app/admin/actions';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { User, Notification } from '@prisma/client';

export default async function Page() {
  const users: User[] = await fetchUsers();
  let selectedUser: User | null = null;
  let notificationCount = 0;
  let notifications: Notification[] = [];

  const handleFetchNotifications = async (formData: FormData) => {
    const userId = formData.get('userId') as string | null;
    const seconds = formData.get('seconds') as string | null;

    if (userId && seconds) {
      selectedUser = users.find(user => user.id.toString() === userId) || null;
      if (selectedUser) {
        notificationCount = await getUserNotificationCount(selectedUser.id);
        notifications = await fetchNewNotifications(Number(userId), Number(seconds));
      }
    }
  };

  return (
    <div className="p-8">
      <div className="mb-4">
        <form action={createDummyUsers} method="post">
          <Button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Create Dummy Users
          </Button>
        </form>
      </div>
      <form
        onSubmit={async (event) => {
          "use server"
          event.preventDefault();
          await handleFetchNotifications(new FormData(event.currentTarget));
        }}
        className="space-y-4"
      >
        <Label htmlFor="userId" className="block text-sm font-medium text-gray-700">
          User
        </Label>
        <Select name="userId">
          <SelectTrigger>
            <SelectValue placeholder="Select User" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id.toString()}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedUser && (
          <Badge className="mt-2">
            {`Total Messages: ${notificationCount}`}
          </Badge>
        )}
        <Label htmlFor="seconds" className="block text-sm font-medium text-gray-700">
          Check for notifications in the past (seconds)
        </Label>
        <Input
          type="number"
          id="seconds"
          name="seconds"
          className="mt-1 p-2 block w-full border rounded"
        />
        <Button type="submit" className="p-2 bg-green-500 text-white rounded">
          Fetch Notifications
        </Button>
      </form>
      {notifications.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">New Notifications</h2>
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id}>{notification.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
