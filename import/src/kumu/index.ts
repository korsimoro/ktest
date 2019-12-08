import fs from 'fs-extra'
import slugify from 'slugify'
import path from 'path'
import uuid from 'uuid'
import { Context } from '../context'

// --------------------------------------------------------------------------
// Declaration

// every connection or element has a guid, which is used internally,
// and is bound to the model (which serves as a factory for the entities)
export interface KumuEntity {
	guid:string
	model:KumuModel
	slugmap:{[key:string]:string}
}

// we are going to add a little bit here to allow use of 'nested' types
export interface KumuTag extends KumuEntity {
	slug:string
	title:string
	elements:KumuElementMap
	connections:KumuConnectionMap
}

// we are going to add a little bit here to allow use of 'nested' types
export interface KumuType {
	name:string
	depth:number
	parts:string[]
}
export interface KumuElementType extends KumuType {
	parent?:KumuElementType
}
export interface KumuConnectionType extends KumuType {
	parent?:KumuConnectionType
}

// now on to the meat of the model
export interface KumuElement extends KumuEntity {
	slug:string
	label:string

	type:KumuElementType
	description:string
	tags:KumuTagMap

	inbound:KumuConnectionMap
	outbound:KumuConnectionMap

	fields:any

	addOutbound:(conn:KumuConnection) => void
	addInbound:(conn:KumuConnection) => void
	findInboundOfType:(type:string) => KumuConnection[]
	findOutboundOfType:(type:string) => KumuConnection[]

}

export interface KumuConnection extends KumuEntity {
	from:KumuElement
	to:KumuElement
	type:KumuConnectionType
	fields:any
	description:string
}

// utility maps
export type KumuTagMap = {[id:string]:KumuTag}
export type KumuElementMap = {[id:string]:KumuElement}
export type KumuConnectionMap = {[id:string]:KumuConnection}
export type KumuElementTypeMap = {[id:string]:KumuElementType}
export type KumuConnectionTypeMap = {[id:string]:KumuConnectionType}



// --------------------------------------------------------------------------
// Implementation


export class SimpleKumuEntity implements KumuEntity {
	guid:string
	model:KumuModel
	slugmap:{[key:string]:string}

	constructor(src:any,model:KumuModel) {
		this.guid = uuid.v4()
		this.model = model
		this.slugmap = {}
		for (let key in src ) {
			const s = model.slugify(key)
			const val = ''+src[key]
			this.slugmap[s] = val
		}
	}

	mapFieldsExcept(elt:any,exclusion:string[]):Map<string,string> {
		const result = new Map<string,string>()
		const ex = new Set<string>()
		for(let key of exclusion)
			ex.add(this.model.slugify(key))

		for(let key in elt) {
			const slug = this.model.slugify(key)
			if ( ! ex.has(slug) ) {
				const value = elt[key]
				if (value != '') {
					result[key] = value
				}
			}
		}

		return result
	}

}


export class SimpleKumuElement extends SimpleKumuEntity implements KumuElement  {

		slug:string
		label:string

		type:KumuElementType
		description:string
		tags:KumuTagMap

		inbound:KumuConnectionMap
		outbound:KumuConnectionMap

		fields:Map<string,string>

    constructor(elt:any,model:KumuModel) {
			super(elt,model)

			this.label=this.slugmap.label || model.next_label()
			this.slug = model.slugify(this.label)
			this.type = this.model.encounterElementType(this.slugmap.type)
			this.description = this.slugmap.description || ""
			this.tags = {}
			this.inbound = {}
			this.outbound = {}
			this.fields=this.mapFieldsExcept(elt,['Label','Description','Type'])
			this.model.encounterElement(this)
		}

		addOutbound(conn:KumuConnection) {
			this.outbound[conn.guid] = conn
		}

		addInbound(conn:KumuConnection) {
			this.inbound[conn.guid] = conn
		}

		findOutboundOfType(type:string) {
			const results = [] as KumuConnection[]
			for(let key in this.outbound) {
				const conn = this.outbound[key]
				if(conn.type.name == type)
					results.push(conn)
			}
			return results
		}
		findInboundOfType(type:string) {
			const results = [] as KumuConnection[]
			for(let key in this.inbound) {
				const conn = this.inbound[key]
				if(conn.type.name == type)
					results.push(conn)
			}
			return results
		}
}

export class SimpleKumuConnection extends SimpleKumuEntity implements KumuConnection {

	from:KumuElement
	to:KumuElement

	type:KumuConnectionType
	fields:Map<string,string>
	description:string

