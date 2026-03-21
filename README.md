# Invoice Generator

This project is a full-stack web application that allows users to create, preview, and manage invoices in a simple and efficient way. The goal of this project is to replace manual invoice creation with a structured and easy-to-use system.

---

## Overview

The application lets users enter invoice details such as company information, billing details, and item lists. Once the data is entered, users can preview the invoice and save it. All saved invoices are stored in a database and can be viewed later through a dashboard.

---

## Features

* Create invoices with detailed information
* Preview invoices before saving
* Store invoices in a database
* View all saved invoices in a dashboard
* Edit and delete invoices
* Download invoices

---

## Technologies Used

**Frontend**

* React (Vite)
* CSS
* Axios

**Backend**

* Spring Boot
* REST APIs
* Maven

**Database**

* MySQL (Aiven Cloud)

---

## System Design

The frontend communicates with the backend using REST APIs. The backend follows a layered architecture:

* Controller: Handles incoming requests
* Service: Contains business logic
* Repository: Manages database operations

All invoice data is stored in a MySQL database hosted on Aiven.

---

## How It Works

1. The user enters invoice details through the frontend form
2. The data is processed and formatted on the frontend
3. A POST request is sent to the backend
4. The backend processes the request and stores the data in the database
5. The saved invoice is available in the dashboard

---

## Project Structure

**Backend**

* `controller` – API endpoints
* `service` – business logic
* `repository` – database interaction
* `entity` – data model

**Frontend**

* `pages` – main screens (Dashboard, Preview, etc.)
* `components` – reusable UI parts
* `service` – API calls
* `util` – helper functions

---

## Setup Instructions

### Backend

```bash
cd backend
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```


## Environment Variables

Frontend requires:

```
VITE_API_URL=your_backend_url
```
---
## Future Improvements

* Add user authentication and account-based invoice management
* Implement real email delivery instead of simulated email functionality
* Add search, filtering, and sorting in dashboard and enhance UI/UX 
---

Note:
This project was developed as part of an academic submission and focuses on demonstrating full-stack development, API integration, and database design.

