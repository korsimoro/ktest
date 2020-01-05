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
    "kumu": mappers.tagArray('SubType'),
    "me2b": mappers.me2b_set_subtype_and_array_field('Category')
  },
  "Parent Org" : {
    "kumu": mappers.string('Parent Org'),
    "me2b": mappers.csv_value('Parent Org')
  },
  "People" : {
    "kumu": mappers.default(''),
    "me2b": mappers.tagArray('People')
  },
  "Audience" : {
    "kumu": mappers.default(''),
    "me2b": mappers.tagArray('Audience')
  },
  "Partners" : {
    "kumu": mappers.default(''),
    "me2b": mappers.tagArray('Partners')
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
    "me2b": mappers.tagArray('Purpose')
  },
  "Digital Harms Addressed": {
    "kumu": mappers.default(''),
    "me2b": mappers.tagArray('Digital Harms Addressed')
  },
  "Supported Identity Technologies" : {
    "kumu": mappers.default(''),
    "me2b": mappers.tagArray('Supported Identity Technologies')
  },
  "Activities" : {
    "kumu": mappers.default(''),
    "me2b": mappers.tagArray('Activities')
  },
  "Status" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Status')
  },
  "Me2B Participation" : {
    "kumu": mappers.default(''),
    "me2b": mappers.tagArray('Me2B Participation')
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
