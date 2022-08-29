import { d } from "./Driver";
import { Skenario } from "./Skenario";

class Auto {

	private s: Skenario = new Skenario();

	async run(): Promise<void> {
		await d.createBrowserChrome();
		await this.s.buatTugas_CheckTugasAda();
	}
}

(new Auto()).run().then(() => {

}).catch((e) => {
	console.debug(e.message);
	console.debug("##################");
	// d.quit();
	// console.error(e);
});