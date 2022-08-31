declare namespace ha.comp {
    class BaseComponent {
        protected _template: string;
        protected _elHtml: HTMLElement | null;
        protected _parent: HTMLElement;
        onRender(): void;
        onAttach(): void;
        onBuild(): void;
        onDetach(): void;
        mulai(...params: any[]): void;
        destroy(): void;
        attach(parent: HTMLElement): void;
        detach(): boolean;
        show(el?: HTMLElement): void;
        hide(el?: HTMLElement): void;
        getEl(query: string): HTMLElement;
        build(): void;
        getTemplate(query: string): HTMLElement;
        getElFromDoc(query: string): HTMLElement;
        get elHtml(): HTMLElement;
    }
}
