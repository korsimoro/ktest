import fs from 'fs-extra'
import path from 'path'

import { schemas } from 'twiki-schema'

import { KumuModel } from '../kumu'
import { Me2BModel } from '../me2b'
import { TiddlyModel } from '../twiki'
import { Context } from '../context'

/*
import { TiddlerFileBase,NodeTiddler } from '../tiddly'

import { KumuConnectionType,KumuElementType } from '../kumu'
import { EdgeTypeTiddler,NodeTypeTiddler } from '../tiddly'

import { TiddlyMap,SimpleTiddlyMap,TiddlerViewFiles } from '../tiddly'
*/


import { createNodeTiddlerFromKumuElement,createNodeTiddlerFromMe2BElement } from './create-node-tiddler'


async function convert(inbase:string,outbase:string) {

	console.log("Load Kumu");
	const kumu = new KumuModel(path.join(inbase,'kumu'))
	await kumu.load()

	console.log("Load Me2B");
	const me2b = new Me2BModel(path.join(inbase,'me2b'))
	await me2b.load()

	console.log("Load Tiddly");
	const tiddly = new TiddlyModel(path.join(inbase,'tiddly'))
	await tiddly.load()

	const ctx:Context = { kumu,me2b,tiddly,schemas }

/*
	console.log("Convert Kumu Elements -> Tiddlers");
	const nodes:NodeTiddler[] = []
	for(let slug in kumu.elements) {
		const tiddler = createNodeTiddlerFromKumuElement(kumu.elements[slug],ctx)
		nodes.push(tiddler)
	}

	console.log("Convert Me22B Elements -> Tiddlers");
	for(let slug in me2b.elements) {
		const tiddler = createNodeTiddlerFromMe2BElement(me2b.elements[slug],ctx)
		nodes.push(tiddler)
	}

	console.log("Writing Tiddlers");
	for(let node of nodes) {
		const dir = node.tiddlerdir()
		const path = node.tiddlerfile()
		const data = node.tiddlerdata()
		await tiddly.ensurePath(dir)
		console.log("Writing Tiddler:",path)
		await fs.writeFile(path,data)
	}
	const e=[] as any[]
	//const n=[] as any[]
	await buildGraph(nodes,e)
	*/
}

export = (args:string[]) => {

	console.log("start, args=",args);
	convert('input','output').then(()=>{
		console.log("done");
	})
}
