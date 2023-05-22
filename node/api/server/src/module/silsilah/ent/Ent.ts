import { Anggota } from "./Anggota";
import { Kerabat } from "./Kerabat";

export class Entity {
	readonly anggota: Anggota = new Anggota();
	readonly kerabat: Kerabat = new Kerabat();
}