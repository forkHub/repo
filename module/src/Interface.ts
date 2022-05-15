interface ISession {
    modulDipilih: IItem;
}

interface IItem {
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
    view?: ha.comp.BaseComponent
}

interface IMenu {
    nama: string,
    kontek: string,
    klik: Function,
    view: HTMLButtonElement
}