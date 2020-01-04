import { Context } from '../context'
import { Me2BConnection } from '.'


function linkorg(type:string,field:string,relation:string,ctx:Context,mapnames:string[]) {
  const pap = ctx.me2b.findElementsByType(type)
  for(let p of pap) {
    const org = p.fields[field]
    if(!org) {
      console.log("ORG MISSING FROM",type,p.title)
    }
    else {
      const elt = ctx.me2b.locateElementByLabel(org)
      if(!elt)
        console.log("ORG NOT FOUND",org)
      else {
        new Me2BConnection(elt.title,p.title,relation,ctx.me2b)
        console.log("LINKING",elt.title,relation,p.title)
        for(let mapname of mapnames) {
          elt.addToListField('tmap.names',mapname)
          p.addToListField('tmap.names',mapname)
        }
       }
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
}
export function linkPublicationsToAuthors(ctx:Context) {
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
          for (rel of Array.from(relset.values())) {
            const metaModelTypeElement = M.model.ensureElementWithLabel(rel,"Me2B Relationship")
            //ctx.tiddly.registerNamedMap('me2bstar')
            //ctx.tiddly.registerNamedMap('me2bstar-'+ctx.me2b.slugify(rel))
            //new Me2BConnection(M.title,p.title,rel,ctx.me2b)
            //M.addToListField('tmap.names','me2bstar')
            //p.addToListField('tmap.names','me2bstar')
            //M.addToListField('tmap.names','me2bstar-'+ctx.me2b.slugify(rel))
            //p.addToListField('tmap.names','me2bstar-'+ctx.me2b.slugify(rel))
            //console.log("MAP2:",'me2bstar-'+p.model.ctx.me2b.slugify(rel),p.title)
          }
        }
        catch(E) {
          console.log("REL",rel,E)
        }
      }
     }
    }

}
