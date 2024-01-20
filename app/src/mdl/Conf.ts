interface IConf {
    urlBeranda: string,
    urlLogin: string,
    urlAnggotaDaftar: string,
    dev: boolean;
}

class ConfDev implements IConf {
    readonly urlBeranda: string = './index.html';
    readonly urlLogin: string = './login.html';
    readonly urlAnggotaDaftar = './anggota_daftar.html';
    readonly dev: boolean = true;
}

export const conf = new ConfDev();