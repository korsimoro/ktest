import { JSONSchema6 } from 'json-schema'

export const schema : JSONSchema6 = {
  "$id": "http://example.com/publication#",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "description": "Project or Product",
  "type": "object",
  "required": [ ],
  "additionalProperties": false,
  "properties" : {
    "Name" : {
        "type": "string",
        "title": "",
        "description": ""
    },
    "Description" : {
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
    "Category" : {
        "type": "string",
        "format":"url",
        "title": "",
        "description": "",
        "enum": [
          "open source",
          "pilot",
          "proof of concept",
          "research",
          "other"
        ]
    },
    "Parent Org" : {
        "type": "string",
        "title": "",
        "description": ""
    },
    "People" : {
        "type": "string",
        "title": "",
        "description": ""
    },
    "Audience" : {
        "type": "string",
        "title": "",
        "description": "",
        "enum": [
          "C suite decision makers",
          "consumer technology vendors",
          "enterprise technology vendors",
          "general public",
          "government workers",
          "legislators",
          "marginalizaed and disadvantaged communities",
          "product users",
          "researchers"
        ]
    },
    "Partners" : {
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
        "format": "url",
        "title": "",
        "description": ""
    },
    "License" : {
        "type": "string",
        "title": "",
        "description": ""
    },
    "Version or Edition" : {
        "type": "string",
        "title": "",
        "description": ""
    },
    "Date Begun" : {
        "type": "string",
        "format": "date",
        "title": "",
        "description": ""
    },
    "Date Ended" : {
        "type": "string",
        "format": "date",
        "title": "",
        "description": ""
    },
    "Purpose" : {
        "type": "string",
        "title": "",
        "description": "",
    },
    "Activities" : {
        "type": "string",
        "title": "",
        "description": "",
    },
    "Status" : {
        "type": "string",
        "title": "",
        "description": "",
    },
    "Me2B Participation" : {
        "type": "string",
        "title": "",
        "description": "",
    },
    "Scope" : {
        "type": "string",
        "title": "",
        "description": "",
    },
    "Location(s)" : {
        "type": "string",
        "title": "",
        "description": "",
    },
    "Terms of Service" : {
        "type": "string",
        "title": "",
        "description": "",
    },
    "Github Profile" : {
        "type": "string",
        "format": "url",
        "title": "",
        "description": "",
    },
    "Relevant Publications" : {
        "type": "string",
        "title": "",
        "description": "",
    }
  },
}
