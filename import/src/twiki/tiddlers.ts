import slugify from 'slugify'
import path from 'path'
import uuid from 'uuid'

import { tiddlydate, TIDDLERTYPE, TiddlerFileBase } from './tiddly'



// Tiddly
export interface Tiddler  {
	guid:string
	base:TiddlerFileBase

	created: tiddlydate
	modified: tiddlydate
	title:string
	type:string

	tiddlerdir:() => string
	tiddlerfile:() => string
	tiddlerdata:() => string

	writeTiddler:() => void	
}

export interface TiddlerData {
	created?: tiddlydate
	modified?: tiddlydate
	title?:string
	type?:string
	guid?:string
	fields?:Map<string,string>
	text?:string
	element_type?:string
	element_subtype?:string
}


export interface NodeTiddler extends Tiddler {
	tmap_id:string
	tmap_edges: string
	element_type:string
	wiki_text:string
	fields:Map<string,string>
}

// --------------------------------------------------------------------------
// Impelementation
export class SimpleTiddler implements Tiddler
{
	guid:string
	base:TiddlerFileBase

	created: tiddlydate
	modified: tiddlydate
	title:string
	type:string

	constructor(data:TiddlerData,base:TiddlerFileBase) {
		this.guid = uuid.v4()
		this.base = base

		this.title = data.title || "untitled"
		this.created = data.created || Date.now()
		this.modified = data.modified || Date.now()
		this.type = data.type || TIDDLERTYPE
		this.guid = data.guid || this.guid
	}

	tiddlerdir():string {
		return this.base.path
	}
	tiddlerfile():string {
		const filepart = slugify(this.title) + ".tid"
		return path.join(this.tiddlerdir(),filepart)
	}
	tiddlerdata():string {
		return ""+
			"created:" + this.created + "\n" +
			"modified:" + this.modified + "\n" +
			"title:" + this.title + "\n" +
			"type:" + this.type + "\n";
	}

	async writeTiddler() {
		const dir = this.tiddlerdir()
		const path = this.tiddlerfile()
		const data = this.tiddlerdata()
		await this.base.ensurePath(dir)
		console.log("Writing Tiddler:",path)
		await fs.writeFile(path,data)
	}

}

export class SimpleNodeTiddler extends SimpleTiddler implements NodeTiddler
{
	tmap_id:string
	tmap_edges: string
	element_type:string
	element_subtype?:string
	wiki_text:string
	fields:Map<string,string>

	sorted_keys:string[]
	constructor(data:TiddlerData,base:TiddlerFileBase) {
		super(data,base)
		this.fields = data.fields || new Map<string,string>()
		this.tmap_id = this.fields['tmap.id'] || ''
		this.tmap_edges = this.fields['tmap.edges'] || ''
		this.element_type = data.element_type || 'undefined'
		this.element_subtype = data.element_subtype
		this.wiki_text = data.text || ""
		this.sorted_keys = []
		for(let k in this.fields)
			this.sorted_keys.push(k)
		this.sorted_keys.sort()
	}

	tiddlerdir():string {
		if(!this.element_type)
			return this.base.nodes
		else
			if(!this.element_subtype)
				return path.join(this.base.nodes,this.element_type)
			else
				return path.join(this.base.nodes,this.element_type,slugify(this.element_subtype,{lower:true}))
	}

	tiddlerdata() {
		let field_data = ""
		for (let k of this.sorted_keys) {
			if(this.fields[k] !== undefined)
				field_data = field_data + k + ":" + this.fields[k] + "\n"
		}
		return super.tiddlerdata() + field_data + "\n" + this.wiki_text + "\n"
	}
}
