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
    NAME?: string,
    VAR?: {
        id: string
    },
    NUM?: number,
    TEXT?: string
}

type TInput = {
    VALUE?: {
        block: TBlock
    },
    ARG0?: {
        block: TBlock
    }
    ARG1?: {
        block: TBlock
    }
    ARG2?: {
        block: TBlock
    }
    ARG3?: {
        block: TBlock
    }
    ARG4?: {
        block: TBlock
    }
}

type TExtraState = {
    params: TVariable[] | string[]  //string bila call fungsi, TVariable bila deklarasi
    name?: string   //call function nama fungsi yang dipanggil
}

type TBlock = {
    type: string,
    id: string,
    x: number,
    y: number,
    inputs: TInput,
    extraState?: TExtraState,
    fiels: TField,
    icons?: any,
    next: TBlock,
}

type TBlockCont = {
    languageVersion: number
    blocks: TBlock[]
}

type TWorkSpace = {
    blocks?: TBlockCont,
    variables?: TVariable[]
}

enum TBlockType {
    DEC_FUNGSI_NO_RETURN = "procedures_defnoreturn",
    PANGGIL_FUNGSI_NO_RETURN = "procedures_callnoreturn",
    VAR_SET = "variables_set",
    VAR_GET = "variables_get",
    LIT_MATH = "math_number",

}

declare var Blockly: TBlockly;
declare var javascript: TJS;

var b: TBlock;
