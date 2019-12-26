### Bucky API
This API provides insightful data on the spending habits, credit capabilities and more for credit seekers and more

**Definitiona**
`POST service.bucky.api/clients`

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
 
```json
{
    "result": {
        "status": "success",
        "detail": "Client Successfuly Created",
        "clientAccountId": "1"
    }
}
```

