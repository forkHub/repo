interface IWorld {

}

interface IEnggineObj {
    world: IWorld;
}

interface IEngine {
    create: () => IEnggineObj
}

interface IRenderObj {

}

interface IRenderCreateOption {

}

interface IRender {
    create: (opt: IRenderCreateOption) => IRenderObj;
    run: (r: IRenderObj) => void;
}

interface IRunnerObj {

}

interface IRunner {
    create: () => IRunnerObj;
    run: (r: IRunnerObj, render: IRenderObj) => void;
}

interface IBodiesRectangleOpt {
    isStatic: boolean
}

interface IBodies {
    rectangle: (x: number, y: number, w: number, h: number, opt?: IBodiesRectangleOpt) => void;
}

interface IMatter {
    Engine: IEngine,
    Render: IRender,
    Runner: IRunner,
    Bodies: IBodies,
    Composite: any
}