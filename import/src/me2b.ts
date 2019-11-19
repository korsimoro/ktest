import fs from 'fs-extra'
import slugify from 'slugify';
import uuid from 'uuid'
import { schemas } from './schema'
import { buildInboundMapper } from './schema'
import { tiddlerSlugify } from './convert/create-node-tiddler'
import { Context } from './context'
import { TiddlerFileBase,NodeTiddler } from './tiddly'

export interface TiddlerBuilder {
	schema:any
	inbound:any
	fields:any
	type:any,
	subtype:any
	edgemap:any
}

export const me2b_slugify = (x:any):string => {
	return slugify(x,{lower:true})
}
// --------------------------------------------------------------------------
// Declaration

// every connection or element has a guid, which is used internally,
// and is bound to the model (which serves as a factory for the entities)
export interface Me2BElement {
	guid:string
	model:Me2BModel

	title:string
	type:string
	subtype:string

	description:string

	slugmap:{[key:string]:string}
	fields:any
}



// --------------------------------------------------------------------------
// Implementation

export class SimpleMe2BElement implements Me2BElement  {
	guid:string
	model:Me2BModel

	title:string
	type:string
	subtype:string
	description:string

	slugmap:{[key:string]:string}
	fields:any

  constructor(src:any,type:string,model:Me2BModel) {
		this.guid = uuid.v4()
		this.model = model
		this.title = 'untitled'
		this.type = type
		this.fields = {}
		this.subtype = ''
		this.description = ''
		this.slugmap = {}
		for (let key in src ) {
			const s = me2b_slugify(key)
			const val = ''+src[key]
			this.slugmap[s] = val
		}
	}

}
export type Me2BElementMap = {[id:string]:Me2BElement}


// --------------------------------------------------------------------------
export class Me2BModel
{

	elements:Me2BElementMap

	constructor() {
		this.elements = {}
	}

	encounterElement(elt:Me2BElement) {
		this.elements[elt.guid] = elt
	}

	locateElementByLabel(label:string):Me2BElement {
		const result = this.elements[me2b_slugify(label)]
		if(!result) {
			console.log("locateElementByLabel - FAILED TO FIND",label,"=>",me2b_slugify(label))
			//for(let x of Object.keys(this.elements).sort())
			//	console.log(x)
		}
		return result
	}
}

// --------------------------------------------------------------------------

export async function me2bloader(model:Me2BModel,eltfile:string,type:string,failFast = false):Promise<Me2BModel> {
	const elts = JSON.parse(await fs.readFile(eltfile))

	const schema=schemas[type]
	if(!schema) {
		throw new Error("Doh! - mismatch, can't find " + type)
	}
	const inbound = buildInboundMapper(schema,'me2b')

	//console.log("Building Elements");
	for(let e of elts) {
		try {
			const newelt = new SimpleMe2BElement(e,type,model)

			for(let x in schema.properties) {
				const sdef = schema.properties[x]
				const key = tiddlerSlugify(x)
				const mapper = inbound[x]
				const value = mapper(newelt,sdef)
				//console.log("Setting:",key,value)
				newelt.fields[key]=value
			}
			newelt.fields['tmap.id']=newelt.guid
			newelt.fields['tmap.edges']="{}"

			model.encounterElement(newelt)
		}
		catch(E) {
			if(failFast) throw E;
			else { console.log("Trouble w/ element:",JSON.stringify(e)) }
		}
	}

	return model
}
