import { createDummyUsers, createNotification, fetchUsers } from './actions';
import { Button, Select, Input, Form, FormField, Label } from 'shadcn-ui';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export default async function AdminPage() {
  const users: User[] = await fetchUsers();

  return (
    <div className="p-8">
      <div className="mb-4">
        <Form action={createDummyUsers} method="post">
          <Button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Create Dummy Users
          </Button>
        </Form>
      </div>
      <Form action={createNotification} method="post" className="space-y-4">
        <FormField>
          <Label htmlFor="userId" className="block text-sm font-medium text-gray-700">
            User
          </Label>
          <Select name="userId" id="userId" className="mt-1 p-2 block w-full border rounded">
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField>
          <Label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </Label>
          <Input
            type="text"
            id="message"
            name="message"
            className="mt-1 p-2 block w-full border rounded"
          />
        </FormField>
        <Button type="submit" className="p-2 bg-green-500 text-white rounded">
          Create Notification
        </Button>
      </Form>
    </div>
  );
}
