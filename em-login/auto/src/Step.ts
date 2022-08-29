import { By } from "selenium-webdriver";
import { data, Hal } from "./Data";
import { d } from "./Driver";
import { configDB } from "./share/ConfigDB";

class Step {
	async reset(): Promise<void> {
		await d.navigate(data.urlHapus + configDB.admin.pass);
	}

	async buatTugas(judul: string, isi: string): Promise<void> {
		await d.navigate(data.urlMain);
		await this.isiLogin('test', 'test');
		await d.click(By.css(Hal.halDepan.daftarTugas));
		await d.click(By.css(Hal.halDaftarTugas.tambah));

		//halaman tugas
		await d.sendKeys(By.css(Hal.tugasBaru.judul), judul);
		await d.sendKeys(By.css(Hal.tugasBaru.deskripsi), isi);
		await d.click(By.css(Hal.tugasBaru.petugas.pertama));
		await d.click(By.css(Hal.tugasBaru.simpanTbl));
		await d.checkTeks(By.css(Hal.comp.dialog.judul), 'data berhasil disimpan');
		await d.click(By.css(Hal.comp.dialog.okTbl));
	}

	async checkTugasAda(judul: string): Promise<void> {
		console.log(">> CHECK TUGAS DI DAFTAR TUGAS");
		await d.navigate(data.urlMain);
		await d.click(By.css(Hal.halDepan.daftarTugas));

		//check tugas ada di daftar tugas
		await d.checkTeks(By.css(Hal.halDaftarTugas.list.pertama.judul), judul);
	}

	async isiLogin(user: string, pass: string): Promise<void> {
		await d.sendKeys(By.css(Hal.halLogin.user), user);
		await d.sendKeys(By.css(Hal.halLogin.pass), pass);
		await d.click(By.css(Hal.halLogin.btnLogin));
	}

	async logout(): Promise<void> {
		await d.navigate(data.urlLogout);
	}

}

export var step: Step = new Step();