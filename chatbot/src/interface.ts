interface IChat {
    label?: string,
    isi?: string,
    menu?: IMenu[]
    resp?: IMenu[]
    gotoDef?: string[]
}

interface IMenu {
    judul: string,
    goto: string[]
}