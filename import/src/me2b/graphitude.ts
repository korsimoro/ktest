import { Context } from '../context'
import { Me2BConnection } from '.'


function linkorg(type:string,field:string,relation:string,ctx:Context,mapnames:string[]) {
  const pap = ctx.me2b.findElementsByType(type)
  for(let p of pap) {
    const org = p.fields[field]
    if(!org) {
      //console.log(field+" empty in",type,p.title)
    }
    else {
      const elt = ctx.me2b.locateElementByLabel(org)
      if(!elt) {
        //console.log("ORG NOT FOUND",org)
      }
      else {
        new Me2BConnection(elt.title,p.title,relation,ctx.me2b)
        //console.log("LINKING",elt.title,relation,p.title)
        for(let mapname of mapnames) {
          elt.addToListField('tmap.names',mapname)
          p.addToListField('tmap.names',mapname)
        }
       }
    }
  }

}
function linkpeople(type:string,field:string,relation:string,ctx:Context,mapnames:string[]) {
  const pap = ctx.me2b.findElementsByType(type)
  console.log("Linking People",pap)
  for(let p of pap) {
    const people = p.fields[field]
    if(!people) {
      console.log("PERSON MISSING FROM",type,p.title)
    }
    else {
      console.log("PEOPLE",people)
/*
      const elt = ctx.me2b.locateElementByLabel(person)
      if(!elt)
        console.log("PERSON NOT FOUND",org)
      else {
        new Me2BConnection(elt.title,p.title,relation,ctx.me2b)
        console.log("LINKING",elt.title,relation,p.title)
       }
*/
    }
  }

}

export function linkProductsAndProjectsToOrganizations(ctx:Context) {
  linkorg("project-or-product","parent.org","Organization Supports Project or Product",ctx,[])
}
export function linkPublicationsToOrganizations(ctx:Context) {
  linkorg("publication","sponsoring.org","Published",ctx,[])
}
export function linkWorkingGroupsToOrganizations(ctx:Context) {
  linkorg("working-group","parent.org","Sponsors",ctx,[])
}
export function linkOrganizationsToOrganizations(ctx:Context) {
  linkorg("organization","parent.org","Sponsors",ctx,[])
}
export function linkOrganizationsToPeople(ctx:Context) {
  linkpeople("person","key.people","Associate",ctx,[])
}
export function linkPublicationsToAuthors(ctx:Context) {
  linkpeople("person","authors.editors","Author/Editor",ctx,[])
}
export function createMe2BStar(ctx:Context) {
  const M = ctx.me2b.locateElementByLabel("Me2B Alliance")
  if(!M)
    throw new Error("Can not find Me2B Alliance")

  const orgs = ctx.me2b.findElementsByType("organization")
  for(let p of orgs) {
    const relset = p.fields["me2b.relationship"] as string[]
    if(!relset) {
      console.log("No Me2B Relationship",p.title)
    }
    else {
      if(!relset)
        console.log("RELATIONSHPI IS EMPTY")
      else {
        var rel:string = ""
        try {
          for (let part of Array.from(relset.values())) {
            part = part.trim()
            if(part.startsWith("[[")) {
              const oldpart = part
              part = part.slice(2,part.length-2)
              //console.log("OLDNEW",oldpart,part)
            }
            if(part) {
              const metaModelTypeElement = M.model.ensureMetamodelElementWithLabel(part,"metamodel","Me2B Relationship")
            }
          }
        }
        catch(E) {
          console.log("REL",rel,E)
        }
      }
     }
    }

}
