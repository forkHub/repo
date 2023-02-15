class datam {
    static getById(data, id) {
        if (data.id == id)
            return data;
        for (let i = 0; data.subModul.length; i++) {
            let hasil = datam.getById(data.subModul[i], id);
            if (hasil)
                return hasil;
            for (let i = 0; data.variabel.length; i++) {
                let variabel = data.variabel[i];
                if (variabel.id == id)
                    return variabel;
            }
        }
        return null;
    }
}
