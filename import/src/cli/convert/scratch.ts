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

/*
'organization',
'event',
'working-group',
'project-or-product',
'publication'
*/
async function convert(inbase:string) {

	const ctx = new Context(inbase)

	console.log("Load Me2B");
  await ctx.me2b.load()

	for(let elt of ctx.me2b.findElementsByType("organization")) {
		createAndLinkNodesForListField(elt,"purpose","Purpose")
	}

}

export = (args:string[]) => {

	convert('input').then(()=>{
		console.log("done");
	})
}
