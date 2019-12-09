import { Context } from '../context'
import { Me2BConnection,Me2BElement } from '.'

export function createAndLinkNodesForListField(elt:Me2BElement,field:string,type:string) {

  const nodes = [] as Me2BElement[]
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
      console.log(field,type,part)
      metaModelTypeElement.fields['tmap.names']='me2bstar'
    }
  }

}
