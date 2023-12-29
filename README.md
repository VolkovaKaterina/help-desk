This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Help Desk Application README

---

## Overview
This application is a help desk system built with Next.js, Prisma, MongoDB, and integrated with OpenAI for automated admin responses. It is designed to handle ticket requests from end users and allow support staff to manage these tickets.

---
### Key Features
#### User
- **Ticket Submission (User Page)**: End users can submit ticket requests, providing their name, email, and a description of the issue they are facing.
- **Ticket Tracking:** After submission, users are redirected to a page where they can view the status and responses to their ticket, interact with automated responses provided by OpenAI, and submit further responses or request direct consultations.
#### Admin Panel: 
- **Support staff** can view summaries of each ticket, including their statuses, and can drill down into individual tickets to respond and update their status. Possible statuses include “new”, “in progress”, and “resolved”.
- **Automated Responses**: The system utilizes OpenAI to generate automated responses for the admin panel, aiding in quick and efficient ticket resolution.
- **Direct Contact Indicator**: Identifies tickets where users have requested direct communication with a consultant.

---
### Preferred authentication stack: 
#### NextAuth
- ***Integration***: Tailored for Next.js applications.
- ***Multiple Providers***: Supports various authentication providers for flexibility.
- ***JWT Tokens***: Ensures secure and scalable user sessions.
- ***Use Cases***: Ideal for rapid development and when integrating third-party identity providers is beneficial.

---
## Development and Setup
### Prerequisites
- Node.js version >= v18.17.0 is required.
- MongoDB database.
- OpenAI API key.

### Configuration
- Create a .env file in the project root with:
```
DATABASE_URL: Your MongoDB connection string.
OPENAI_API_KEY: Your OpenAI API ke
```
### Running the Application
```bash
npm install
```
```bash
npx prisma generate 
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---
## Building for Production
```bash
npm run build
```
```bash
npm run start
```
---
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
