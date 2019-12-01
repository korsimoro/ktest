import { TiddlerFileBase, SimpleTiddlerFileBase } from './tiddly'
import { slugify } from 'slugify'


export class TiddlyModel {

	files:TiddlerFileBase

	constructor(base:string) {
		this.files = new SimpleTiddlerFileBase(base)
	}

	load() {
	}

	slugify(x:string) : string {
		const slug=
			slugify(x, {
				replacement: '.',    // replace spaces with replacement
				//remove: null,        // regex to remove characters
				lower: true,         // result in lower case
			})
		return ''+slug
	}

}
