import fs from 'fs-extra'
import uuid from 'uuid'
import slugify from 'slugify'
import path from 'path'
import cytoscape from 'cytoscape'

import { tiddlydate, TIDDLERTYPE, TiddlyModel } from '.'
import { TiddlerData,NodeTiddler,SimpleTiddler,SimpleNodeTiddler } from './tiddlers'

export interface TiddlerPosition {
	x:number
	y:number
}

export interface TiddlyMap {
	model:TiddlyModel
	name:string
	nodes:Set<string>
	edges:Set<string>
	positions:Map<string,Position>

	layoutGraph:() => void
}

export * from './edge-type'
export * from './node-type'
export * from './simple-map'
