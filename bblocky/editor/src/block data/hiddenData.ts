namespace ha.blockly.hiddenData {
	export const list: TToolBoxBlockDef[] = [];
	export const group = "hidden";
	export const hidden = "true";

	// ha.be.Be.Grafis
	// depecrated
	export const Grafis: TToolBoxBlockDef = {
		type: "ha.be.Be.Grafis",
		perintah: "Graphics",
		message0: "Graphics %1 width: %2 height: %3",
		inputsInline: true,
		args: {
			dummy: '',
			width: 320,
			height: 240
		},
		hidden: 'hidden',
		tooltip: `
            Initialize graphics.
            Use this block as the first block in your appp.
            width: prefered canvas width
            height: prefered canvas height
        `
	};

	list.push(Grafis);
}