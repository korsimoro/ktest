import { Tiddler,SimpleTiddler,TiddlerData,TiddlyModel } from '.'
import path from 'path'
import slugify from 'slugify'

export interface NodeTiddler extends Tiddler {
	tmap_id:string
	tmap_edges: string
	element_type:string
	wiki_text:string
	fields:Map<string,string>
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
	constructor(data:TiddlerData,base:TiddlyModel) {
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
			return this.base.nodesPath
		else
			if(!this.element_subtype)
				return path.join(this.base.nodesPath,this.element_type)
			else
				return path.join(this.base.nodesPath,this.element_type,slugify(this.element_subtype,{lower:true}))
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
