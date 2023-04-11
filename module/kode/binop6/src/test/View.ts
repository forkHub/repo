
let view = {
    el: {},
    template: `
        <div class='dialog'>
            <span class='test'></span>
            <button>test</button>
        </div>
    `,
    tombol: (): HTMLButtonElement => {
        return ha.comp.Util.getEl('button', view.el as HTMLElement) as HTMLButtonElement;
    }
}

view.el = ha.comp.Util.createEl(view.template) as HTMLElement;
view.tombol().onclick = () => {
    console.log('tombol on click');
}
document.body.appendChild(view.el as HTMLElement);

