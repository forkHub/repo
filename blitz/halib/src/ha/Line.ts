namespace ha {

	class Line2D {

		createLine(m: number, b: number): ILine {
			return {
				b: b,
				m: m,
				y: 0
			}
		}

		lineCrossPos(line: ILine, line2: ILine): IPoint2D {
			line;
			line2;
			return null;
		}

	}

	export var line: Line2D = new Line2D();
}