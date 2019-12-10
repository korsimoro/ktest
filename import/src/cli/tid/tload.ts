import { Context } from '../../context'

async function load(inbase:string) {

	const ctx = new Context(inbase)

	await ctx.tiddly.load()

}

export = (args:string[]) => {

	load('tload').then(()=>{
		console.log("done");
	})
}
