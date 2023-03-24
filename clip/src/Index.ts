class Clip {

    private clipLeft: number = 0;
    private clipRight: number = 0;
    private readonly contWidth: number = 4000;
    private vWidth: number = 500;
    private offsetX: number = 200;
    private offsetXMin: number = 200;

    constructor() {
        this.getBtnLeft.onclick = () => {
            this.offsetX -= 100;
            this.update();
        }

        this.getBtnRight.onclick = () => {
            this.offsetX += 100;
            this.update();
        }

        this.getBtnGoto.onclick = () => {
            this.offsetX = this.getTabPosAtIdx(3);
            this.update();
        }
    }

    getTabsTop(): HTMLDivElement {
        return document.body.querySelector(`#cont`);
    }

    get getBtnLeft(): HTMLButtonElement {
        return document.body.querySelector('nav-btn button.prev') as HTMLButtonElement;
    }

    get getBtnRight(): HTMLButtonElement {
        return document.body.querySelector('nav-btn button.next') as HTMLButtonElement;
    }

    get getBtnGoto(): HTMLButtonElement {
        return document.body.querySelector("button.goto");
    }

    get getMaxOffsetX(): number {
        let lastTab: HTMLElement;
        let lastPos: number;
        let width: number;


        lastTab = this.getTabsTop().children.item(this.getTabsTop().children.length - 1) as HTMLElement;
        lastPos = parseInt(lastTab.style.left) || 0;
        width = parseInt(window.getComputedStyle(lastTab).width);
        lastPos += width;
        lastPos -= this.vWidth;
        lastPos += 8;

        // console.log(lastPos);
        // console.log('width ' + width);

        return lastPos;
    }

    getArrowCont(): HTMLElement {
        return document.body.querySelector('nav-button');
    }

    getTabPosAtIdx(i: number): number {
        let el: HTMLElement = this.getTabsTop().children.item(i) as HTMLElement;
        return parseInt(window.getComputedStyle(el).left);
    }

    update(): void {
        console.log('update');

        //update arrow btn

        this.getBtnRight.disabled = false;
        this.getBtnLeft.disabled = false;

        if (this.offsetX <= this.offsetXMin) {
            this.offsetX = this.offsetXMin;
            this.getBtnLeft.disabled = true;
        }

        if (this.offsetX >= this.getMaxOffsetX) {
            this.offsetX = this.getMaxOffsetX;
            this.getBtnRight.disabled = true;
        }

        //calculate inset
        this.getTabsTop().style.width = this.contWidth + 'px';

        this.clipRight = (this.contWidth - this.vWidth) - this.offsetX;
        this.clipLeft = this.offsetX;

        let clipPath = `inset(0px ${this.clipRight}px 0px ${this.clipLeft}px)`;

        this.getTabsTop().style.clipPath = clipPath;
        this.getTabsTop().style.left = (-this.offsetX + this.offsetXMin) + 'px';
    }

}
const clip: Clip = new Clip();
clip.update();
