---
id: add-article
title: Add Article
---

# Add Article

This endpoint allows you to add a new article to the database.

## Endpoint

- Method: `POST`
- URL: `/articles`

## Request

### Body

```json
{
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
```

## Response

### Success

Status Code: `201 (Created)`

```json
{
  "status": "success",
  "message": "Artikel berhasil ditambahkan",
  "data": {
    "articleId": "7OKwugIoxRysyG6P"
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
