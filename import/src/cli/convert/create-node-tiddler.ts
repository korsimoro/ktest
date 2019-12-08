import fs from 'fs-extra'
import { schemas } from 'twiki-schema'
import slugify from 'slugify'
import { buildInboundMapper } from '../../mappers'
import { Context } from '../../context'
import { KumuModel,KumuElement } from '../../kumu'
import { Me2BModel,Me2BElement } from '../../me2b'
import { TiddlyModel,NodeTiddler } from '../../twiki'

export interface TiddlerBuilder {
	schema:any
	inbound:any
	fields:any
	type:any,
	subtype:any
	edgemap:any
}

export function calculateSubtypeForWorkingGroup(elt:KumuElement,parentOrg:KumuElement) {
	if(!elt.fields['SubType']) {
		let pType = parentOrg.fields['SubType']
		if(parentOrg.type.name == 'working-group') {
			if(!pType)
				return 'w/in a Working Group'
			else
				return 'w/in a Working Group : '+pType
		}
		else {
			if(!pType)
				throw new Error("3:Parented working group, but parent has no subtype, elt is "+elt.label+", parent is "+parentOrg.label+", of type "+parentOrg.type.name)
			else
				return 'w/in a '+pType
		}
	}
	else
		return elt.fields['SubType']
}


export function createEdgeMap(elt:KumuElement,tb:TiddlerBuilder) {
	const edgemap:any = {}

	for(let o in elt.outbound) {
		const c=elt.outbound[o]
		edgemap[o] = {
			to:c.to.guid,
			type:c.type.name
		}
	}

	tb.edgemap = edgemap
}


export function configureType(typename:string,subtypename:string,tb:TiddlerBuilder)
{
	tb.type = typename
	const schema=schemas[tb.type]
	if(!schema) {
		console.log("Doh! - mismatch, can't find",tb.type)
	}
	else {
		tb.subtype = subtypename
		tb.schema = schema
		tb.inbound = buildInboundMapper(schema,'kumu')
		if(!tb.inbound)
			throw new Error("Can not find mapper for schema "+schema.description)
	}
}

export function populateSchema(elt:KumuElement,tb:TiddlerBuilder) {
	for(let x in tb.schema.properties) {
		const sdef = tb.schema.properties[x]
		const key = elt.model.ctx.tiddly.slugify(x)
		const mapper = tb.inbound[x]
		const value = mapper(elt,sdef)
		//console.log("Setting:",key,value)
		tb.fields[key]=value
	}
}

export function createNodeTiddlerFromKumuElement(elt:KumuElement,ctx:Context):NodeTiddler
{
	const tb = {
		fields:{},
	} as TiddlerBuilder

	createEdgeMap(elt,tb)
	configureType(elt.type.name,elt.fields['SubType'],tb)
	populateSchema(elt,tb)
	tb.fields['tmap.id']=elt.guid
	tb.fields['tmap.edges']=JSON.stringify(tb.edgemap)
	tb.fields['element.type']=tb.type
	//tb.fields['element.subtype']=tb.subtype

	const result = ctx.tiddly.createNodeTiddler({
		title:elt.label,
		fields:tb.fields,
		text:elt.description,
		element_type:tb.type,
		element_subtype:tb.subtype
	})
	return result
}
export function createNodeTiddlerFromMe2BElement(elt:Me2BElement,ctx:Context):NodeTiddler
{
	elt.fields['element.type']=elt.type

	const result = ctx.tiddly.createNodeTiddler({
		title:elt.title,
		fields:elt.fields,
		text:elt.description,
		element_type:elt.type,
		element_subtype:elt.subtype
	})
	return result
}
