import { Context } from '../../context'

async function load(inbase:string) {

	const ctx = new Context(inbase)

	console.log("Load Kumu");
	await ctx.kumu.load()

	console.log("Load Me2B");
  await ctx.me2b.load()

	console.log("Load Tiddly");
	await ctx.tiddly.load()

}

export = (args:string[]) => {

	console.log("start, args=",args);
	load('input').then(()=>{
		console.log("done");
	})
}
