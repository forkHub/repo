type TBlockly = {
    inject: (p: any, p2: any) => void;
    Xml: {
        domToWorkspace: (workspaceBlocks: any, workspace: any) => void;
    }
}

declare var Blockly: TBlockly;