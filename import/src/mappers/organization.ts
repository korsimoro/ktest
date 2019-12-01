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
    "kumu": mappers.tagArray('Tags'),
    "me2b": mappers.tagArray('Tags')
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
