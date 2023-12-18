---
id: update-article
title: Update Article
sidebar_position: 1
---

# Update Article

Endpoint ini berguna untuk memperbarui artikel berdasarkan ID ke database.

## Endpoint

- Method: `PUT`
- URL: `/articles/{Article ID}?key={Authorization Key}`

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

Status Code: `200 (Created)`

```json
{
  "status": "success",
  "message": "Artikel berhasil diperbarui"
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

#### Article Not Found

Status Code: `404 (Not Found)`

```json
{
  "status": "fail",
  "error": {
    "message": "Artikel tidak ditemukan"
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
