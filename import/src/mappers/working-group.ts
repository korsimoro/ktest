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
