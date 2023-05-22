import { BerandaCont } from "./BerandaCont";
import { Dao } from "./dao/Dao";
import { Entity } from "./ent/Ent";
import { HalProfile } from "./HalProfile";
import { HalSilsilah } from "./HalSilsilah";
import { Router } from "./Router";

class SM {
	readonly router: Router = new Router()
	readonly dao: Dao = new Dao();
	readonly ent: Entity = new Entity();

	readonly halSilsilah: HalSilsilah = new HalSilsilah();
	readonly halProfile: HalProfile = new HalProfile();

	readonly berandaCont: BerandaCont = new BerandaCont();
}

export var sm: SM = new SM();