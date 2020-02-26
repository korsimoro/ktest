import { Context } from '../../context'
import { createNodeTiddlerFromKumuElement,createNodeTiddlerFromMe2BElement } from './create-node-tiddler'
import {linkProductsAndProjectsToOrganizations, linkPublicationsToOrganizations,
	linkWorkingGroupsToOrganizations, linkOrganizationsToOrganizations,
	linkOrganizationsToPeople, linkPublicationsToAuthors, createMe2BStar }  from '../../me2b/graphitude'
import { createAndLinkNodesForListField } from '../../me2b/metamodel'

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


	console.log("Load Me2B");
  await ctx.me2b.load()
	analyzeMe2BDataToCreateGraphs(ctx)

/*
	for(let elt of ctx.me2b.findElementsByType("organization")) {
		createAndLinkNodesForListField(elt,"activities","Activity")
		createAndLinkNodesForListField(elt,"purpose","Purpose")
		createAndLinkNodesForListField(elt,"tags","Tag")
		createAndLinkNodesForListField(elt,"digital.harms.addressed","Digital Harm")
		createAndLinkNodesForListField(elt,"tech.focus","Tech Focus")
		//createAndLinkNodesForListField(elt,"People","Related Person")
	}
	*/
	/*
	for(let mapname of [
		'pop-to-orgs','all-organizations','pubs-to-orgs','wg-to-orgs','orgs-to-orgs'
	])
		ctx.tiddly.registerNamedMap(mapname)
	*/
	console.log("Convert Me2B Connection Types -> Edge Type Tiddlers");
	console.log("Set=",ctx.me2b.connectionTypes)
	ctx.me2b.connectionTypes.forEach((type) => {
		ctx.tiddly.createEdgeTypeTiddler([type])
	})

	console.log("Convert Me2B Elements -> Tiddlers");
	for(let guid in ctx.me2b.elementGuidMap) {
		createNodeTiddlerFromMe2BElement(ctx.me2b.elementGuidMap[guid],ctx)
	}

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
