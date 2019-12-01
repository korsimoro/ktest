import fs from 'fs-extra'
import { schemas } from 'twiki-schema'

import { KumuModel,KumuElement } from '../kumu'
import { TiddlerFileBase,NodeTiddler } from '../tiddly'

import { KumuConnectionType,KumuElementType } from '../kumu'
import { EdgeTypeTiddler,NodeTypeTiddler } from '../tiddly'

import { TiddlyMap,SimpleTiddlyMap,TiddlerViewFiles } from '../tiddly'

import { Context } from '../context'


import { createNodeTiddlerFromKumuElement,createNodeTiddlerFromMe2BElement } from './create-node-tiddler'


async function convert(eltfile:string,connfile:string,filebase:string) {

	console.log("Load Kumu");
	const kumu = await kumuloader(eltfile,connfile)

	console.log("Load Me2B");
	const me2b = new Me2BModel('input')
	await me2b.load()

	console.log("Load Tiddly");
	const tiddly = await tiddlyloader(filebase)

	const ctx:Context = { kumu,me2b,tiddly,schemas }

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
/*
	console.log("Writing Tiddlers");
	for(let node of nodes) {
		const dir = node.tiddlerdir()
		const path = node.tiddlerfile()
		const data = node.tiddlerdata()
		await tiddly.ensurePath(dir)
		console.log("Writing Tiddler:",path)
		await fs.writeFile(path,data)
	}
*/
	const e=[] as any[]
	//const n=[] as any[]
	await buildGraph(nodes,e)
}

export = (args:string[]) => {

	console.log("start, args=",args);
	convert('elements.json','connections.json','output').then(()=>{
		console.log("done");
	})
}
