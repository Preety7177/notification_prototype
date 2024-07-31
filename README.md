### Getting Started 

## Objectives:

# Demonstrate New Notification System:

Purpose: The primary goal is to showcase how our new notification system will function. This prototype will illustrate the user experience for both admins and users, highlighting the ease of sending and receiving notifications.
Benefits: This will allow stakeholders to visualize the improvements and provide feedback, ensuring the final product meets user needs.

# Technical Feature Testing:

Purpose: We aim to test several new technologies to ensure compatibility and performance within our tech stack. These technologies include:
React 19
ShadCN
Tailwind CSS
Server Components
Benefits: Testing these technologies will help us identify potential issues early and confirm that they provide the expected enhancements in our development process and user interface.

# Simplify Technical Solution:

Purpose: Our objective is to develop a simpler and more efficient notification system. The prototype will focus on reducing the complexity of the current system, making it easier to maintain and extend.
Benefits: A simplified system will lower maintenance costs, improve performance, and provide a more user-friendly experience.

## Usage 

1. You first need the .env file primarily the DATABASE_URL 
2. npm install 
3. npx prisma generate  # This will create the prisma client 
4. npm run dev 


There's 2 pages 
Admin Page 

# User Page 

On the main home page / user can select a user to check notifications from the drop-down which comes from the database. 

This will redirect to /home/[id]/page.tsx which will show notificaitons for the selected user. If the user does not exist, then it will show User Not FOund, otherwise, it will start with 0 notifications, and then it will incrementally show new messages. It is also expected to be clickable and see a preview of messages. 

# Admin Page 
available from /admin 

On this page, if there's no users, you can click on button generate users. This will create 3 users. 

Refresh. 

Then, the user can send create a new notification 


