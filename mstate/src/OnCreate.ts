///<reference path="ent/Tombol.ts"/>
///<reference path="ent/Dot.ts"/>
///<reference path="ent/State.ts"/>
///<reference path="ent/Input.ts"/>
///<reference path="ent/Geom.ts"/>

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let tombolCont: HTMLDivElement;
let flRender: boolean = false;
let stateCont: HTMLDivElement;
let debugCont: HTMLDivElement = document.querySelector('div.debug');

//test
let id1: number;
let id2: number;
let id3: number;

canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d');
ctx.strokeStyle = "solid";
tombolCont = document.querySelector('div.tombol-cont');
stateCont = document.querySelector('div.state-cont');

Tombol.init();
State.init();
Input.init(canvas);