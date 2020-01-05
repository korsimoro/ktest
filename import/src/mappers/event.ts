import { mappers } from './index'

export const inbound : any = {
  "Name" : {
    "kumu": mappers.label(),
    "me2b": mappers.me2b_set_title_and_field('Name')
  },
  "Description" : {
    "kumu": mappers.skip(),
    "me2b": mappers.me2b_set_description('Description')
  },
  "Website" : {
    "kumu": mappers.string("Website"),
    "me2b": mappers.csv_value('Website')
  },
  "Category" : {
    "kumu": mappers.tagArray('SubType'),
    "me2b": mappers.me2b_set_subtype_and_array_field('Category')
  },
  "Host Organization" : {
    "kumu": mappers.connectionIfExists('convenor'),
    "me2b": mappers.csv_value('Host Organization')
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
    "me2b": mappers.csv_value('Partners')
  },
  "Working Group" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Working Group')
  },
  "Tags": {
    "kumu": mappers.tagArray('Tags'),
    "me2b": mappers.tagArray('Tags')
  },
  "Frequency" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Frequency')
  },
  "Date" : {
    "kumu": mappers.kumu_start_date('Start Date'),
    "me2b": mappers.csv_value('Date')
  },
  "Location(s)": {
    "kumu": mappers.default(''),
    "me2b": mappers.tagArray('Location(s)')
  },
  "Github Profile": {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Github Profile')
  },
  "Relevant Publications" : {
    "kumu": mappers.default(''),
    "me2b": mappers.csv_value('Relevant Publications')
  }
}
