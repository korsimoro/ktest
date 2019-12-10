import { Context } from '../../context'

async function load(inbase:string) {

	const ctx = new Context(inbase)

	console.log("Load Tiddly");
	await ctx.tiddly.load()

	console.log("Save Tiddly");
	await ctx.tiddly.save()

}

export = (args:string[]) => {

	load('input').then(()=>{
		console.log("done");
	})
}
