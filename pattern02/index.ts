type TDict = {
    idx: number,
    data: string;
}

let file = "Proceratosaurus is a genus of theropod dinosaur that lived during the Middle Jurassic in what is now England. The holotype and only known specimen (pictured) consists of a mostly complete skull with an accompanying lower jaw and a hyoid bone, found near Minchinhampton, a town in Gloucestershire. It was originally described as a species of Megalosaurus, M. bradleyi, in 1910, but was moved to its own genus in 1926. The genus was named after a supposed close relationship with Ceratosaurus, later shown to be erroneous, due to the presence of an incomplete cranial crest considered to resemble Ceratosaurus's nasal horn. Proceratosaurus is now considered to be one of the oldest members of Tyrannosauroidea (the broader group that includes the tyrannosaurids, including Tyrannosaurus). During the Bathonian age when Proceratosaurus lived, Britain and the rest of Western Europe formed a subtropical island archipelago, with contemporary dinosaurs including stegosaurs, Megalosaurus and Cetiosaurus.";
let list: string[] = [];
let dict: string[] = [];

let ctr = 0;
let jmlAmbil = 2;
let char = '';

while (true) {
    console.group();
    ctr++;
    if (ctr > 100) {
        break;
    }

    char += ambil(jmlAmbil);
    console.log("char", char);

    if (checkAda(char)) {
        if (file.length == 0) {
            console.log("break, file habis");
            break;
        }
        else {
            console.log('tambah char');
            jmlAmbil = 1;
        }
    }
    else {
        list.push(char);
        console.log("file tidak ada");
        if (file.length == 0) {
            console.log("break, file habis");
            break;
        }
        else {
            console.log("file belum habis");
            if (char.length == 2) {
                console.log("len 2");
                char = "";
            }
            else {
                console.log("len > 2");
                console.log("ulangi");
                file = char.charAt(char.length - 1) + file;
                jmlAmbil = 2;
                char = "";
            }
        }
    }
    console.groupEnd();
}
console.log(list);

function ambil(n = 1): string {
    let char = file.slice(0, n);
    file = file.slice(n);
    return char;
}

function push() {

}

function checkAda(char: string): boolean {
    if (list.indexOf(char) >= 0) {
        console.log("char ada di list");
        return true;
    }

    if (file.indexOf(char) >= 0) {
        console.log("char ada di file");
        list.push(char);
        return true;
    }

    return false;
}
