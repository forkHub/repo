import webdriver, { Capabilities, Locator, WebElementPromise } from 'selenium-webdriver';

class WebdriverWrapper {
	private until = webdriver.until;
	private _driver: webdriver.WebDriver;
	public get driver(): webdriver.WebDriver {
		return this._driver;
	}

	private _driverList: Array<webdriver.WebDriver> = [];
	public get driverList(): Array<webdriver.WebDriver> {
		return this._driverList;
	}
	private _lastEl: webdriver.WebElement;

	constructor() {

	}

	async createBrowserChrome(): Promise<void> {
		this._driver = await (new webdriver.Builder()
			.forBrowser('chrome')
			.withCapabilities(Capabilities.chrome().set("acceptInsecureCerts", true).setAlertBehavior('dismiss')))
			.build();

		console.debug('# create browser chrome');
		console.debug("# this driver " + this.driver);

		this.driverList.push(this._driver);
	}

	async createBrowserFirefox(): Promise<void> {
		this._driver = await (new webdriver.Builder()
			.forBrowser('firefox')
			.withCapabilities(Capabilities.firefox().set("acceptInsecureCerts", true).setAlertBehavior('dismiss'))
			.build());

		this.driverList.push(this.driver);
	}

	async getTeks(l: Locator): Promise<string> {
		await this.jeda();

		console.debug("# get teks " + l);

		let el: WebElementPromise = (this.driver).findElement(l);
		let teksEl: string = await (await el).getText();

		return teksEl;
	}

	async checkTeksTidakSama(l: Locator, teks: string): Promise<void> {
		try {
			await this.checkTeks(l, teks);
		}
		catch (e) {
			return;
		}

		throw Error('Teks Sama: el ' + (await this.getTeks(l)) + '/teks tes ' + teks);
	}

	async checkTeks(l: Locator, teks: string): Promise<void> {
		let teksEl: string = await this.getTeks(l);

		console.debug("# check teks: " + teks);

		await this.jeda(1000);

		if (teksEl.toLowerCase() == teks.toLowerCase()) {
			return;
		} else {
			console.debug('# Error: ')
			console.debug('#########')
			throw Error('teksEl: ' + teksEl + '/teks: ' + teks);
		}
	}

	getCurrentDriver(): webdriver.WebDriver {
		return this.driver;
	}

	switchDriverByIdx(idx: number): void {
		this._driver = this.driverList[idx];

		console.log("swicht driver, idx " + idx + "/total " + this.driverList.length);
	}

	async jeda(n: number = 1000, debug: boolean = false): Promise<void> {
		if (debug) {
			console.log("# delay, n: " + n);
		}

		return new Promise<void>((resolve, _reject) => {
			setTimeout(() => {
				// let _date: Date = new Date();
				resolve();
			}, n);
		});
	}

	async switchTo(idx: number): Promise<void> {
		await this.driver.switchTo().frame(idx);
	}

	async navigate(url: string): Promise<void> {
		console.debug("# navigate " + url);
		await this.jeda(1000);
		await this.driver.get(url).catch((e) => {
			console.log('navigate error');
			console.log(e);
		})
	}

	async checkElementTidakAda(l: Locator): Promise<void> {
		try {
			await this.waitElement(l, 2000)
		}
		catch (e) {
			return;
		}

		throw Error('Element ditemukan: ' + l.toString());
	}


	async sendKeys(locator: webdriver.Locator, str: string): Promise<void> {
		await this.jeda(1000);
		await this.waitElement(locator, 1000);
		console.debug("# send keys, loc " + locator + "/str " + str);
		await (await (await this.driver).findElement(locator)).clear();
		await this.driver.findElement(locator).sendKeys(str);
	}

	async waitElementInvisible(locator: webdriver.Locator, timeOut: number): Promise<any> {
		console.log("wait elemetn invisible");
		let el: any = await this.driver.wait(this.until.elementLocated(locator), timeOut);
		await this.driver.wait(this.until.elementIsNotVisible(el), timeOut);
	}

	async waitElementEnable(locator: webdriver.Locator, timeOut: number): Promise<any> {
		let el: any = await this.driver.wait(this.until.elementsLocated(locator), timeOut);
		await this.driver.wait(this.until.elementIsEnabled(el[0]));
	}

	async waitElementVisible(locator: webdriver.Locator, timeOut: number): Promise<any> {
		let el: any = await this.driver.wait(this.until.elementsLocated(locator), timeOut);
		await this.driver.wait(this.until.elementIsVisible(el[0]), timeOut);
	}

	async waitElement(locator: webdriver.Locator, timeOut: number): Promise<any> {
		console.log("# tunggu element, locator " + locator);
		await (await this.driver).wait(this.until.elementsLocated(locator), timeOut);
	}

	async click(locator: webdriver.Locator): Promise<void> {
		console.log("# click, locator : " + locator);
		await this.jeda(1000);
		await (await (this.driver).findElement(locator)).click();
	}

	async quit(): Promise<void> {
		console.log("quit " + this.driver);
		await (await this.driver).quit();
	}

	public get lastEl(): webdriver.WebElement {
		return this._lastEl;
	}

}

export var d: WebdriverWrapper = new WebdriverWrapper();