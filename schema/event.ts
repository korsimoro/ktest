import { JSONSchema6 } from 'json-schema'

export const schema : JSONSchema6 = {
  "$id": "http://example.com/publication#",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "description": "Event",
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
    "Website" : {
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
          "Size",
          "Identity",
          "Telco"
        ]
    },
    "Host Organization" : {
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
        "format":"url",
        "title": "",
        "description": "",
        "enum": [
          "C suite decision makers",
          "consumer technology vendors",
          "enterprise technology vendors",
          "general public",
          "government workers",
          "legislators",
          "marginalized and diadvantaged communities",
          "product users",
          "researchers",
          "creators"
        ]
    },
    "Partners / Host Sponsor Venue" : {
        "type": "string",
        "title": "",
        "description": ""
    },
    "Frequency" : {
        "type": "string",
        "title": "",
        "description": "how often the event occurs",
        "enum": [
          "daily",
          "weekly",
          "monthly",
          "quarterly",
          "other"
        ]
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
    "Location(s)": {
        "type": "string",
        "title": "",
        "description": ""
    },
    "Twitter Profile": {
        "type": "string",
        "format": "url",
        "title": "",
        "description": ""
    },
    "Github Profile": {
        "type": "string",
        "format": "url",
        "title": "",
        "description": ""
    },
    "Relevant Publications" : {
        "type": "string",
        "title": "",
        "description": "",
    }
  },
}
