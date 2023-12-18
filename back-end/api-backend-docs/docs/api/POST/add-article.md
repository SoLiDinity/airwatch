---
id: add-article
title: Add Article
sidebar_position: 1
---

# Add Article

Endpoint ini berguna untuk menambahkan artikel ke database.

## Endpoint

- Method: `POST`
- URL: `/articles?key={Authorization Key}`

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

#### Unauthorized request

Status Code: `401 (Unauthorized)`

```json
{
  "status": "fail",
  "error": {
    "message": "Unauthorized. Key tidak valid."
  }
}
```

#### Incomplete Data

Status Code: `400 (Bad Request)`

```json
{
  "status": "fail",
  "error": {
    "message": "Request body tidak valid. pastikan semua bagian sudah benar, dan bagian content menyimpan array sections"
  }
}
```

#### Invalid Fields

Status Code: `400 (Bad Request)`

```json
{
  "status": "fail",
  "error": {
    "message": "Terdapat satu atau lebih bagian yang tidak valid pada sections"
  }
}
```

#### Internal Server Error

Status Code: `500 (Server Error)`

```json
{
  "status": "fail",
  "error": {
    "message": "Internal server error"
  }
  "data": null
}
```
