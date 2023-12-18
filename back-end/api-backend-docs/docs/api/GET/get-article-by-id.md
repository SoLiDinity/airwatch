---
id: get-article-by-id
title: Get Article By ID
sidebar_position: 3
---

# Get Article By ID

Endpoint ini berguna untuk mengambil data artikel tertentu dari database berdasarkan ID.

## Endpoint

- Method: `GET`
- URL: `/articles/{article ID}`

## Response

### Success

Status Code: `200 (OK)`

```json
{
  "status": "success",
  "data": {
    "article": [
      {
        "id": "Ab1C23De4F5O6p_",
        "title": "Article Title",
        "image_url": "URL to Image",
        "overview": "Article Overview",
        "content": {
          "sections": [
            {
              "title": "Section Title",
              "image_url": "URL to Image",
              "paragraph": "Section Paragraph",
              "list": ["Item 1", "Item 2"]
            }
            // ... other sections
          ]
        }
      }
    ]
  }
}
```

### Error

#### Article Not Found

Status Code: `400 (Not Found)`

```json
{
  "status": "fail",
  "error": {
    "message": "Artikel tidak ditemukan"
  }
}
```
