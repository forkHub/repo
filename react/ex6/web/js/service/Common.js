//store global data here
const Data = {
    login: {},
    customer: Customer.def()
};
//store state globally here
const globalHook = {
    value: {
        getter: null,
        setter: null
    },
    activePage: {
        getter: '',
        setter: null
    },
    dirty: {
        getter: 0,
        setter: null
    },
    sideMenu: {
        aktifStatus: {
            getter: false,
            setter: null
        }
    }
};
//wrapper hook
function setHook(obj, ar) {
    obj.getter = ar[0];
    obj.setter = ar[1];
}
const tempSession = {
    token: '',
};
function simpanSession() {
    window.sessionStorage.setItem('session_data', JSON.stringify(tempSession));
}
function loadSession() {
    try {
        let str = window.sessionStorage.getItem('session_data');
        let obj = JSON.parse(str);
        tempSession.token = obj.token;
    }
    catch (e) {
        console.log(e);
    }
}
