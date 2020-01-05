import { mappers } from '../mappers'

export const inbound : any = {
  "Name" : {
    "kumu": mappers.label(),
    "me2b": mappers.me2b_set_title_and_field('Name')
  },
  "About" : {
    "kumu": mappers.skip(),
    "me2b": mappers.me2b_set_description('About')
  },
  "URL" : {
    "kumu": mappers.string('Website'),
    "me2b": mappers.csv_value('URL')
  },
  "Publication Type" : {
    "kumu": mappers.string('SubType'),
    "me2b": mappers.me2b_set_subtype_and_array_field('Publication Type')
  },
  "Sponsoring Org" : {
    "kumu": mappers.publicationOrgs(),
    "me2b": mappers.csv_value('Sponsoring Organization')
  },
  "Authors-Editors" : {
    "kumu": mappers.publicationAuthors(),
    "me2b": mappers.tagArray('Author(s)/Editors')
  },
  "Audience" : {
    "kumu": mappers.default(''),
    "me2b": mappers.tagArray('Audience')
  },
  "Working Group" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Working Group')
  },
  "Tags": {
    "kumu": mappers.tagArray('Tags'),
    "me2b": mappers.tagArray('Tags')
  },
  "License" : {
    "kumu": mappers.default(''),
    "me2b": mappers.tagArray('License')
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
    "me2b": mappers.tagArray('Digital Harms Addressed')
  },
  "Tech Focus": {
    "kumu": mappers.default(''),
    "me2b": mappers.tagArray('Tech Focus')
  },
  "Jurisdiction": {
    "kumu": mappers.default(''),
    "me2b": mappers.tagArray('Jurisdiction')
  },
  "Github Profile": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Github Profile')
  }
}
