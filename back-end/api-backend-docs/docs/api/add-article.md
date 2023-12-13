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
  "error": "Request body tidak valid. pastikan semua bagian sudah benar, dan bagian content menyimpan array sections"
}
```

#### Invalid Fields

Status Code: `400 (Bad Request)`

```json
{
  "error": "Terdapat satu atau lebih bagian yang tidak valid pada sections"
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
