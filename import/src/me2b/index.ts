import fs from 'fs-extra'
import slugify from 'slugify';
import uuid from 'uuid'
import { schemas } from 'twiki-schema'
import { buildInboundMapper } from '../mappers'
import { Context } from '../context'
import path from 'path'
type SchemaPropertyDef = any

export interface TiddlerBuilder {
	schema:any
	inbound:any
	fields:any
	type:any,
	subtype:any
	edgemap:any
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
			const s = model.slugify(key)
			const val = ''+src[key]
			this.slugmap[s] = val
		}
	}

}


export type Me2BElementMap = {[id:string]:Me2BElement}


// --------------------------------------------------------------------------
export class Me2BModel
{
	base:string
	elements:Me2BElementMap

	constructor(base:string) {
		this.base = base
		this.elements = {}
	}

	encounterElement(elt:Me2BElement) {
		this.elements[elt.guid] = elt
		elt.fields['input.source']='me2b'
	}

	locateElementByLabel(label:string):Me2BElement {
		const result = this.elements[this.slugify(label)]
		if(!result) {
			console.log("locateElementByLabel - FAILED TO FIND",label,"=>",this.slugify(label))
			//for(let x of Object.keys(this.elements).sort())
			//	console.log(x)
		}
		return result
	}

	slugify(x:any):string {
		return slugify(x,{lower:true})
	}

	async load() {
		await this.loadFile('organizations.json','organization',true)
		await this.loadFile('event.json','event',true)
		await this.loadFile('groups.json','working-group',true)
		await this.loadFile('product.json','project-or-product',true)
		await this.loadFile('pubs.json','publication',true)
	}

  async loadFile(eltfile:string,type:string,failFast = false) {
		const elts = JSON.parse(await fs.readFile(path.join(this.base,eltfile)))

		const schema=schemas[type]
		if(!schema) {
			throw new Error("Doh! - mismatch, can't find " + type)
		}
		const inbound = buildInboundMapper(schema,'me2b')

		//console.log("Building Elements");
		for(let e of elts) {
			try {
				const newelt = new SimpleMe2BElement(e,type,this)

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

				this.encounterElement(newelt)
			}
			catch(E) {
				if(failFast) throw E;
				else { console.log("Trouble w/ element:",JSON.stringify(e)) }
			}
		}
	}


	map_csv_value(column_name:string) {
		const model=this
		function mapper(elt:Me2BElement,schema:SchemaPropertyDef):string {
			const val = elt.slugmap[model.slugify(column_name)] || ''
			//console.log("Running Mapper",me2b_slugify(column_name),val,Object.keys(elt.slugmap))
			return val
		}
		return mapper
	}
	map_description(column_name:string) {
		function mapper(elt:Me2BElement,schema:SchemaPropertyDef) {
			//console.log("Running Description",elt.slugmap,me2b_slugify(column_name))
			elt.description = elt.slugmap[this.slugify(column_name)]
			return undefined
		}
		return mapper
	}
	map_title(column_name:string) {
		function mapper(elt:Me2BElement,schema:SchemaPropertyDef) {
			//console.log("Running Title",elt.slugmap,me2b_slugify(column_name))
			elt.title = elt.slugmap[this.slugify(column_name)]
			return elt.slugmap[this.slugify(column_name)]
		}
		return mapper
	}
	map_subtype_and_field(column_name:string) {
		function mapper(elt:Me2BElement,schema:SchemaPropertyDef) {
			let st = elt.slugmap[this.slugify(column_name)]
			if(!st) st = 'to-be-determined'
			elt.subtype = st
			return st
		}
		return mapper
	}

}
