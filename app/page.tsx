// /app/page.tsx

'use server'

import { createDummyUsers, fetchUsers, getUserNotificationCount, fetchNewNotifications } from '../app/admin/actions';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { User, Notification } from '@prisma/client';
import { redirect } from 'next/navigation';

export default async function Page() {
  const users: User[] = await fetchUsers();


  const handleUser = async (formData: FormData) => {
    'use server'
    const userId = formData.get('userId') as string | null;

    // redirect the user to /home/[userId] if a user is selected using Next JS redirect function
    if (userId) {
      redirect(`/home/${userId}`);
    }
  };

  return (
    <div className="p-8">
      <form action={handleUser} method="post">
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
        <Button type="submit" className="p-2 bg-green-500 text-white rounded">
          Fetch Notifications
        </Button>
      </form>
    </div>
  );
}
