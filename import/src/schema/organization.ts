import { JSONSchema6 } from 'json-schema'
import { mappers } from '../mappers'

export const inbound : any = {
  "Org Name": {
    "kumu": mappers.label(),
    "me2b": mappers.me2b_set_title_and_field('Org Name')
  },
  "About": {
    "kumu": mappers.skip(),
    "me2b": mappers.me2b_set_description('About')
  },
  "Website": {
    "kumu": mappers.string('Website'),
    "me2b": mappers.csv_value('Website')
  },
  "Org Type": {
    "kumu": mappers.string('SubType'),
    "me2b": mappers.me2b_set_subtype_and_field('Org Type')
  },
  "Sector": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Sector')
  },
  "Purpose": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Purpose')
  },
  "Activities": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Activities')
  },
  "Parent Org": {
    "kumu": mappers.string('Parent Org'),
    "me2b": mappers.csv_value('Parent Org')
  },
  "Me2B Relationship": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Me2B Relationship')
  },
  "Key People": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Key People')
  },
  "Audience": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Audience')
  },
  "Partners": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Partners')
  },
  "Tags": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Tags')
  },
  "Date Founded": {
    "kumu": mappers.string('Start Date'),
    "me2b": mappers.csv_value('Date Founded')
  },
  "Date Ended": {
    "kumu": mappers.string('End Date'),
    "me2b": mappers.csv_value('Date Ended')
  },
  "Digital Harms Addressed": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Digital Harms Addressed')
  },
  "Tech Focus": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Tech Focus')
  },
  "Status": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Status')
  },
  "Annual Budget": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Annual Budget')
  },
  "Funding": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Funding')
  },
  "Scope": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Scope')
  },
  "Location(s)": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Location(s)')
  },
  "Products and or services": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Products and or services')
  },
  "Twitter Profile": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Twitter Profile')
  },
  "LinkedIn Profile": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('LinkedIn Profile')
  },
  "Github Profile": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Github Profile')
  },
  "Relevant Publications": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Relevant Publications')
  }
}


export const schema : JSONSchema6 = {
  "$id": "https://example.com/organization.schema.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Organization",
  "type": "object",
  "properties": {
    "Org Name": {
    	type: "string",
      title: "Organization Name"
    },
    "About": {
    	"type": "string"
    },
    "Website": {
    	"type": "string",
    	"format": "url"
    },
    "Org Type": {
    	"type": "string",
    	"enum": [
    		"Coalition or Network",
    		"Government Department",
    		"Research Lab or Center",
    		"University",
    		"Standards Development Organization",
    		"TradeAssociation",
    		"University Department",
			"Non Governmental Organization",
			"Part of Supra-National Government",
			"Government",
			"Cooperative"
    	]
    },
    "Sector": {
    	"type": "string",
    	"enum": [
    		"non-profit",
    		"for-profit",
    		"government",
    		"academic"
    	]
    },
    "Purpose": {
      "type": "string",
      "enum": [
        "education",
        "human rights",
        "usability",
        "tech interoperability",
        "governance",
        "certification and compliance",
        "transparency and accountability",
        "consumer support",
        "health care"
      ]
    },
    "Activities": {
    	"type": "string",
    	"enum": [
    		"advocacy",
    		"certification",
    		"compliance auditing",
    		"events and convening",
    		"formal training and classes",
    		"funding",
    		"incubation",
    		"movement building",
    		"outreach",
    		"policy development",
    		"publication",
    		"regulation",
    		"research",
    		"software development",
    		"standard development",
        "service provider"
    	]
    },
    "Parent Org": {
    	"type": "string"
    },
    "Me2B Relationship": {
    	"type": "string",
    	"enum": [
          "Certification Candidate",
          "collaborating org",
          "member",
          "potential collaborator",
          "out of scope",
          "funder",
          "affiliates"
        	]
	   },
    "Key People": {
    	"type": "string",
    	"enum": [
    		"Board People",
    		"CEO or ED",
    		"Other Leadership",
    		"Working group chair",
        "Technical editor",
        "Employee"
    	]
    },
    "Audience": {
    	"type": "string",
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
    "Partners": {
		"type": "array",
		"maxItems": 5,
		"items": {
			"type": "string"
			}
	 },
    "Tags": {
		"type": "array",
		"items": {
			"type": "string"
			}
    },
    "Date Founded": {
    	"type": "string",
    	"format": "date"
    },
    "Date Ended": {
    	"type": "string",
    	"format": "date"
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
    "Status": {
    	"type": "string",
    	"enum": [
    		"active",
    		"inactive",
    		"merged"
    	]
    },
	"Annual Budget": {
    	"type": "string"
	},
	"Funding": {
    	"type": "string"
	},
    "Scope": {
    	"type": "string",
    	"enum": [
    		"global",
    		"national",
    		"regional",
    		"local",
    		"other"
    	]
    },
    "Location(s)": {
    	"type": "string"
    },
    "Products and or services": {
		"type": "array",
		"items": {
			"type": "string"
		}
    },
    "Twitter Profile": {
    	"type": "string",
    	"format": "url"
    },
    "LinkedIn Profile": {
    	"type": "string",
    	"format": "url"
    },
    "Github Profile": {
    	"type": "string",
    	"format": "url"
    },
    "Relevant Publications": {
    	"type": "string"
    }
  }
}
