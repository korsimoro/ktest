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
    "me2b": mappers.csv_value('URL')
  },
  "Category" : {
    "kumu": mappers.string('SubType'),
    "me2b": mappers.me2b_set_subtype_and_field('Category')
  },
  "Parent Org" : {
    "kumu": mappers.string('Parent Org'),
    "me2b": mappers.csv_value('Parent Org')
  },
  "People" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('People')
  },
  "Meeting Frequency" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Meeting Frequency')
  },
  "Date Founded" : {
    "kumu": mappers.string('Start Date'),
    "me2b": mappers.csv_value('Date Founded')
  },
  "Date Ended" : {
    "kumu": mappers.string('End Date'),
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
  "Tech Focus": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Tech Focus')
  },
  "Activities" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Activities')
  },
  "Status" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Status')
  },
  "IPR" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('IPR')
  },
  "Github Profile" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Github Profile')
  },
  "Relevant Standards" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Relevant Standards')
  }

}

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
          "Discussion Group",
          "w/in SDO working on a formal standard",
          "Community Group",
          "w/in (Inter)Government Organization",
          "w/in a Trade Association"
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
    "Meeting Frequency" : {
        "type": "string",
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
    "Activities" : {
        "type": "string",
        "description": "",
    },
    "Status" : {
        "type": "string",
        "description": "",
        "enum": [
          "active",
          "inactive"
        ]
    },
    "IPR" : {
        "type": "string",
        "description": "",
    },
    "Github Profile" : {
        "type": "string",
        "format": "url",
        "description": "",
    },
    "Relevant Standards" : {
        "type": "string",
        "description": "",
    }
  },
}
