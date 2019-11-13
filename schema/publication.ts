import { JSONSchema6 } from 'json-schema'

export const schema : JSONSchema6 = {

  "$id": "http://example.com/publication#",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "description": "Publication",
  "type": "object",
  "required": [ ],
  "additionalProperties": false,
  "properties" : {
    "Name" : {
        "type": "string",
        "title": "",
        "description": ""
    },
    "About" : {
        "type": "string",
        "title": "",
        "description": ""
    },
    "URL" : {
        "type": "string",
        "format":"url",
        "title": "",
        "description": ""
    },
    "Publication Type" : {
        "type": "string",
        "format":"url",
        "title": "",
        "description": "",
        "enum": [
          "report",
          "paper",
          "news article",
          "event summary or output",
          "blog post",
          "op ed",
          "book",
          "video",
          "podcast",
          "standard",
          "terms of service",
          "license",
          "glossary",
          "legal document",
          "trust framework",
          "journal",
          "magazine"
        ]
    },
    "Parent Org" : {
        "type": "string",
        "title": "",
        "description": ""
    },
    "Author(s)/Editor(s)" : {
        "type": "string",
        "title": "",
        "description": ""
    },
    "Audience" : {
        "type": "string",
        "format":"url",
        "title": "",
        "description": "",
        "enum": [
        ]
    },
    "Sponsoring Organization" : {
        "type": "string",
        "title": "",
        "description": ""
    },
    "Working Group" : {
        "type": "string",
        "title": "",
        "description": ""
    },
    "Tags" : {
        "type": "string",
        "title": "",
        "description": ""
    },
    "Github Repo" : {
        "type": "string",
        "title": "",
        "description": ""
    },
    "License" : {
        "type": "string",
        "title": "",
        "description": ""
    },
    "Volume Frequence" : {
        "type": "string",
        "title": "",
        "description": ""
    },
    "Version or Edition" : {
        "type": "string",
        "title": "",
        "description": ""
    },
    "Date" : {
        "type": "string",
        "format": "date",
        "title": "",
        "description": ""
    },
    "Sector" : {
        "type": "string",
        "title": "",
        "description": "",
        "enum": [
        ]
    }
  },
}
