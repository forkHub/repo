export enum EOutput {
    Boolean = "Boolean",
    Number = "Number",
    String = "String",
    Array = "Array",
    Dummy = "dummy"
}

export enum EArgType {
    inputValue = "input_value",
    inputDummy = "input_dummy",
    field_variable = 'field_variable'
}

export type TArgDef = {
    type: EArgType | "input_dummy" | "input_value" | "field_variable",

    //input
    check?: EOutput | "Number"   //input
    name?: string                //input
    default?: string | boolean | number
    variable?: string
    output?: EOutput | null
    align?: "RIGHT" | "left"
}

export type TToolBoxBlockDef = {
    type: string,
    message0: string
    args?: any;         //=> di convert ke arg0, //TODO: support dummy input
    output?: EOutput;

    //auto fill
    args0?: TArgDef[]
    inputsInline?: boolean
    previousStatement?: null,
    nextStatement?: null,
    colour?: 230,
    tooltip?: string,
    helpUrl?: string
    inputs?: any
}

export enum ToolBoxKind {
    categoryToolbox = "categoryToolbox",
    category = "category",
    block = 'block'
}

export type TToolbokDef = {
    kind: ToolBoxKind.categoryToolbox,
    contents: TToolbokContentDef[];
}

export type TToolbokContentDef = {
    kind: ToolBoxKind.category | string
    name?: string
    type?: string
    custom?: string
    contents?: TToolbokContentDef[];
    inputs?: any
}