import fs from 'fs-extra'
import uuid from 'uuid'
import slugify from 'slugify'
import path from 'path'

export type tiddlydate = number;

export const TIDDLERTYPE="text/vnd.tiddlywiki"
import { TiddlerData,NodeTiddler,SimpleNodeTiddler } from './tiddlers'
import { EdgeTypeTiddler,NodeTypeTiddler } from './tiddlymap'

export interface TiddlerFileBase {
	path:string
	nodes:string
	mapViews:string
	mapEdgeTypes:string
	mapNodeTypes:string
	system:string
	templates:string
	createNodeTiddler:(data:TiddlerData) => NodeTiddler
	createEdgeTypeTiddler:(parts:string[]) => EdgeTypeTiddler
	createNodeTypeTiddler:(parts:string[]) => NodeTypeTiddler
	ensurePath:(base:string,dir?:string) => string
}



// --------------------------------------------------------------------------
export class SimpleTiddlerFileBase implements TiddlerFileBase {
	path:string
	system:string
	templates:string
	nodes:string
	mapViews:string
	mapEdgeTypes:string
	mapNodeTypes:string

	ensurePath(base:string,dir?:string):string {
		// make sure this exists
		let path = base;
		if (dir)
			path = base + "/" + dir
		fs.ensureDirSync(path)
		return path
	}

	constructor(path:string) {
		this.path = this.ensurePath(path)
		this.nodes = this.ensurePath(path,"nodes")
		this.system = this.ensurePath(path,"system")
		this.templates = this.ensurePath(path,"templates")
		const mapsDir=this.ensurePath(path,"maps")
		this.mapViews = this.ensurePath(mapsDir,"views")
		this.mapEdgeTypes = this.ensurePath(mapsDir,"edgeTypes")
		this.mapNodeTypes = this.ensurePath(mapsDir,"nodeTypes")
	}

	createNodeTiddler(data:TiddlerData):NodeTiddler {
		const result = new SimpleNodeTiddler(data,this)
		//console.log("Node Tiddler:",result.tiddlerfile())
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
