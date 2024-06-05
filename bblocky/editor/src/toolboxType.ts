enum EOutput {
	Boolean = "Boolean",
	Number = "Number",
	String = "String",
	Array = "Array",
	Dummy = "dummy",
	Any = ""
	// Statement = "statement",
}

enum EArgType {
	inputValue = "input_value",
	inputDummy = "input_dummy",
	statementValue = "input_statement",
	input_end_row = "input_end_row"
}

type TArgDef = {
	type: EArgType,

	//input
	check?: EOutput              //input
	name?: string                //input
	default?: string | boolean | number

	output?: EOutput | null
}

type TBlockRawData = {
	list: TToolBoxBlockDef[]
	group: string
	hidden: "true" | "false"
}

type TToolBoxBlockDef = {
	type: string,
	message0: string
	args?: any;         //=> di convert ke arg0, TODO: support object for complex input type
	output?: EOutput;
	hat?: boolean;
	perintah: string;

	//auto fill
	args0?: TArgDef[]
	inputsInline?: boolean
	previousStatement?: null,
	nextStatement?: null,
	colour?: 230,
	tooltip?: string,
	helpUrl?: string
	inputs?: any
	kurung?: boolean
	stmt?: boolean
	hidden?: boolean | string
}

enum ToolBoxKind {
	categoryToolbox = "categoryToolbox",
	category = "category",
	block = 'block'
}

type TToolbokDef = {
	kind: ToolBoxKind.categoryToolbox,
	contents: TToolbokContentDef[];
}

type TToolbokContentDef = {
	kind: ToolBoxKind.category | string
	name?: string
	type?: string
	custom?: string
	contents?: TToolbokContentDef[];
	inputs?: any
	hidden?: string
}