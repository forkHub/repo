interface ISession {
	idDipilih: string;
	daftarModul: IModul[];
	daftarVar: IVar[];
	daftarFungsi: IFungsi[];
}

interface IItem {
	id: string,
	modul: string,
	nama: string,
	tipe: string,
}

interface IModul extends IItem {
	tipe: "modul"
	view?: ha.modul.ItemView
}

//
interface IVar extends IItem {
	view?: ha.modul.ItemView
}

interface IParam extends IItem {

}

interface IFungsi extends IItem {
	// param:IParam[];
	tipeReturn?: string;
}

interface IMenu {
	nama: string,
	kontek: string,
	klik: Function,
	view: HTMLButtonElement
}