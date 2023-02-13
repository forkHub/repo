//store state globally here
const globalHook = {
    value: {
        getter: null,
        setter: null
    },
    activePage: {
        getter: '',
        setter: null
    }
}

//wrapper hook
function setHook(obj: any, ar: any[]): void {
    obj.getter = ar[0];
    obj.setter = ar[1];
}

function Header() {
    return <>
        <h3>Shareable value is : {globalHook.value.getter}</h3>
    </>
}

function MainPage() {
    setHook(globalHook.value, React.useState('initial value'));
    setHook(globalHook.activePage, React.useState('page1'));

    return <>
        <h1>Test Global Value </h1>
        <Header />
        <Menu />
        <PageCont />
    </>
}

function Menu() {
    return (<>
        <hr />
        <div>
            <button
                onClick={() => {
                    globalHook.activePage.setter('page1');
                }}
                disabled={globalHook.activePage.getter == 'page1'}
            >home </button>
            <button
                onClick={() => {
                    globalHook.activePage.setter('page2');
                }}
                disabled={globalHook.activePage.getter == 'page2'}
            >page 2</button>
            <button
                onClick={() => {
                    globalHook.activePage.setter('page3');
                }}
                disabled={globalHook.activePage.getter == 'page3'}
            >page 3</button>
        </div>
        <ValueUpdater />
        <hr />
    </>)
}

function PageCont() {
    if (globalHook.activePage.getter == 'page2') {
        return <Page2 />
    }
    else if (globalHook.activePage.getter == 'page3') {
        return <Page3 />
    }
    else {
        return <HomePage />
    }
}

function ValueUpdater() {
    return (<form>
        <label>You can update shareable value here:</label><br />
        <input
            type="text"
            onChange={(e: React.ChangeEvent) => {
                // console.log((e.target as HTMLInputElement).value);
                let value: string = (e.target as HTMLInputElement).value;
                globalHook.value.setter(value);
                // console.log(e);
            }}
            value={globalHook.value.getter}
        >

        </input>
    </form>)
}

function HomePage() {
    return <div>
        <p>this is home page</p>
        <ValueUpdater />
    </div>
}

function Page2() {
    return <div>
        <p>this is page 2</p>
        <ValueUpdater />
    </div>
}

function Page3() {
    return <div>
        <p>this is page 3</p>
        <ValueUpdater />
    </div>
}

ReactDOM.render(
    <>
        <MainPage />
    </>,
    document.getElementById('react-root')
);