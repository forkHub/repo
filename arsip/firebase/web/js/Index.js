import { Util } from "./comp/Util.js";
import { Data } from "./ent/Data.js";
import { HalLogin } from "./ent/HalLogin.js";
console.log('index.js');
async function init() {
    console.log('init');
    await HalLogin.init();
    // document.body.appendChild(HalLogin.view);//
    try {
        Data.token = await HalLogin.login();
        await getConversation(Data.conversationId);
    }
    catch (e) {
        console.error(e);
    }
}
init();
async function getConversation(conversationId) {
    let url = `/smc/conversations/${conversationId}/messages`;
    let xml = await Util.Ajax('get', url, '');
    if (xml.status == 200) {
        let data = xml.responseText;
        console.log(data);
    }
    else {
        throw Error('error');
    }
}
