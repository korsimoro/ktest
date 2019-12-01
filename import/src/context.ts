
import { KumuModel } from './kumu'
import { Me2BModel } from './me2b'
import { TiddlyModel } from './twiki'
import { schemas } from 'twiki-schema'

import path from 'path'

export class Context {
	kumu:KumuModel
	me2b:Me2BModel
	tiddly:TiddlyModel
	schemas:any

	constructor(inbase:string)
	{
		this.kumu = new KumuModel(path.join(inbase,'kumu'),this)

		this.me2b = new Me2BModel(path.join(inbase,'me2b'),this)

		this.tiddly = new TiddlyModel(path.join(inbase,'tiddly'),this)

		this.schemas = schemas
	}
}
