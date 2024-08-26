# BACKEND
**Below API routes are available for clients to make requests to the backend and access the corresponding services.**
## Admin Routes

**API Route 1: Handles client requests for admin loggin**
### Usage
``` base
Request
URL: /api/v1/admin/login
METHOD: POST
CONTENT-TYPE: application/json
Data: {
    email: "<your admin email>"
    password: "<your admin password">
}

Response: (Request Based)
{
  success: true 
  statusCode: 200  
  message: "Admin Logged in successfully 
}
```

