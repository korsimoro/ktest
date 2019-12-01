import fs from 'fs-extra'
import uuid from 'uuid'
import slugify from 'slugify'
import path from 'path'
import cytoscape from 'cytoscape'

import { tiddlydate, TIDDLERTYPE, TiddlerFileBase } from './tiddly'
import { TiddlerData,NodeTiddler,SimpleTiddler,SimpleNodeTiddler } from './tiddlers'

export interface TiddlerPosition {
	x:number
	y:number
}

export interface TiddlyMap {
	name:string
	nodes:Set<string>
	edges:Set<string>
	positions:Map<string,Position>

	layoutGraph:() => void
}


export class NodeTypeTiddler extends SimpleTiddler  {
	/*
	created: 20190902112311677
	modified: 20190902112605892
	priority: 1
	scope: [field:element.type[working-group]]
	style: {"color":{"border":"rgba(146,233,110,1)","background":"rgba(252,53,129,1)"}}
	title: $:/plugins/felixhayashi/tiddlymap/graph/nodeTypes/working-group
	type: text/vnd.tiddlywiki
*/
	parts:string[]
	slugchain:string[]
	filepart:string
	dirchain?:string[]

	scope:string
	style:string
	constructor(parts:string[],base:TiddlerFileBase) {
		super({
			title:"$:/plugins/felixhayashi/tiddlymap/graph/nodeTypes/"+parts.join("/")
		},base)
		this.parts = parts
		this.slugchain=[]
		const len = this.parts.length
		for(let idx in parts)
			this.slugchain[idx]=slugify(parts[idx])
		if (len == 1) {
			this.filepart = this.slugchain[0]
			this.dirchain = undefined
		}
		else {
			this.filepart = this.slugchain[len-1]
			this.dirchain=this.slugchain.slice(0,len-1)
			}

		this.scope='[field:element.type['+this.filepart+']]'
		this.style='{"color":{"border":"'+this.randomRGBA()+'","background":"'+this.randomRGBA()+'"}}'
	}

	tiddlerdata():string {
		return super.tiddlerdata() +
		"scope: "+this.scope+"\n"+
		"style: "+this.style+"\n";
	}

	randomRGBA():string {
		return 'rgba('
							+Math.round(256*Math.random())+','
							+Math.round(256*Math.random())+','
							+Math.round(256*Math.random())+','
							+Math.round(256*Math.random())+')'
	}

	tiddlerdir():string {
		if(this.dirchain)
			return path.join(this.base.mapNodeTypes,this.dirchain.join("/"))
		else
			return this.base.mapNodeTypes;
	}

	tiddlerfile():string {
		return path.join(this.tiddlerdir(),this.filepart + ".tid")
	}

}

export class EdgeTypeTiddler extends SimpleTiddler  {
	parts:string[]
	slugchain:string[]
	filepart:string
	dirchain?:string[]

	style:string
	constructor(parts:string[],base:TiddlerFileBase) {
		super({
			title:"$:/plugins/felixhayashi/tiddlymap/graph/edgeTypes/"+parts.join("/")
		},base)
		this.parts = parts
		this.slugchain=[]
		const len = this.parts.length
		for(let idx in parts)
			this.slugchain[idx]=slugify(parts[idx])
		if (len == 1) {
			this.filepart = this.slugchain[0]
			this.dirchain = undefined
		}
		else {
			this.filepart = this.slugchain[len-1]
			this.dirchain=this.slugchain.slice(0,len-1)
			}

		this.style='{"color":{"color":"'+this.randomRGBA()+'"},"width":'+Math.round(1+15*Math.random())+'}'

	}

	tiddlerdata():string {
		return super.tiddlerdata() +
		"style: "+this.style+"\n";
	}

	randomRGBA():string {
		return 'rgba('
							+Math.round(256*Math.random())+','
							+Math.round(256*Math.random())+','
							+Math.round(256*Math.random())+','
							+Math.round(256*Math.random())+')'
	}

	tiddlerdir():string {
		if(this.dirchain)
			return path.join(this.base.mapEdgeTypes,this.dirchain.join("/"))
		else
			return this.base.mapEdgeTypes;
	}

	tiddlerfile():string {
		return path.join(this.tiddlerdir(),this.filepart + ".tid")
	}

}

export class SimpleTiddlyMap implements TiddlyMap {
	name:string
	nodes:Set<string>
	edges:Set<string>
	positions:Map<string,Position>

	guid:string
	viewbase:string
	tiddler:string
	edgeFilterFile:string
	nodeFilterFile:string
	layout:string

	edgeFilter:string
	nodeFilter:string
	layoutData:string

	constructor(name:string,base:TiddlerFileBase) {
		this.name = name
		this.nodes = new Set<string>()
		this.edges = new Set<string>()
		this.positions = new Map<string,Position>()

		this.guid = uuid.v4()
		this.viewbase = base.ensurePath(base.mapViews,this.name)
		this.tiddler = path.join(this.viewbase,"tiddler.tid")
		this.edgeFilterFile = path.join(this.viewbase,"edges.tid")
		this.nodeFilterFile = path.join(this.viewbase,"nodes.tid")
		this.layout = path.join(this.viewbase,"layout.tid")

		this.edgeFilter = ''
		for(let e in this.edges) {
			//this.edgeFilter += "[field:tmap.id["+e+"]] "
		}
		this.nodeFilter = ''
		let idx = 0.0
		const radius = 3000
		const ld:any = {}
		this.nodes.forEach((val:string) => {
			this.nodeFilter += "[field:tmap.id["+val+"]] "
			ld[val] = {x:radius*Math.sin(idx),y:radius*Math.cos(idx)}
			idx = idx + (3*Math.random())
		})
		this.layoutData = JSON.stringify(ld,null,3)
	}

	async layoutGraph() {
		const n2 = [] as any[]
	  for(let x in this.nodes) {
	    n2.push({
	      data:x
	    })
	  }
		const e2 = [] as any[]
	  for(let x in this.edges) {
	    e2.push({
	      data:x
	    })
	  }
	  var cy = cytoscape({
	    headless: true,
	    elements: [
	      ...n2,
	      ...e2
	    ]
	  })
	  var layout = cy.elements().layout({
	    name: 'cose'
	  });
	  layout.run();

	  console.log("LAYOUT COMPLETE")
	  for(let x of cy.elements().jsons() ) {
			const elt = JSON.parse(x)
	    console.log("POS:",elt.data.id,elt.position)
	  }
	}

	tiddlerdata():string {
		return ""+
			"id:" + this.guid + "\n" +
			"isview:" + true + "\n" +
			"title: $:/plugins/felixhayashi/tiddlymap/graph/views/" + this.name + "\n" +
			"\n";
	}
	edgedata():string {
		return ""+
			"filter:" + this.edgeFilter + "\n" +
			"title: $:/plugins/felixhayashi/tiddlymap/graph/views/" + this.name + "/filter/edges\n" +
			"\n";
	}
	nodedata():string {
		return ""+
			"type: text/vnd.tiddlywiki" + "\n" +
			"filter:" + this.nodeFilter + "\n" +
			"title: $:/plugins/felixhayashi/tiddlymap/graph/views/" + this.name + "/filter/nodes\n" +
			"\n";
	}
	layoutdata():string {
		return ""+
			"type: text/vnd.tiddlywiki" + "\n" +
			"title: $:/plugins/felixhayashi/tiddlymap/graph/views/" + this.name + "/map\n" +
			"\n" + this.layoutData + "\n";
	}

}
