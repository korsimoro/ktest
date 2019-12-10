import { KumuElement } from '../kumu'
import { Me2BElement } from '../me2b'
//import { JSONSchema6 } from 'json-schema'
type SchemaPropertyDef = any

function getPublicationOrgs(elt:KumuElement) {
  const orgs = {}

  for(let auth of elt.findInboundOfType('author')) {
    if(auth.from.type.name != 'person') {
      orgs[auth.from.label] = auth.from
    }
  }

  for(let c of elt.findOutboundOfType('specification-of-group')) {
    orgs[c.to.label] = c
  }

  let sponsoringOrgName = elt.fields['Parent Org']
  if(sponsoringOrgName) {
    const sponsoringOrg = elt.model.locateElementByLabel(sponsoringOrgName)
    if(sponsoringOrg) {
      orgs[sponsoringOrg.label] = sponsoringOrg
      }
    }

  return orgs
}

export const mappers:any = {
  string(colName:string,dflt:string = '') {
    function mapper(elt:KumuElement,schema:SchemaPropertyDef):string {
      return elt.fields[colName] || dflt
    }
    return mapper
  },
  skip() {
    function mapper(elt:KumuElement,schema:SchemaPropertyDef) {
      return undefined
    }
    return mapper
  },
  description() {
    function mapper(elt:KumuElement,schema:SchemaPropertyDef):string {
      return elt.description
    }
    return mapper
  },
  label() {
    function mapper(elt:KumuElement,schema:SchemaPropertyDef):string {
      return elt.label
    }
    return mapper
  },
  tagArray(colName:string) {
    function mapper(elt:KumuElement|Me2BElement,schema:SchemaPropertyDef):Set<string> {
      const tagdata = (elt.slugmap[elt.model.slugify(colName)] || '').trim()
      const tags = new Set<string>()
      if(tagdata) {
        const t = tagdata.split("\n").join(":").split(",").join(":").split(":")
        for(let a of t)
          tags.add(a.trim())
      }
      return tags
    }
    return mapper
  },
  connectionIfExists(relName:string) {
    function mapper(elt:KumuElement,schema:SchemaPropertyDef):string {
      const c = elt.findInboundOfType(relName)
      if(!c || c.length==0)
        return ''
      return c[0].from.label
    }
    return mapper
  },
  publicationAuthors(colName:string) {
    function mapper(elt:KumuElement,schema:SchemaPropertyDef):string {
      const authors = {}

    	for(let auth of elt.findInboundOfType('author')) {
    		if(auth.from.type.name == 'person') {
    			authors[auth.from.label] = auth.from
    		}
    	}

      if(!authors) {
        const orgs = getPublicationOrgs(elt)
        return (Object.keys(authors).sort()).join(";")
      }

    	return (Object.keys(authors).sort()).join(";")
    }
    return mapper
  },
  publicationOrgs(colName:string) {
    function mapper(elt:KumuElement,schema:SchemaPropertyDef):string {
    	const orgs = getPublicationOrgs(elt)

      return (Object.keys(orgs).sort()).join(";")
    }
    return mapper
  },
  default(value:string) {
    function mapper(elt:KumuElement,schema:SchemaPropertyDef):string {
      return value
    }
    return mapper
  },
  csv_value(column_name:string) {
    function mapper(elt:Me2BElement,schema:SchemaPropertyDef):string {
      const val = elt.slugmap[elt.model.slugify(column_name)] || ''
      //console.log("Running Mapper",me2b_slugify(column_name),val,Object.keys(elt.slugmap))
      return val
    }
    return mapper
  },
  me2b_set_description(column_name:string) {
    function mapper(elt:Me2BElement,schema:SchemaPropertyDef) {
      //console.log("Running Description",elt.slugmap,me2b_slugify(column_name))
      elt.description = elt.slugmap[elt.model.slugify(column_name)]
      return undefined
    }
    return mapper
  },
  me2b_set_title_and_field(column_name:string) {
    function mapper(elt:Me2BElement,schema:SchemaPropertyDef) {
      const cname=elt.model.slugify(column_name)
      //console.log("Running Title",elt.slugmap,cname)
      elt.title = elt.slugmap[cname]
      if(!elt.title) {
        console.log("WARNING: untiltled element:"+elt.type+", using column "+cname+" and fields "+JSON.stringify(elt.fields))
        elt.title=elt.guid
      }
      return elt.slugmap[cname]
    }
    return mapper
  },
  me2b_set_subtype_and_field(column_name:string) {
    function mapper(elt:Me2BElement,schema:SchemaPropertyDef) {
      let st = elt.slugmap[elt.model.slugify(column_name)]
      if(!st) st = 'to-be-determined'
      st = st.trim()
      if(!st) st = 'to-be-determined'
      elt.subtype = elt.model.slugify(st).trim()
      return st
    }
    return mapper
  }
}


import { inbound as eventMapper } from './event'
import { inbound as workingGroupMapper } from './working-group'
import { inbound as personMapper } from './person'
import { inbound as organizationMapper } from './organization'
import { inbound as projectOrProductMapper } from './project-or-product'
import { inbound as publicationMapper } from './publication'

// These keys are the description field for the schemas above
export const inbound = {
  'Event':eventMapper,
  'Working Group':workingGroupMapper,
  'Person':personMapper,
  'Organization':organizationMapper,
  'Project or Product':projectOrProductMapper,
  'Publication':publicationMapper
}
export const subtypeFields = {
  'event':'Category',
  'working-group':"Category",
  'person':undefined,
  'organization':"Org Type",
  'project-or-product':"Category",
  'publication':"Publication Type"
}

import { JSONSchema6 } from 'json-schema'

export function buildInboundMapper(schema:JSONSchema6,flavor:string) {
  const result:any = {}
  const inboundMap = inbound[schema.description]
  if(!inboundMap)
    throw new Error("Failed to find inbound mapper map for schema "+schema.description)
  for(let propName in schema.properties) {
    const smap = inboundMap[propName]
    if(!smap)
      throw new Error("Failed to find inbound map for property on schema "+schema.description+", prop="+propName)
    const mapper=smap[flavor]
    if(!mapper)
      throw new Error("Failed to find mapper inbound map for property on schema "+schema.description+", prop="+propName+", flavor="+flavor)
    result[propName] = mapper
  }
  return result
}
