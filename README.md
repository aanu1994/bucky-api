### Bucky API
WELCOME TO THE BUCKY API

Your simple RESTFUL API to get scoring for spending habits based on earning.

## Setup
Things you will need to do get this API up and running on your local machine

- Docker-compose
- node npm
- Add `bucky-api` to your localhost mapping in the /etc/hosts file
- Postman Collection - Find within the project - Bucky API.postman_collection.json

@TODO 
MORE DEFINITIONS TO BE ADDED BELOW!!!!

**Definition**
`POST http://bucky-api/clients`

**Request**
```json
{
    "firstname": "John",
    "lastname": "Smith",
    "dob": "29/09/1994",
    "email": "john.smith94@foobarmail.com",
    "address": {
        "address1": "123 Foo Bar Road",
        "address2": "",
        "city": "London",
        "postcode": "SW1P 4QP",
        "country": "United Kingdom"
    }
}
```

**Response**
- `200 OK` On Success
- `500 INTERNAL ERROR` On Internal Error
 
```json
{
    "result": {
        "status": "success",
        "detail": "Client Successfuly Created",
        "clientAccountId": "1"
    }
}
```

**Definitiona**
`GET http://bucky-api/health`

**Response**
- `200 OK` On Success
- `500 INTERNAL ERROR` On Failure of Connection to the DB

