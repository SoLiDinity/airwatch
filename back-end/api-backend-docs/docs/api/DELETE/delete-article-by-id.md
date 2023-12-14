---
id: delete-article-by-id
title: Delete Article By ID
sidebar_position: 4
---

# Delete Article By ID

Endpoint ini berguna untuk menghapus data artikel tertentu dari database berdasarkan ID.

## Endpoint

- Method: `DELETE`
- URL: `/articles/{article ID}`

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

Status Code: `400 (Not Found)`

```json
{
  "status": "fail",
  "message": "Artikel tidak ditemukan"
}
```
