import { JSONSchema6 } from 'json-schema'

export type GUID = string

export interface TagSymbol {
  guid:GUID
  slug:string
  label:string
  description:string
}

export interface ModelElement {
  guid:GUID
  major_type:string
  minor_type:string
  tags:Set<TagSymbol>
}
export interface ModelRelationship {
  from:ModelElement
  to:ModelElement
  major_type:string
  minor_type:string
}

export enum EnumType {
  OTHER = "other"
}

export enum AudienceTypes extends EnumType {
  C_SUITE_DECISION_MAKERS = "C suite decision makers",
  CONSUMER_TECHNOLOGY_VENDORS = "consumer technology vendors",
  ENTERPRISE_TECHNOLOGY_VENDORS = "enterprise technology vendors",
  GENERAL_PUBLIC = "general public",
  GOVERNMENT_WORKERS = "government workers",
  LEGISLATORS = "legislators",
  MARGINALIZED_AND_DISADVANTAGED_COMMUNITIES = "marginalized and disadvantaged communities",
  PRODUCT_USERS = "product users",
  RESEARCHERS = "researchers",
  CREATORS = "creators"
}

export enum PartnerRoles extends EnumType {
  HOST = "Host"
  SPONSOR = "Sponsor"
  VENUE = "Venue"
}

export enum EventCategory extends EnumType {
  Identity = "identity",
  Telco = "Telco"
}

export interface Event extends ModelElement {
  name?:string
  description?:string
  website?:URL
  category?:EventCategory

  hostOrganization?:ModelElement
  people:Person[]

  audience:AudienceTypes
  partners:
}

export const schema : JSONSchema6 = {
  "definitions":{
  },
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
