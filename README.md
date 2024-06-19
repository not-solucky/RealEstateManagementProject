
# Nest Navigator

This real estate management application streamlines the process of managing properties, offering a user-friendly interface for both property owners and tenants (or potential tenants).


## Features

- Modern responsive design
- Buy properties
- Sell properties
- Rent properties
- Online payment support

## Property Owners and Managers:

- **Property Listings Management:** Add, edit, and delete property listings with detailed descriptions, photos, and virtual tours.
- **Tenant Management:** Track tenant information, rental agreements, and lease renewals.
- **Rent Collection and Online Payments:** Automate rent collection and enable tenants to pay rent online securely.
- **Maintenance Management:** Submit, track, and manage maintenance requests with detailed descriptions, status updates, and vendor assignment.
- **Vacancy Management:** Track vacant properties, manage applications, and streamline the tenant onboarding process.
- **Document Management:** Securely store and manage important documents like leases, invoices, and maintenance records.

## Tenants 

- **Online Tenant Portal:** Securely access property information, rental agreements, and lease details.
- **Online Rent Payment:** Pay rent conveniently and securely online.
- **Maintenance Request Submission:** Submit maintenance requests with photos and descriptions directly through the app.
- **Payment History:** View past rent payments and receipts.

## Admin 

- Can delete property listings.
- Verify user documents for verification and approve.
- Remove users or ban users.
- Reply to queries.

## Tech Stack

**Client:** React, Vite

**Server:** Go


## Run Locally

Clone the project

```bash
  git clone https://github.com/not-solucky/RealEstateManagementProject.git
```

Go to the project directory

```bash
  cd RealEstateManagementProject
```
### Running Frontend
Make sure you have ```node.js``` installed.

You can download ```node.js``` from here - [Nodejs](https://nodejs.org/en/download/prebuilt-installer/current).


From the project directory go to FrontEnd directory.

```bash
  cd FrontEnd
```

Install Vite.

```bash
  npm install vite
```

Install dependencies.

```bash
  npm install
```

Run the frontend.

```bash
  npm run dev
```

## Running the Backend API
Make sure you have Go installed.

You can download ```Go``` from here - [Go](https://go.dev/doc/install).

From the project directory go to Backend directory.

```bash
  cd Backend
```

Install dependencies.

```bash
  go mod tidy
```

Before proceeding to the next part make sure your mysql server is running and complete setting up your database. 

Get the sql file from the following folder.

```bash
.
└── Backend
    └── cmd
        ├── api
        └── migrate
            └── migrations
                └── database.sql
```
Import the ``` database.sql ``` into your database.

Modify the ```.env``` file with your custom variable names.

```
PUBLIC_HOST = localhost
PORT = 8080
DB_USER = {your database username} 
DB_PASSWORD =  {your database password}
DB_HOST = 127.0.0.1
DB_PORT = 3306
DB_NAME = {your database name}
JWT_SECRET = {your secret string}
```

Run the API.

```
go run cmd/main.go
```

If you want to build the API for and executable you can use the following command.

```
go build cmd/main.go
```


