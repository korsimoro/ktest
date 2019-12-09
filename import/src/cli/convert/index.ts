import { Context } from '../../context'
import { createNodeTiddlerFromKumuElement,createNodeTiddlerFromMe2BElement } from './create-node-tiddler'

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

function linkProductsAndProjectsToOrganizations(ctx:Context) {
}
function linkPublicationsToOrganizations(ctx:Context) {
}
function linkWorkingGroupsToOrganizations(ctx:Context) {
}
function linkOrganizationsToOrganizations(ctx:Context) {
}
function linkOrganizationsToPeople(ctx:Context) {
}
function linkPublicationsToAuthors(ctx:Context) {
}
function createMe2BStar(ctx:Context) {
}

function analyzeMe2BDataToCreateGraphs(ctx:Context) {
	linkProductsAndProjectsToOrganizations(ctx)
	linkPublicationsToOrganizations(ctx)
	linkWorkingGroupsToOrganizations(ctx)
	linkOrganizationsToOrganizations(ctx)
	linkOrganizationsToPeople(ctx)
	linkPublicationsToAuthors(ctx)
	createMe2BStar(ctx)
}
async function convert(inbase:string) {

	const ctx = new Context(inbase)

	console.log("Load Kumu");
	await ctx.kumu.load()

	console.log("Load Me2B");
  await ctx.me2b.load()

	//console.log("Load Tiddly");
	//await ctx.tiddly.load()

	console.log("Convert Kumu Elements -> Tiddlers");
	for(let slug in ctx.kumu.elements) {
		createNodeTiddlerFromKumuElement(ctx.kumu.elements[slug],ctx)
	}

	console.log("Convert Kumu Connection Types -> Edge Type Tiddlers");
	for(let slug in ctx.kumu.connectionTypes) {
		const type = ctx.kumu.connectionTypes[slug]
		ctx.tiddly.createEdgeTypeTiddler(type.parts)
	}

	console.log("Convert Kumu Element Types -> Node Type Tiddlers");
	for(let slug in ctx.kumu.elementTypes) {
		const type = ctx.kumu.elementTypes[slug]
		ctx.tiddly.createNodeTypeTiddler(type.parts)
	}

	console.log("Convert Me2B Elements -> Tiddlers");
	for(let slug in ctx.me2b.elements) {
		createNodeTiddlerFromMe2BElement(ctx.me2b.elements[slug],ctx)
	}
	analyzeMe2BDataToCreateGraphs(ctx)

	console.log("Writing Tiddlers");
	await ctx.tiddly.save()

	/*
	const e=[] as any[]
	//const n=[] as any[]
	await buildGraph(nodes,e)
	*/

}

export = (args:string[]) => {

	console.log("start, args=",args);
	convert('input').then(()=>{
		console.log("done");
	})
}
