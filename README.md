# BACKEND
## Admin Routes

API Route 1: Handles client requests for admin loggin 
## Usage
``` base
Request
URL: /api/v1/admin/login
METHOD: POST
HEADER: application/json
Data: {
    email: "<your admin email>"
    password: "<your admin password">
}

Response
{
  success: true or false (Request Based)
  statusCode: 200  (Request Based)
  message: "Admin Logged in successfully  (Request Based)
}
```

