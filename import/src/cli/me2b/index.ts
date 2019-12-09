import { Context } from '../../context'

async function go(args:string[]) {

	const ctx = new Context('input')

	console.log("Load Me2B");
  await ctx.me2b.load()

	if(args.length == 0) {

	}
	else {
		switch(args[0]) {
			case 'types':
				const types = new Set<string>()
				const subtypes = new Set<string>()
				for(let key in ctx.me2b.elementGuidMap) {
					const e = ctx.me2b.elementGuidMap[key]
					types.add(e.type)
					subtypes.add(e.subtype)
				}
				console.log(types)
				console.log(subtypes)
				break;

			case 'pop-org':
				const pap = ctx.me2b.findElementsByType("project-or-product")
				for(let p of pap) {
					const org = p.fields['parent.org']
					if(!org) {
						console.log("Org missing",p.title)
					}
					else {
						const elt = ctx.me2b.locateElementByLabel(org)
						if(elt)
							console.log(p.title,org,elt)
					}
				}
				break

			case 'list':
				const lst = ctx.me2b.findElementsByType(args[1])
				lst.sort((a, b) => a.title.localeCompare(b.title))
				for(let p of lst) {
					console.log(p.title,"=>",ctx.me2b.slugify(p.title))
				}
				break
			default:
				console.log("Unknown",args[0])
		}
	}

}

export = (args:string[]) => {

	go(args).then(()=>{
	})
}
