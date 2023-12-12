---
id: add-article
title: Add Article
---

# Add Article

Endpoint ini berguna untuk menambahkan artikel ke database. 

## Endpoint

- Method: `POST`
- URL: `/articles`

## Request

### Body

```json
{
  "title": "string",
  "image_url": "string",
  "overview": "string",
  "content": {
    "sections": [
      {
        "title": "string",
        "image_url": "string",
        "paragraph": "string",
        "list": ["string", "string"]
      }
      // ... other sections
    ]
  }
}
```

## Response

### Success

Status Code: `201 (Created)`

```json
{
  "status": "success",
  "message": "Artikel berhasil ditambahkan",
  "data": {
    "articleId": "Ab1C23De4F5O6p_"
  }
}
```

### Error

#### Incomplete Data

Status Code: `400 (Bad Request)`

```json
{
  "error": "Invalid request body. Ensure all fields are provided, and content should contain an array of sections."
}
```

#### Invalid Fields

Status Code: `400 (Bad Request)`

```json
{
  "error": "Invalid field(s) in one or more sections."
}
```

#### Internal Server Error

Status Code: `500 (Server Error)`

```json
{
  "status": "fail",
  "message": "Internal server error",
  "data": null
}
```
