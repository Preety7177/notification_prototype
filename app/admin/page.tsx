// page.tsx

import { createDummyUsers, createNotification, fetchUsers } from './actions';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@prisma/client';

export default async function AdminPage() {
  const users: User[] = await fetchUsers();

  return (
    <div className="p-8">
      <div className="mb-4">
        <form action={createDummyUsers} method="post">
          <Button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Create Dummy Users
          </Button>
        </form>
      </div>
      <form action={createNotification} method="post" className="space-y-4">
          <Label htmlFor="userId" className="block text-sm font-medium text-gray-700">
            User
          </Label>
          <Select name="userId">
            <SelectTrigger>
            <SelectValue placeholder="SelectUser" />
            </SelectTrigger>
            <SelectContent>
            {users.map((user) => (
              <SelectItem value={user.id.toString()}>
                {user.name}
              </SelectItem>
            ))}
            </SelectContent>
          </Select>
          <Label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </Label>
          <Input
            type="text"
            id="message"
            name="message"
            className="mt-1 p-2 block w-full border rounded"
          />
        <Button type="submit" className="p-2 bg-green-500 text-white rounded">
          Create Notification
        </Button>
      </form>
    </div>
  );
}
