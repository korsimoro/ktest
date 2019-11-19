import { JSONSchema6 } from 'json-schema'
import { mappers } from '../mappers'

export const inbound : any = {
  "Name" : {
    "kumu": mappers.label(),
    "me2b": mappers.me2b_set_title_and_field('Name')
  },
  "Description" : {
    "kumu": mappers.skip(),
    "me2b": mappers.me2b_set_description('Description')
  },
  "Website" : {
    "kumu": mappers.string("Website"),
    "me2b": mappers.csv_value('Website')
  },
  "Category" : {
    "kumu": mappers.string('SubType'),
    "me2b": mappers.me2b_set_subtype_and_field('Category')
  },
  "Host Organization" : {
    "kumu": mappers.connectionIfExists('convenor'),
    "me2b": mappers.csv_value('Host Organization')
  },
  "People" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('People')
  },
  "Audience" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Audience')
  },
  "Partners" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Partners')
  },
  "Working Group" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Working Group')
  },
  "Tags": {
    "kumu": mappers.tagArray('Tags'),
    "me2b": mappers.csv_value('Tags')
  },
  "Frequency" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Frequency')
  },
  "Date" : {
    "kumu": mappers.default('Start Date'),
    "me2b": mappers.csv_value('Date')
  },
  "Location(s)": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Location(s)')
  },
  "Github Profile": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Github Profile')
  },
  "Relevant Publications" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Relevant Publications')
  }
}

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
        "description": ""
    },
    "Description" : {
        "type": "string",
        "description": ""
    },
    "Website" : {
        "type": "string",
        "format":"url",
        "description": ""
    },
    "Category" : {
        "type": "string",
        "format":"url",
        "description": "",
        "enum": [
          "Size",
          "Identity",
          "Telco"
        ]
    },
    "Host Organization" : {
        "type": "string",
        "description": ""
    },
    "People" : {
        "type": "string",
        "description": ""
    },
    "Audience" : {
        "type": "string",
        "format":"url",
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
    "Partners" : {
        "type": "string",
        "description": ""
    },
    "Working Group" : {
        "type": "string",
        "description": ""
    },
    "Tags": {
		"type": "array",
		"items": {
			"type": "string"
			}
    },
    "Frequency" : {
        "type": "string",
        "description": "how often the event occurs",
        "enum": [
          "daily",
          "weekly",
          "monthly",
          "quarterly",
          "other"
        ]
    },
    "Date" : {
        "type": "string",
        "format": "date",
        "description": ""
    },
    "Location(s)": {
        "type": "array",
        "description": "",
        "items": {
            "type":"string"
        }
    },
    "Github Profile": {
        "type": "string",
        "format": "url",
        "description": ""
    },
    "Relevant Publications" : {
        "type": "string",
        "description": "",
    }
  },
}
