# Account Microservice
## Project Overview
The Account Microservice is an Express.js-based service focused on managing user accounts, including authentication, user role assignment, and retrieval of user details. This service supports Google-based login and registration and integrates with a Notification Microservice to send notifications for new authentications. Comprehensive API documentation is provided using Swagger.
## Features

- Google Authentication: Users can log in or register using their Google credentials.
- Role Management: Each user is assigned a role, either "Client" or "Admin."
- Notification Integration: Sends a new authentication notification via the Notification Microservice.
- Client and Admin Retrieval: Supports endpoints to retrieve all clients or the admin user.

## Installation

Install Micro-service Notification Server

```bash
    git clone https://github.com/belzir-studyCase/ms-account.git
    cd ms-account
```
Install dependencies:

```bash
    npm install
```

Run Server

```bash
    npm run dev
```


