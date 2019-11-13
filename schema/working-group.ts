import { JSONSchema6 } from 'json-schema'

export const schema : JSONSchema6 = {

  "$id": "http://example.com/publication#",
  "$schema": "http://json-schema.org/draft-04/schema#",
  "description": "Working Group",
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
          "Discussion Group",
          "w/in SDO working on a formal standard",
          "Community Group"
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
    "Github Repo" : {
        "type": "string",
        "title": "",
        "description": ""
    },
    "Meeting Frequency" : {
        "type": "string",
        "title": "",
        "description": "",
        "enum": [
          "weekly",
          "bi-weekly",
          "monthly",
          "quarterly",
          "semi-annually",
          "annually"
        ]
    },
    "Date Founded" : {
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
    "Tech Focus" : {
        "type": "string",
        "title": "",
        "description": "",
        "enum": [
        ]
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
        "enum": [
          "active",
          "inactive"
        ]
    },
    "Me2B Relationship" : {
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
    "IPR" : {
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
    "Relevant Standards" : {
        "type": "string",
        "title": "",
        "description": "",
    }
  },
}
