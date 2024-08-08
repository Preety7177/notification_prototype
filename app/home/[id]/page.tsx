// /app/page.tsx
'use server'

/***
 * This will a server component and will not have any react hooks. 
 * This will require a valid user id to fetch the user's notifications
 * This function will also host the hook which will be called by the client component which will mount the badge on the top navigation bar
 * 
 **/

import { findUser, fetchNewNotifications } from '@/app/admin/actions';
import { User } from '@prisma/client';
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

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">{selectedUser?.name} Notifications</h1>
            <div style={{alignItems: 'end'}}>
                <NotificationBadge seconds={seconds} fetchNotifications={handleFetchNotifications} />
            </div>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Key functionality to add</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-gray-100 p-4 rounded-md">
                        <p>We want to have an icon and a badge on the navigation menu on the top.</p>
                        <p>Initially, we show how many new messages in the badge.</p>
                        <p>When the user clicks on the badge, it will show a menu/card which will show a preview of the new messages.</p>
                        <p>And it will reset the new notification count.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
