export default {
  "openapi": "3.0.1",
  "info": {
    "title": "Budget api",
    "description": "Documentation of a budget API",
    "contact": {
      "url": "https://github.com/DouglasD18",
      "email": "daguiaralcantara@gmail.com"
    },
    "version": "1.0.0"
  },
  "paths": {
    "/api/budget/": {
      "post": {
        "description": "Calculate budget",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "userId": {
                    "type": "number"
                  },
                  "productsId": {
                    "type": "array",
                    "items": {
                      "type": "integer"
                    }
                  }
                }
              },
              "examples": {
                "body": {
                  "type": "object",
                  "properties": {
                    "userId": {
                      "value": 1
                    },
                    "productsId": {
                      "value": [1, 2]
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Created",
            "content": {
              "application/json": {
                "body": {
                  "type": "number",
                  "example": 7410.2
                }
              }
            }
          },
          "400": {
            "description": "Bad Request"
          },
          "404": {
            "description": "Not Found"
          },
          "500": {
            "description": "Internal Error"
          }
        }
      }
    }
  }
}