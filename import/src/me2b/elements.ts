import fs from 'fs-extra'
import slugify from 'slugify';
import uuid from 'uuid'
import { schemas } from 'twiki-schema'
import { buildInboundMapper } from '../mappers'
import { Context } from '../context'
import { Me2BModel } from '.'

export interface TiddlerBuilder {
	schema:any
	inbound:any
	fields:any
	type:any,
	subtype:any
	edgemap:any
}

export interface Me2BElement {
	guid:string
	model:Me2BModel

	title:string
	type:string
	subtype:string|Set<string>

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
	subtype:string|Set<string>
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
