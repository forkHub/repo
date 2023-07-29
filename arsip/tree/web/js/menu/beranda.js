import { file } from "./file.js";
import { folder } from "./folder.js";
import { menuEl, setKlik } from "./menu.js";
class Beranda {
    render(cont) {
        cont.innerHTML = `
            <button class='project'>project .. </button>
            <button class='folder'>folder .. </button>
            <button class='file'>file .. </button>
        `;
        cont.querySelector('button.folder').onclick = () => {
            folder.render(cont);
        };
        menuEl.atas.detail.innerText = 'beranda';
        setKlik(cont, 'project', () => {
            console.log('project');
        });
        setKlik(cont, 'file', () => {
            file.render(cont);
        });
    }
}
export const beranda = new Beranda();
