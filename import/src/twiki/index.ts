import slugify from 'slugify'
import fs from 'fs-extra'
import { Context } from '../context'
import { NodeTiddler,TiddlerData,SimpleNodeTiddler } from './tiddlers'
import { EdgeTypeTiddler,NodeTypeTiddler } from './tiddlymap'

export type tiddlydate = number;

export const TIDDLERTYPE="text/vnd.tiddlywiki"

export class TiddlyModel {

	ctx:Context
	path:string
	nodesPath:string
	nodes:NodeTiddler[]
	mapViews:string
	mapEdgeTypes:string
	mapNodeTypes:string
	system:string
	templates:string

	constructor(path:string,ctx:Context) {
		this.ctx = ctx
		this.path = this.ensurePath(path)
		this.nodesPath = this.ensurePath(path,"nodes")
		this.system = this.ensurePath(path,"system")
		this.templates = this.ensurePath(path,"templates")
		const mapsDir=this.ensurePath(path,"maps")
		this.mapViews = this.ensurePath(mapsDir,"views")
		this.mapEdgeTypes = this.ensurePath(mapsDir,"edgeTypes")
		this.mapNodeTypes = this.ensurePath(mapsDir,"nodeTypes")
		this.nodes = []
	}

	load() {
	}

	async save() {
		for(let node of this.nodes) {
			const dir = node.tiddlerdir()
			const path = node.tiddlerfile()
			const data = node.tiddlerdata()
			await this.ensurePath(dir)
			console.log("Writing Tiddler:",path)
			await fs.writeFile(path,data)
		}
	}
	
	slugify(x:string) : string {
		const slug=
			slugify(x, {
				replacement: '.',    // replace spaces with replacement
				//remove: null,        // regex to remove characters
				lower: true,         // result in lower case
			})
		return ''+slug
	}

	ensurePath(base:string,dir?:string):string {
		// make sure this exists
		let path = base;
		if (dir)
			path = base + "/" + dir
		fs.ensureDirSync(path)
		return path
	}

	createNodeTiddler(data:TiddlerData):NodeTiddler {
		const result = new SimpleNodeTiddler(data,this)
		//console.log("Node Tiddler:",result.tiddlerfile())
		this.nodes.push(result)
		return result
	}
	createEdgeTypeTiddler(parts:string[]):EdgeTypeTiddler {
		const result = new EdgeTypeTiddler(parts,this)
		return result
	}
	createNodeTypeTiddler(parts:string[]):NodeTypeTiddler {
		const result = new NodeTypeTiddler(parts,this)
		return result
	}

}
