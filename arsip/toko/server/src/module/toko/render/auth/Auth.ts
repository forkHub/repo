import { Daftar } from "./Daftar";
import { GantiPass } from "./GantiPass";
import { Login } from "./Login";
import { Lupa } from "./Lupa";

export class Auth {
	readonly login: Login = new Login();
	readonly lupa: Lupa = new Lupa();
	readonly ganti: GantiPass = new GantiPass();
	readonly daftar: Daftar = new Daftar();
}