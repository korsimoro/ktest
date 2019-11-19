import { JSONSchema6 } from 'json-schema'
import { mappers } from '../mappers'

export const inbound : any = {
  "Name" : {
    "kumu": mappers.label(),
    "me2b": mappers.me2b_set_title_and_field('Label')
  },
  "About" : {
    "kumu": mappers.skip(),
    "me2b": mappers.me2b_set_description('About')
  },
  "URL" : {
    "kumu": mappers.string('Website'),
    "me2b": mappers.csv_value('')
  },
  "Publication Type" : {
    "kumu": mappers.string('SubType'),
    "me2b": mappers.me2b_set_subtype_and_field('Category')
  },
  "Sponsoring Org" : {
    "kumu": mappers.string('Parent Org'),
    "me2b": mappers.csv_value('')
  },
  "Author(s)/Editor(s)" : {
    "kumu": mappers.publicationAuthors(),
    "me2b": mappers.csv_value('Author(s)/Editor(s)')
  },
  "Audience" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Audience')
  },
  "Sponsoring Organization" : {
    "kumu": mappers.publicationOrgs(),
    "me2b": mappers.csv_value('Sponsoring Organization')
  },
  "Working Group" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Working Group')
  },
  "Tags" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('TAGS')
  },
  "License" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('License')
  },
  "Volume Frequency" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Volume Frequency')
  },
  "Version or Edition" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Version or Edition')
  },
  "Date" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Date')
  },
  "Sector" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Sector')
  },
  "Purpose": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Purpose')
  },
  "Digital Harms Addressed": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Digital Harms Addressed')
  },
  "Tech Focus": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Tech Focus')
  },
  "Jurisdiction": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Jurisdiction')
  },
  "Github Profile": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Github Profile')
  }
}


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

        "description": ""
    },
    "About" : {
        "type": "string",

        "description": ""
    },
    "URL" : {
        "type": "string",
        "format":"url",

        "description": ""
    },
    "Publication Type" : {
        "type": "string",
        "description": "",
        "enum": [
            "blog post",
            "book",
            "event summary or output",
            "glossary",
            "journal",
            "legal document",
            "license",
            "magazine",
            "news article",
            "op ed",
            "paper",
            "podcast",
            "report",
            "standard",
            "terms of service",
            "Trust Framework",
            "video"
        ]
    },
    "Sponsoring Org" : {
        "type": "string",
        "description": ""
    },
    "Author(s)/Editor(s)" : {
        "type": "array",

        "description": "",
        "items": {
            "type": "string"
        }
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
            "marginalized and disadvantage communities",
            "product users",
            "researchers"
        ]
    },
    "Sponsoring Organization" : {
        "type": "string",
        "description": ""
    },
    "Working Group" : {
        "type": "string",
        "description": ""
    },
    "Tags" : {
        "type": "array",
        "description": "",
        "items": {
            "type": "string"
        }
    },
    "License" : {
        "type": "string",

        "description": ""
    },
    "Volume Frequency" : {
        "type": "string",

        "description": ""
    },
    "Version or Edition" : {
        "type": "string",

        "description": ""
    },
    "Date" : {
        "type": "string",
        "format": "date",
        "description": ""
    },
    "Sector" : {
        "type": "string",
        "description": "",
        "enum": [
        ]
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
    "Tech Focus": {
    	"type": "string",
    	"enum": [
    		"Identity",
    		"Data Mobility",
    		"Terms Management",
    		"Information Sharing Control",
    		"Data Storage"
    	]
    },
    "Jurisdiction": {
    	"type": "string"
    },
    "Github Profile": {
    	"type": "string",
    	"format": "url"
    }
  },
}
