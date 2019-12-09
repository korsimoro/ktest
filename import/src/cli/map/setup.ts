import { Context } from '../../context'
import { SimpleTiddlyMap, TiddlyMap, NodeTiddler } from '../../twiki'

async function run(inbase:string,title:string) {

	const ctx = new Context(inbase)
	const map = new SimpleTiddlyMap(title,ctx.tiddly)
	map.nodeFilter = '[contains:tmap.names['+title+']]'
	map.edgeFilter = '[all[tiddlers]]'
	await map.save()

}


export = (args:string[]) => {

	if(args.length==0) {
		console.log("map <name>")
	}
	else {
		run('output',args[0]).then(()=>{
			console.log("done")
		})
	}
}
