import fs from 'fs-extra'
import slugify from 'slugify';
import uuid from 'uuid'
import { schemas } from 'twiki-schema'
import { buildInboundMapper } from '../mappers'
import { Context } from '../context'
import path from 'path'
//type SchemaPropertyDef = any

export interface TiddlerBuilder {
	schema:any
	inbound:any
	fields:any
	type:any,
	subtype:any
	edgemap:any
}

const images = [
	"$:/images/fa5/solid/shopping-cart",
	"$:/images/fa5/solid/shower",
	"$:/images/fa5/solid/shuttle-van",
	"$:/images/fa5/solid/snowflake",
  "$:/images/fa5/solid/fire-extinguisher",
  "$:/images/fa5/solid/flask",
  "$:/images/fa5/solid/hamburger",
  "$:/images/fa5/solid/people-carry",
  "$:/images/fa5/solid/pepper-hot"
]
let index = 0
const imap={}
function getIcon(t:string) {
	const v = imap[t]
	if(!v) {
		imap[t] = images[index]
		index = index + 1
	}
	return imap[t]
}
// --------------------------------------------------------------------------
// Declaration
export type Me2BConnectionMap = {[id:string]:Me2BConnection}

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

	outbound:Me2BConnectionMap
	addToListField:(key:string,newval:string) => void

}

export class Me2BConnection {
	guid:string
	model:Me2BModel
	from:Me2BElement
	to:Me2BElement
	type:string

	constructor(from:string,to:string,type:string,model:Me2BModel) {
		this.guid = uuid.v4()
		this.model = model
		this.from = model.locateElementByLabel(from)
		this.to = model.locateElementByLabel(to)
		this.type = type
		this.model.connectionTypes.add(type)
		this.from.outbound[this.guid] = this
		//console.log("CREATED CONNECTION:",this.from.title,type,this.to.title,this.model.connectionTypes.size)
	}
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

	outbound:Me2BConnectionMap

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
		this.outbound={}
	}

	addToListField(key:string,newval:string) {
		const val = this.fields[key]
		if(!val)
			this.fields[key]=newval
		else {
			if(val instanceof Set) {
				val.add(newval)
				console.log("MAP:extending set",JSON.stringify(val.values()),val,newval,this.title)
			}
			else {
				const newset = new Set<string>()
				newset.add(val)
				newset.add(newval)
				this.fields[key] = newset
				console.log("MAP:creating set",JSON.stringify(newset))
			}
		}
	}

}


export type Me2BElementMap = {[id:string]:Me2BElement}


// --------------------------------------------------------------------------
export class Me2BModel
{
	ctx:Context
	base:string
	elementGuidMap:Me2BElementMap
	elementTitleSlugMap:Me2BElementMap
	connectionTypes:Set<string>

	constructor(base:string,ctx:Context) {
		this.base = base
		this.ctx = ctx
		this.elementGuidMap = {}
		this.elementTitleSlugMap = {}
		this.connectionTypes = new Set<string>()
	}

	encounterElement(elt:Me2BElement) {
		this.elementGuidMap[elt.guid] = elt
		if(!elt.title)
			throw new Error("Untitled element:"+JSON.stringify(elt.fields))
		this.elementTitleSlugMap[elt.model.slugify(elt.title)] = elt
		elt.fields['input.source']='me2b'
	}

	locateElementByLabel(label:string):Me2BElement {
		const result = this.elementTitleSlugMap[this.slugify(label)]
		if(!result) {
			console.log("locateElementByLabel - FAILED TO FIND",label,"=>",this.slugify(label))
			//for(let x of Object.keys(this.elements).sort())
			//	console.log(x)
		}
		return result
	}

	ensureMetamodelElementWithLabel(label:string,type:string,subtype:string):Me2BElement {
		const result = this.elementTitleSlugMap[this.slugify(label)]
		if(result) {
			if(result.type != type) {
				console.log("Type Mismatch, ensureElementWithLabel '" + label + "' :got " + result.type + ":expected " + type)
			}
			else {
				if(result.subtype != subtype) {
					console.log("Sub Type Mismatch, ensureElementWithLabel '" + label + "' :got " + result.subtype + ":expected " + subtype)
				}
				else {
					console.log("Match")
				}

			}
			return result
		}

		const elt = new SimpleMe2BElement({
			},"metamodel",this)
		elt.title=label
		elt.subtype=subtype
		elt.fields['element_classification']='metamodel'
		elt.fields['metamodel.subtype']=subtype
		elt.fields['tw-icon']=getIcon(type)
		this.encounterElement(elt)
		return elt
	}

	findElementsByType(type:string):Me2BElement[] {
		const result = [] as Me2BElement[]
		for(let ek in this.elementGuidMap) {
			const e = this.elementGuidMap[ek]
			if(e.type == type)
				result.push(e)
		}
		return result
	}
	findElementsBySubtype(subtype:string):Me2BElement[] {
		const result = [] as Me2BElement[]
		for(let ek in this.elementGuidMap) {
			const e = this.elementGuidMap[ek]
			if(e.subtype == subtype)
				result.push(e)
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
		const elts = JSON.parse(await fs.readFile(path.join(this.base,eltfile),'utf8'))

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
					const key = this.ctx.tiddly.slugify(x)
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

}
