import { Context } from '../context'
import { Me2BConnection,Me2BElement } from '.'

export function createAndLinkNodesForListField(elt:Me2BElement,field:string,type:string) {

  elt.model.ctx.tiddly.registerNamedMap('me2bstar')
  elt.model.ctx.tiddly.registerNamedMap('me2bstar-'+elt.model.ctx.me2b.slugify(type))
  //const nodes = [] as Me2BElement[]
  const value = elt.fields[elt.model.slugify(field)]
  if(!value)
    return
  let parts
  if (value instanceof Array)
    parts = value
  else {
    console.log("VALUE:",value)
    parts = (value.split(',').join(':')).split(":")
  }

  for(let part of parts) {
    part = part.trim()

    if(part) {
      //const label=part + "(" + type + ")"
      const metaModelTypeElement = elt.model.ensureElementWithLabel(part,type)
      new Me2BConnection(metaModelTypeElement.title,elt.title,type,elt.model)
      metaModelTypeElement.addToListField('tmap.names','me2bstar')
      metaModelTypeElement.addToListField('tmap.names','me2bstar-'+elt.model.ctx.me2b.slugify(type))
      elt.addToListField('tmap.names','me2bstar')
      elt.addToListField('tmap.names','me2bstar-'+elt.model.ctx.me2b.slugify(type))
      console.log("MAP:",'me2bstar-'+elt.model.ctx.me2b.slugify(type),field,type,part,elt.title,JSON.stringify(elt.fields['tmap.names']))
    }
  }

}
