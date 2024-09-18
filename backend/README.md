# BACKEND
**Below API routes are available for clients to make requests to the backend and access the corresponding services.**

## Routes
- **Admin Routes**
  - [Admin Login]()
  - [Admin Logout]()

- **Record Routes**
  - [Create new record]()
  - [Get all records]()
  - [Get single record]()
  - [Delete a record]()
  - [Add new cow to user]()
  - [Delete cow from user]()
  - [Add new injection info and ai dates to cow]()
  - [Delete injection info and ai dates form cow]()
  - [Update record]()


## Admin Routes

**Route for Handles client requests for admin loggin**
### Usage
``` base
Request Information
===================
URL: /api/v1/admin/login
METHOD: POST
CONTENT-TYPE: application/json
BODY: {
    email: <string>
    password: <string>
}


Response (Request Based)
=========================
{
  success: true 
  statusCode: 200  
  message: "Admin Logged in successfully 
}
```

**Router for Handles client requests for admin logout**
### Usage
``` base
Request Information
===================
URL: /api/v1/admin/log-out
METHOD: GET

Response (Request Based)
=========================
{
  success: true 
  statusCode: 200  
  message: "Admin has been logged out successfully 
}
```

## Records Routes
**Route for Create new record**
### Usage
``` base
Request Information
===================
URL: /api/v1/records
METHOD: POST
COOKIE: Admin cookie must 
CONTENT-TYPE: application/json
BODY: {
  user: {
      name: <string>
      phoneNumber: <number>,
      address: <string>
  },
  cows: [
    {
        cowName: <string>,
        cowBreed: <string>,
        bullName: <string>,
        injectionInfoAndAiDates: [
            {
              name: <string>,
              cost: <number>,
              date: <string>
            }, 
            {}, {}, {} ......
        ]
    }, 
    {}, {}, {}, .......
  ]
}

Response (Request Based)
=========================
{
  success: true,
  statusCode: 201,
  message: "New record created successfully"
}
```

**Route for Get All Records**
### Usage
``` base
Request Information
===================
URL: /api/v1/records/all
METHOD: GET
COOKIE: Admin cookie must 


Response (Request Based)
=========================
{
  success: true,
  statusCode: 200,
  data: {
    records: [
      {
        user: {
              id: <userId>,
              name: <name>,
              phoneNumber: <phoneNumber>,
              address: <address>,
              isCurrentUser: <state>,
              createdAt: <dateAndTimeInDb>
          },
        cows: [
            {
              id: <cowId>,
              cowName: <cowName>,
              cowBreed: <cowBreed>,
              bullName: <bullName>,
              injectionInfoAndAiDates: [
                {
                  name: <injectionName>,
                  cost: <injectionCost>,
                  date: <aiDate>
                },
                {}, {}, {}, ...... injectionInfoAndAiDates
                            
              ],
              createdAt: <dateAndTimeInDb>
            },
            {}, {}, {}, ..... cows
        ],

        "recordCreatedAt": "2024-09-17 08:56:07"
      },
      {}, {}, {} .... records
    ]
  }
}
```

**Route For fetch single record**
### Usage
``` base
Request Information
===================
URL: /api/v1/records/<userId>
METHOD: GET
COOKIE: Admin cookie must 

Response (Request Based)
=========================
{
  success: true,
  statusCode: 200,
  data: {
    records: {
        user: {
              id: <userId>,
              name: <name>,
              phoneNumber: <phoneNumber>,
              address: <address>,
              isCurrentUser: <state>,
              createdAt: <dateAndTimeInDb>
          },
        cows: [
            {
              id: <cowId>,
              cowName: <cowName>,
              cowBreed: <cowBreed>,
              bullName: <bullName>,
              injectionInfoAndAiDates: [
                {
                  name: <injectionName>,
                  cost: <injectionCost>,
                  date: <aiDate>
                },
                {}, {}, {}, ...... injectionInfoAndAiDates
                            
              ],
              createdAt: <dateAndTimeInDb>
            },
            {}, {}, {}, ..... cows
        ],

        "recordCreatedAt": "2024-09-17 08:56:07"
    }
  }
}
```

