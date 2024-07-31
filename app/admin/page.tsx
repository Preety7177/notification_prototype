// page.tsx

import { createDummyUsers, createNotification, fetchUsers } from './actions';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@prisma/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Status } from './submit-button';

export default async function AdminPage() {
  const users: User[] = await fetchUsers();

  return (
    <div className="p-8">
      <div className="mb-4">
        <form action={createDummyUsers} method="post">
          <Button type="submit">
            Create Dummy Users
          </Button>
        </form>
      </div>
      <Card>
        <CardHeader>

        <CardTitle>Create Notification</CardTitle>
        <CardDescription>Create a notification for a selected user. User should be able to see the message within 30 seconds</CardDescription>
 
        </CardHeader>
        <CardContent>
          <form action={createNotification} method="post" className="space-y-4">
            <Label htmlFor="userId" className="block text-sm font-medium text-gray-700">
              User
            </Label>
            <Select name="userId">
              <SelectTrigger>
                <SelectValue placeholder="Select User" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id.toString()} value={user.id.toString()}>
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
            <Status/>
            <Button type="submit">
              Create Notification
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
