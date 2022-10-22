class Kontek {
	private static _modulId: number;	//modul aktif diedit
	private static _fungsiId: number;	//fungsi aktif
	private static _variableId: number;

	public static get variableId(): number {
		return Kontek._variableId;
	}
	public static set variableId(value: number) {
		Kontek._variableId = value;
	}

	public static get fungsiId(): number {
		return Kontek._fungsiId;
	}
	public static set fungsiId(value: number) {
		Kontek._fungsiId = value;
	}

	public static get modulId(): number {
		return Kontek._modulId;
	}
	public static set modulId(value: number) {
		Kontek._modulId = value;
	}

}