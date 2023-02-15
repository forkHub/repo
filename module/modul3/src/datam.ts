class datam {
    static getById(data: IModul, id: number): IEntity {
        if (data.id == id) return data;

        for (let i: number = 0; data.subModul.length; i++) {

            let hasil: IEntity = datam.getById(data.subModul[i], id);

            if (hasil) return hasil;

            for (let i: number = 0; data.variabel.length; i++) {
                let variabel: IVariable = data.variabel[i];
                if (variabel.id == id) return variabel;
            }

        }

        return null;
    }


}