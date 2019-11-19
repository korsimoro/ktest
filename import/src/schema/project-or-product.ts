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
  "URL" : {
    "kumu": mappers.string('Website'),
    "me2b": mappers.csv_value('')
  },
  "Category" : {
    "kumu": mappers.string('SubType'),
    "me2b": mappers.me2b_set_subtype_and_field('Category')
  },
  "Parent Org" : {
    "kumu": mappers.string('Parent Org'),
    "me2b": mappers.csv_value('')
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
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Tags')
  },
  "License" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('License')
  },
  "Version or Edition" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Version or Edition')
  },
  "Date Begun" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Date Begun')
  },
  "Date Ended" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Date Ended')
  },
  "Purpose": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Purpose')
  },
  "Digital Harms Addressed": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Digital Harms Addressed')
  },
  "Supported Identity Technologies" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Supported Identity Technologies')
  },
  "Activities" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Activities')
  },
  "Status" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Status')
  },
  "Me2B Participation" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Me2B Participation')
  },
  "Terms of Service" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Terms of Service')
  },
  "Github Profile" : {
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
  "description": "Project or Product",
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
    "URL" : {
        "type": "string",
        "format":"url",
        "description": ""
    },
    "Category" : {
        "type": "string",
        "format":"url",
        "description": "",
        "enum": [
          "open source",
          "pilot",
          "proof of concept",
          "research",
          "service",
          "other"
        ]
    },
    "Parent Org" : {
        "type": "string",
        "description": ""
    },
    "People" : {
        "type": "string",
        "description": ""
    },
    "Audience" : {
        "type": "string",
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
    "License" : {
        "type": "string",
        "description": ""
    },
    "Version or Edition" : {
        "type": "string",
        "description": ""
    },
    "Date Begun" : {
        "type": "string",
        "format": "date",
        "description": ""
    },
    "Date Ended" : {
        "type": "string",
        "format": "date",
        "description": ""
    },
    "Purpose": {
        "type": "string",
        "description": "",
        "enum": [
            "education",
            "human rights",
            "usability",
            "tech interoperability",
            "governance",
            "certification and compliance",
            "transparancy and accountability"
        ]
    },
    "Digital Harms Addressed": {
		"type": "string",
    	"enum": [
			"AGGREGATION",
			"APPROPRIATION",
			"BLACKMAIL",
			"BREACH OF CONFIDENTIALITY",
			"DECISIONAL INTERFERENCE",
			"DISCLOSURE",
			"DISTORTION",
			"EXCLUSION",
			"EXPOSURE",
			"IDENTIFICATION",
			"INCREASED ACCESSIBILITY",
			"INSECURITY",
			"INTERROGATION",
			"INTRUSION",
			"SECONDARY USE",
			"SURVEILLANCE"
		]
    },
    "Supported Identity Technologies" : {
        "type": "array",
        "description": "",
        "items": {
            "type":"string"
        }
    },
    "Activities" : {
        "type": "string",
        "description": "",
    },
    "Status" : {
        "type": "string",
        "description": "",
    },
    "Me2B Participation" : {
        "type": "string",
        "description": "",
    },
    "Terms of Service" : {
        "type": "string",
        "description": "",
    },
    "Github Profile" : {
        "type": "string",
        "format": "url",
        "description": "",
    },
    "Relevant Publications" : {
        "type": "array",
        "description": "",
        "items": {
            "type":"string"
        }
    }
  },
}
