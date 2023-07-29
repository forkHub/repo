class Note {
    private static readonly daftarNote: INote[] = [];

    static buat(tgl: number, judul: string, isi: string): INote {
        let hasil: INote;

        hasil = {
            id: Id.id,
            tgl: tgl,
            judul: judul,
            isi: isi
        }

        // this.daftarNote.push(hasil);
        return hasil;
    }

    static push(note: INote): void {
        this.daftarNote.push(note);
    }

    static clone(note: INote): INote {
        return {
            id: note.id,
            judul: note.judul,
            isi: note.isi,
            tgl: note.tgl
        }
    }

    static get(id: number): INote {
        let hasil: INote;

        this.daftarNote.forEach((item: INote) => {
            if (item.id == id) {
                hasil = item;
            }
        })

        return hasil;
    }

    static hapus(id: number): void {
        this.daftarNote.forEach((item: INote, idx: number) => {
            if (item.id == id) {
                this.daftarNote.splice(idx, 1);
                return;
            }
        });

        // throw Error('hapus error, id: ' + id);
    }

    static filter(note: INote, teks: string): boolean {
        if (note.judul.indexOf(teks) > -1) return true;
        if (note.isi.indexOf(teks) > -1) return true;
        return false;
    }

    static jml(): number {
        return this.daftarNote.length;
    }

    static hapusSemua(): void {
        while (this.daftarNote.length > 0) {
            this.daftarNote.pop();
        }
    }

    static slice(): INote[] {
        return this.daftarNote.slice();
    }
}