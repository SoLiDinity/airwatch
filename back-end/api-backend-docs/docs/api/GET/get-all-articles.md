---
id: get-all-articles
title: Get All Articles
sidebar_position: 2
---

# Get All Articles

Endpoint ini berguna untuk mengambil seluruh data artikel dalam database.

## Endpoint

- Method: `GET`
- URL: `/articles`

## Response

### Success

Status Code: `200 (OK)`

```json
{
  "status": "success",
  "data": {
    "articles": [
      {
        "id": "Ab1C23De4F5O6p_",
        "title": "Article Title",
        "overview": "Article Overview"
      },
      // ... other articles
    ]
  }
}
```