import { cont } from "./controller/Controller";
import { Dao } from "./dao/Dao";
import { Kons } from "./Kons";
import { Renderer } from "./render/Renderer";
import { Router } from "./Router";

class AppToko {
	readonly cont = cont;
	readonly render: Renderer = new Renderer();
	readonly dao: Dao = new Dao();
	readonly router: Router = new Router();
	readonly kons: Kons = new Kons();

	constructor() {
		// console.log('app toko constructor');
	}

}

export var toko: AppToko = new AppToko();