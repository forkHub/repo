interface ITombol {
	label: string,
	el?: HTMLButtonElement;
	klik?: (e: MouseEvent) => void;
}