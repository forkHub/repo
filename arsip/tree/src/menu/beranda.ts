import { file } from "./file.js";
import { folder } from "./folder.js";
import { menuEl, setKlik } from "./menu.js";

class Beranda {
    render(cont: HTMLDivElement): void {
        cont.innerHTML = `
            <button class='project'>project .. </button>
            <button class='folder'>folder .. </button>
            <button class='file'>file .. </button>
        `;

        (cont.querySelector('button.folder') as HTMLButtonElement).onclick = () => {
            folder.render(cont);
        }

        menuEl.atas.detail.innerText = 'beranda'

        setKlik(cont, 'project', () => {
            console.log('project');
        });

        setKlik(cont, 'file', () => {
            file.render(cont);
        });

    }
}

export const beranda: Beranda = new Beranda();