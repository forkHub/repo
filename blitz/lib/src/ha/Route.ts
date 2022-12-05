namespace ha {
	export class Route {
		static ukuran(obj: ISprite | "teks", w: number = 32, h: number = 32): void {
			if ("teks" == obj) {
				//TODO: ukuran teks
			}
			else {
				ha.Sprite.ukuran(obj as ISprite, w, h);
			}
		}
	}
}