	locateFrom(def:any):KumuElement {
		if(!def.From)
			throw "Malformed connection, missing From field on def"
	 	const result = this.model.locateElementByLabel(def.From)
		if(!result)
			throw "Can not find From element"+this.model.slugify(def.From)+" with connection "+JSON.stringify(def)
		return result
	}
	locateTo(def:any):KumuElement {
		if(!def.To)
			throw "Malformed connection, missing To field on def"
		const result = this.model.locateElementByLabel(def.To)
		if(!result)
			throw "Can not find To element"+this.model.slugify(def.To)+" with connection "+JSON.stringify(def)
		return result
	}


  constructor(def:any, model:KumuModel) {
		super(def,model)

		this.type = this.model.encounterConnectionType(this.slugmap.type)
		this.description = this.slugmap.description || ""
		this.fields=this.mapFieldsExcept(def,['Label','Description','Type'])

		this.from = this.locateFrom(def)
		this.from.addOutbound(this)

		this.to = this.locateTo(def)
		this.to.addInbound(this)
  }
}

// --------------------------------------------------------------------------
//

export class SimpleKumuType extends SimpleKumuEntity implements KumuType {
	name:string
	depth:number
	parts:string[]

	constructor(type:string,model:KumuModel) {
		super({},model)

		const p = type.split("/")
		this.depth = p.length
		this.parts =[]
		for(let idx in p)
			this.parts[idx]=model.slugify(p[idx])
		this.name = this.parts[this.depth-1]
	}
}

export class SimpleKumuElementType extends SimpleKumuType implements KumuElementType {
	parent?:KumuElementType
	constructor(type:string,model:KumuModel) {
		super(type,model)
		if(this.depth>1) {
			const parentType = this.parts.slice(0,this.depth-1).join("/")
			this.parent = this.model.encounterElementType(parentType);
		}
	}
}
export class SimpleKumuConnectionType extends SimpleKumuType implements KumuConnectionType {
	parent?:KumuConnectionType
	constructor(type:string,model:KumuModel) {
		super(type,model)
		if(this.depth>1) {
			const parentType = this.parts.slice(0,this.depth-1).join("/")
			this.parent = this.model.encounterConnectionType(parentType);
		}
	}
}

// --------------------------------------------------------------------------
export class KumuModel
{
	index:number
	next_label():string {
		this.index = this.index + 1
		return 'unlabeled-'+this.index
	}

	elements:KumuElementMap
	elementTypes:KumuElementTypeMap
	defaultElementType:KumuElementType
	connectionTypes:KumuConnectionTypeMap
	defaultConnectionType:KumuConnectionType

	base:string
	ctx:Context

	constructor(base:string,ctx:Context) {
		this.ctx = ctx
		this.base = base
		this.index = 0
		this.elements = {}
		this.elementTypes = {}
		this.connectionTypes = {}
		this.defaultConnectionType = this.encounterConnectionType('default')
		this.defaultElementType = this.encounterElementType('default')
	}

	slugify(x:any):string {
		return slugify(x,{lower:true})
	}

	encounterElement(elt:KumuElement) {
		this.elements[elt.slug] = elt
		elt.fields['input.source']='kumu'
	}

	locateElementByLabel(label:string):KumuElement {
		const result = this.elements[this.slugify(label)]
		if(!result) {
			console.log("locateElementByLabel - FAILED TO FIND",label,"=>",this.slugify(label))
			//for(let x of Object.keys(this.elements).sort())
			//	console.log(x)
		}
		return result
	}
	encounterElementType(type:string):KumuElementType
	{
		if(!type)
			return this.defaultElementType
		if(!this.elementTypes[type])
			this.elementTypes[type] = new SimpleKumuElementType(type,this)
		return this.elementTypes[type]
	}

	encounterConnectionType(type:string):KumuConnectionType
	{
		if(!type)
			return this.defaultConnectionType
		if(!this.connectionTypes[type])
			this.connectionTypes[type] = new SimpleKumuConnectionType(type,this)
		return this.connectionTypes[type]
	}

	async load(failFast:boolean = false):Promise<void> {
		const elts = JSON.parse(await fs.readFile(path.join(this.base,'elements.json'),'utf8'))
		const conns = JSON.parse(await fs.readFile(path.join(this.base,'connections.json'),'utf8'))

		//console.log("Building Elements");
		for(let e of elts) {
			try {
				new SimpleKumuElement(e,this)
			}
			catch(E) {
				if(failFast) throw E;
				else { console.log("Trouble w/ element:",JSON.stringify(e)) }
			}
		}

		//console.log("Building Connections");
		for(let c of conns) {
			try {
				new SimpleKumuConnection(c,this)
			}
			catch(E) {
				if(failFast) throw E;
				else { console.log("Trouble w/ connection:",JSON.stringify(c)) }
			}
		}
	}
}
