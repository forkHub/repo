class Kontek {
	private static _modulId: number;	//modul aktif diedit

	public static get modulId(): number {
		return Kontek._modulId;
	}
	public static set modulId(value: number) {
		Kontek._modulId = value;
	}

}