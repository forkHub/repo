namespace ha {
	class Line {

		createLine(m: number, b: number): ILine {
			return {
				b: b,
				m: m,
				y: 0
			}
		}

		fromPos(): void {

		}

		fromVec(): void {

		}

		fromSeg(): void {

		}

		lineCrossPos(line: ILine, line2: ILine): IV2D {
			line;
			line2;
			return null;
		}

	}

	export var line: Line = new Line();
}