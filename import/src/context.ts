
import { KumuModel } from './kumu'
import { Me2BModel } from './me2b'
import { TiddlyModel } from './twiki'


export interface Context {
	kumu:KumuModel
	me2b:Me2BModel
	tiddly:TiddlyModel
	schemas:any
}
