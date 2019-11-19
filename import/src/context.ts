
import { KumuModel } from './kumu'
import { Me2BModel } from './me2b'
import { TiddlerFileBase } from './tiddly'


export interface Context {
	kumu:KumuModel
	me2b:Me2BModel
	tiddly:TiddlerFileBase
	schemas:any
}
