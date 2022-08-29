import { By } from "selenium-webdriver";
import { data, Hal } from "./Data";
import { d } from "./Driver";
import { step } from "./Step";

export class Skenario {

	async skenarioAwalSampaiAkhir(): Promise<void> {
		await step.reset();
		await d.navigate(data.urlMain);
		await d.click(By.css(Hal.halDepan.daftarTugas));
		await d.click(By.css(Hal.halDaftarTugas.tambah));

		//buat tugas
		console.log(">> BUAT TUGAS");
		await d.sendKeys(By.css(Hal.tugasBaru.judul), data.tugas.awal.judul);
		await d.sendKeys(By.css(Hal.tugasBaru.deskripsi), data.tugas.awal.isi);
		await d.click(By.css(Hal.tugasBaru.petugas.pertama));
		await d.click(By.css(Hal.tugasBaru.simpanTbl));
		await d.checkTeks(By.css(Hal.comp.dialog.judul), 'data berhasil disimpan');
		await d.click(By.css(Hal.comp.dialog.okTbl));

		//check tugas ada di daftar tugas
		console.log(">> CHECK TUGAS DI DAFTAR TUGAS");
		await d.checkTeks(By.css(Hal.halDaftarTugas.list.pertama.judul), data.tugas.awal.judul);

		await d.click(By.css(Hal.halDaftarTugas.status));

		//check tugas ada di aktifitas
		console.log(">> CHECK TUGAS DI AKTIFITAS");
		await d.checkTeks(By.css(Hal.halDepan.aktifitas.pertama.el), data.halDepan.judul.awal);

		await d.click(By.css(Hal.halDepan.aktifitas.pertama.el));
		await d.click(By.css(Hal.halLihatTugas.editTbl));

		//edit tugas
		console.log(">> EDIT TUGAS");
		await d.sendKeys(By.css(Hal.halEditTugas.judul), data.tugas.edit.judul);
		await d.sendKeys(By.css(Hal.halEditTugas.deskripsi), data.tugas.edit.isi);
		await d.click(By.css(Hal.halEditTugas.petugas.kedua));
		await d.click(By.css(Hal.halEditTugas.simpanTbl));
		await d.checkTeks(By.css(Hal.comp.dialog.judul), 'data berhasil dirubah');
		await d.click(By.css(Hal.comp.dialog.okTbl));

		await d.click(By.css(Hal.halEditTugas.nav.daftarTugasLink));
		await d.click(By.css(Hal.halDaftarTugas.status));

		//check tugas berubah di aktifitas
		console.log(">> CHECK TUGAS BERUBAH DI AKTIFITAS");
		await d.checkTeks(By.css(Hal.halDepan.aktifitas.pertama.el), data.halDepan.judul.edit);

		await d.click(By.css(Hal.halDepan.daftarTugas))

		//check tugas berubah di daftar tugas
		console.log(">> CHECK TUGAS BERUBAH DI DAFTAR TUGAS");
		await d.checkTeks(By.css(Hal.halDaftarTugas.list.pertama.judul), data.tugas.edit.judul);

		// await d.quit();
	}

	async buatTugas_CheckTugasAda(): Promise<void> {
		await step.reset();
		await step.logout();
		await step.buatTugas(data.tugas.awal.judul, data.tugas.awal.isi);
		await step.checkTugasAda(data.tugas.awal.judul);
	}

	async skenarioCheckNav(): Promise<void> {

	}

}

