import { Context } from '../../context'
import { NodeTiddler } from '../../twiki/tiddlers'
import { SimpleTiddlyMap, TiddlyMap } from '../../twiki/tiddlymap'

async function load(inbase:string) {

	const ctx = new Context(inbase)

	/*
	console.log("Load Kumu");
	await ctx.kumu.load()

	console.log("Load Me2B");
  await ctx.me2b.load()
	*/

	console.log("Load Tiddly");
	await ctx.tiddly.load()

	return ctx
}
const mapOfMaps = {
	'all':{
		title:"Everything",
		include:(x:NodeTiddler) => true
	},
	'me2b':{
		title:"Me2B Relationships",
		include:(x:NodeTiddler) => {}
	},
	'xyz':{
		title:"Everything",
		include:(x:NodeTiddler) => true
	},
	'pbase':{}
}

function buildMap(ctx:Context,mapdef:any) {

	const map = new SimpleTiddlyMap(mapdef.title,ctx.tiddly)

}


export = (args:string[]) => {

	if(args.length==0) {
		console.log("map <name>")
	}
	else {
		load('input').then((ctx:Context)=>{
			const mapName = ctx.kumu.slugify(args[0])
			const mapdef = mapOfMaps[mapName]
			if(!mapdef) {
				console.log("unknown map:",mapName)
				buildMap(ctx,mapdef)
			}
			else {
				console.log("done");
			}
		})
	}
}
