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
