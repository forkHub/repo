export class Keranjang {
    private daftar: IBarang[];

    push(barang: IBarang): void {
        this.daftar.push(barang);
    }
}