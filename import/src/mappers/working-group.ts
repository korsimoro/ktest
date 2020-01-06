import { mappers } from '../mappers'


export const inbound : any = {
  "Name" : {
    "kumu": mappers.label(),
    "me2b": mappers.me2b_set_title_and_field('Label')
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
    "kumu": mappers.directString('Parent Org'),
    "me2b": mappers.direct_csv_value('Parent Org')
  },
  "People" : {
    "kumu": mappers.default(''),
    "me2b": mappers.tagArray('People')
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
    "me2b": mappers.tagArray('Purpose')
  },
  "Digital Harms Addressed": {
    "kumu": mappers.default(''),
    "me2b": mappers.tagArray('Digital Harms Addressed')
  },
  "Tech Focus": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Tech Focus')
  },
  "Activities" : {
    "kumu": mappers.default(''),
    "me2b": mappers.tagArray('Activities')
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
  },
  "Tags": {
    "kumu": mappers.tagArray('Tags'),
    "me2b": mappers.tagArray('Tags')
  }

}
