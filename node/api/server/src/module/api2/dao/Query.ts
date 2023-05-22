class Query {
    readonly selectAnggota: string = `			
            SELECT *
			FROM sl_anggota
    `;
}
export var queryObj: Query = new Query();
