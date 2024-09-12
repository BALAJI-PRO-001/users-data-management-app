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
DATA: {
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

**API Route 2: Download users records from server**
### Usage
``` base
Request
URL: /api/v1/admin/users-records/download
METHOD: GET
COOKIE: Admin cookie must 

Response: (Request Based)
File: usersRecords.json
```

**API Routes For CRUD: CRUD operation**
### Usage
``` base
Request: Create new user
URL: /api/v1/admin/users
METHOD: POST
COOKIE: Admin cookie must 
CONTENT-TYPE: application/json
DATA: {
  name: <string>,
  phoneNumber: <number>,     => (max: 10 digit)
  address: <string>,         => (max: 255 char)
  cowName: <string>,         => (max: 100 char)
  cowBreed: <string>,        => (max: 100 char)
  bullName: <string>         => (max: 100 char)
  aiDate: <string>,          => (max: 50 char)
  injectionCost: <number> 
}

Response: (Request Based)
{
  success: true,
  statusCode: 201,
  message: "New user created"
}
```

### Usage
``` base
Request: Get all users records
URL: /api/v1/admin/users/all
METHOD: GET
COOKIE: Admin cookie must 

Response: (Request Based)
[
  {}, {}, {}, {}
]
```

### Usage
``` base
Request: Get single user records
URL: /api/v1/admin/users/<userID>
METHOD: GET
COOKIE: Admin cookie must 

Response: (Request Based)
{
  // user records based by id
  ....
}
```

### Usage
``` base
Request: Update single user records
URL: /api/v1/admin/users/<userID>
METHOD: PATCH
COOKIE: Admin cookie must 
CONTENT-TYPE: application/json
DATA: {
  <key>: <value>
  ....
}

Response: (Request Based)
{
  // updated user records
  ....
}
```

### Usage
``` base
Request: Delete single user records
URL: /api/v1/admin/users/<userID>
METHOD: DELETE
COOKIE: Admin cookie must 
CONTENT-TYPE: application/json

Response: (Request Based)
status: 204 body: empty
```