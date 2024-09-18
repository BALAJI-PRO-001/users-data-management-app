# BACKEND
**Below API routes are available for clients to make requests to the backend and access the corresponding services.**

## API Routes
- **Admin Routes**
  - [Admin Login](#admin-login)
  - [Admin Logout](#admin-logout)

- **Record Routes**
  - [Create new record](#create-new-record)
  - [Get all records](#get-all-records)
  - [Get single record](#get-single-record)
  - [Delete all records]()
  - [Delete a record]()
  - [Add new cow to user]()
  - [Delete cow from user]()
  - [Add new injection info and ai dates to cow]()
  - [Delete injection info and ai dates form cow]()
  - [Update record]()


## Admin Login
**Api usage and request response details**
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

## Admin Logout
**Api usage and request response details**
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

## Create New Record
**Api usage and request response details**
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

## Get All Records 
**Api usage and request response details**
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

## Get Single Record
**Api usage and request response details**
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

