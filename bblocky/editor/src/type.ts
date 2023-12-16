type TBlockly = {
    svgResize(workspace: TWorkSpace): unknown;
    Msg: any;
    JavaScript: any;
    common: {
        defineBlocksWithJsonArray: (val: any) => {}
    },
    inject: (p: any, p2: any) => TWorkSpace;
    Xml: {
        domToWorkspace: (workspaceBlocks: any, workspace: any) => void;
    },
    serialization: {
        workspaces: {
            load: (state: any, myWorkspace: any) => void;
            save: (workspace: any) => TWorkSpace
        }
    }
}

type TJS = {
    javascriptGenerator: {
        workspaceToCode: (workspace: any) => string;
        forBlock: any
    },
    Order: {
        ATOMIC: number
    },
}

type TVariable = {
    name: string,
    id: string
}

type TField = {
    VAR?: {
        id: string
    },
    NUM?: number
}

type TInput = {
    VALUE?: {
        block: TBlock
    }
}

type TBlock = {
    type: string,
    id: string,
    x: number,
    y: number,
    inputs: TInput,
    fiels: any
    next: TBlock
}

type TWorkSpace = {
    languageVersion: number
    blocks: TBlock[],
    variables: TVariable[]
}

declare var Blockly: TBlockly;
declare var javascript: TJS;

