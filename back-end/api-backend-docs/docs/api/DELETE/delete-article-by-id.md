---
id: delete-article-by-id
title: Delete Article By ID
sidebar_position: 4
---

# Delete Article By ID

Endpoint ini berguna untuk menghapus data artikel tertentu dari database berdasarkan ID.

## Endpoint

- Method: `DELETE`
- URL: `/articles/{article ID}?key={Authorization Key}`

## Response

### Success

Status Code: `200 (OK)`

```json
{
  "status": "success",
  "message": "Artikel berhasil dihapus"
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

#### Article not found

Status Code: `400 (Not Found)`

```json
{
  "status": "fail",
  "error": {
    "message": "Artikel tidak ditemukan"
  }
}
```
