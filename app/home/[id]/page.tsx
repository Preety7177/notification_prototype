// /app/page.tsx

import { createDummyUsers, fetchUsers, findUser, getUserNotificationCount, fetchNewNotifications } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { User, Notification } from '@prisma/client';
import { parse } from 'path';
import NotificationBadge from './notification-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';




export default async function NotificationPage({ params }: { params: { id: string } }) {

    const { id } = params;
    let selectedUser: User | null = null;
    const seconds = 30; //number of seconds we will fetch new notifications for the user 

    if (id) {
        selectedUser = await findUser(Number(id));

        if (!selectedUser) {
            return <div>User not found</div>;
        }
    }

    const handleFetchNotifications = async () => {
        'use server'
        if (selectedUser) {
            return await fetchNewNotifications(Number(selectedUser.id), Number(seconds));
        } else {
            return [];
        }
    };

    //Let's display the user's name and a form to fetch notifications

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">{selectedUser?.name} Notifications</h1>
            <NotificationBadge seconds={seconds} fetchNotifications={handleFetchNotifications}/>
            <Card className="w-[350px]">
                <CardHeader> 
                    <CardTitle>Key functionality to add</CardTitle>
                </CardHeader>
                <CardContent>
                    <p> We want to have an icon and a badge on the navigation menu on the top</p>
                    <p> Initially we show how many new messages in the badge</p>
                    <p> when the user clicks on the badge, it will show a menu/card which will show a preview of the new messages</p>
                    <p>and it will reset the new notification count</p>
                </CardContent>
            </Card>
        </div>
    );
}
