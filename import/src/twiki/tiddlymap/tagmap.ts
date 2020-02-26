import { TiddlyModel , NodeTiddler} from '..'
import { TiddlyMap } from '.'
import fs from 'fs-extra'
import uuid from 'uuid'
import path from 'path'
import cytoscape from 'cytoscape'

export class TagMap implements TiddlyMap {
	model:TiddlyModel
	name:string
	description:string
	nodes:Set<string>
	edges:Set<string>
	positions:Map<string,Position>
	edgeFilter:string
	nodeFilter:string
	layoutData:string

	guid:string
	viewbase:string
	tiddlerFile:string
	layoutFile:string
	edgeFilterFile:string
	nodeFilterFile:string

	constructor(elt:NodeTiddler,base:TiddlyModel,fields:string[]) {
		this.model = base
		this.name = elt.title
		this.nodes = new Set<string>()
		this.edges = new Set<string>()
		this.positions = new Map<string,Position>()
		this.description = ''

		this.guid = uuid.v4()
		//this.viewbase = base.ensurePath(path.join(base.mapViews,'neighbors'),this.name)
		this.viewbase = base.ensurePath(elt.tiddlerdir())
		this.tiddlerFile = path.join(this.viewbase,"map-definition.tid")
		this.edgeFilterFile = path.join(this.viewbase,"map-edges.tid")
		this.nodeFilterFile = path.join(this.viewbase,"map-nodes.tid")
		this.layoutFile = path.join(this.viewbase,"map-layout.tid")

		const ld:any = {}
		this.edgeFilter = ' -[prefix[_]] -[[tw-body:link]] -[[tw-list:tags]] -[[tw-list:list]]'
		this.nodeFilter = ''
		for(let f of fields) {
			this.nodeFilter = this.nodeFilter+'[['+elt.title+']listed['+f+']] '
		}
		this.layoutData = JSON.stringify(ld,null,3)

		this.nodes.add(elt.guid)
	}

	async layoutGraph() {
		const n2 = [] as any[]
	  for(let x in this.nodes) {
			const node = this.model.nodeMap[x]
	    n2.push({
	      data:node
	    })
			console.log("Process Edgemap",node.edgemap)
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

	async save() {

		//console.log("Writing Neighbor View Tiddler File:",this.tiddlerFile)
		await fs.writeFile(this.tiddlerFile,this.tiddlerdata())

		//console.log("Writing Neighbor View Tiddler File:",this.edgeFilterFile)
		await fs.writeFile(this.edgeFilterFile,this.edgedata())

		console.log("Writing TagMap View Tiddler File:",this.nodeFilterFile)
		await fs.writeFile(this.nodeFilterFile,this.nodedata())

		//console.log("Writing Neighbor View Tiddler File:",this.layoutFile)
		await fs.writeFile(this.layoutFile,this.layoutdata())

	}

	tiddlerdata():string {
		const physics = {
	    forceAtlas2Based: {
	      // <- more repulsion between nodes - 0 - more attraction between nodes ->
	      gravitationalConstant: -1250, // default: -50
	      // edge length
	      springLength: 650, // default: 100
	      // <- less stiff edges - 0 - stiffer edges ->
	      springConstant: 0.05, // default: 0.08
	      // pulls the entire network back to the center.
	      centralGravity: 0.01, // default: 0.01
	      // kinetic energy reduction
	      damping: 0.4
	    },
	    solver: 'forceAtlas2Based',
	    stabilization: {
	      enabled: false,
	      iterations: 1000,
	      updateInterval: 10,
	      onlyDynamicEdges: false,
	      fit: true
	    }
	  }

		return ""+
			"id:" + this.guid + "\n" +
			"config.vis: "+JSON.stringify(physics) + "\n" +
			"config.neighbourhood_scope: 2\n"+
			"config.show_inter_neighbour_edges: true\n"+
			"isview:" + false + "\n" +
			"title: $:/plugins/felixhayashi/tiddlymap/graph/views/" + this.name + "\n" +
			"tmap.type: tag\n" +
			"\n" + this.description + "\n";
	}
	edgedata():string {
		return ""+
			"filter:" + this.edgeFilter + "\n" +
			"title: $:/plugins/felixhayashi/tiddlymap/graph/views/" + this.name + "/filter/edges\n" +
			"\n";
	}
	nodedata():string {
		console.log("TAGMAP:",this.nodeFilter)
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
