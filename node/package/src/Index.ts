import fs from "fs";
import path from "path";

let file: string = 'index.html';
html2Line(file);

function html2Line(file: string): void {
    let fileStr: string = fs.readFileSync(file, "utf-8");
    let baseDir: string = '';
    let content: string = '';
    let config: ICacheFile[] = []

    fileStr = ubahCss(fileStr);
    fileStr = ubahScript(fileStr);
    fs.writeFileSync('output.html', fileStr);

    //ambil css
    function ubahCss(data: string): string {
        let hasil: string = data;

        while (true) {
            console.log('ambil css tag:');
            // console.log(hasil);

            let tag: string = ambilTag(hasil, /<link href=".*>/);
            console.log('tag: ' + tag);

            if (tag != '') {
                let url: string = ambilTag(tag, /".*.css"/).slice(1);
                console.log('url: ' + url);
                url = url.slice(0, url.length - 1);
                console.log('url:' + url);

                content = fs.readFileSync(baseDir + url, 'utf-8');
                content = `\n<!-- ${url} mulai: -->\n <style>\n ${content} \n</style> \n<!-- ${url} selesai -->\n`;
                hasil = hasil.replace(/<link href=".*>/, content);
            }
            else {
                break;
            }
            console.log('/ambil css tag')
        }

        return hasil;
    };

    function ambilTag(src: string, reg: RegExp): string {
        let regHasil: RegExpExecArray = reg.exec(src);
        let hasil: string = '';

        if (regHasil) {
            hasil = regHasil[0];
        }

        return hasil;
    }

    //ambil script
    function ubahScript(data: string): string {
        let hasil: string = data;

        while (true) {
            console.log('ambil tag:');

            let tag: string = ambilTag(hasil, /<script.*<\/script>/);
            console.log('tag: ' + tag);

            if (tag != '') {
                let url: string = ambilScriptUrl(tag);
                console.log('url:' + url);

                if (url == './js/cacheFile.js') {
                    content = ambilFile();
                    content = "\n let fileCache = " + content + " \n";
                }
                else {
                    content = fs.readFileSync(baseDir + url, 'utf-8');
                }
                content = `\n<!-- ${url} mulai: -->\n <script>\n ${content} \n</script> \n<!-- ${url} selesai -->\n`;

                hasil = hasil.replace(/<script.*<\/script>/, content);
            }
            else {
                break;
            }
            console.log('/ambil tag')
        }

        return hasil;
    }

    function ambilScriptUrl(src: string): string {
        let regSrc: RegExpExecArray = /".*"/.exec(src);

        if (regSrc) {
            let str: string = regSrc[0].slice(1);
            str = str.slice(0, str.length - 1);
            return str;
        }

        throw Error('');
    }

    function ambilFile(): string {
        let p: string = path.join(__dirname + '/template');
        let dir: string[] = fs.readdirSync(p);


        console.log("");
        console.log('ambil file');
        console.log("p: " + p);
        console.log("dir " + dir);
        console.log("");

        if (!dir) return '';

        for (let i: number = 0; i < dir.length; i++) {
            let fileStr: string = dir[i];


            let file2: string = fs.readFileSync(path.join(__dirname + '/template/' + fileStr), "utf-8");
            console.log('ambil file: ' + file2.slice(0, 10));

            config.push({
                path: dir[i],
                file: file2
            });
        }

        fs.writeFileSync("temp_file.txt", JSON.stringify(config));
        return fs.readFileSync("temp_file.txt", "utf-8");
    }
}

interface ICacheFile {
    path?: string,
    file?: string
}
