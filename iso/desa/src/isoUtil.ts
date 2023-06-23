import { data } from "./data.js";

class IsoUtil {
    layar2Iso(xl: number, yl: number): void {
        data.isoPos.x = this.layar2IsoX(xl, yl);
        data.isoPos.y = this.layar2IsoY(xl, yl);
        data.isoPos.xgr = Math.floor(data.isoPos.x / 32);
        data.isoPos.ygr = Math.floor(data.isoPos.y / 32);
    }

    iso2Layar(isoX: number, isoY: number): void {
        data.layarPos.x = this.iso2LayarX(isoX, isoY) - data.vp.x;
        data.layarPos.y = this.iso2LayarY(isoX, isoY) - data.vp.y;
    }

    /**
     * proyeksi dari koordinat isometrik ke layar
     * @param isoX posisi x di koordinat isometrik
     * @param isoY posisi y di koordinat isometrik
     * @returns posisi x layar
     */
    iso2LayarX(isoX: number, isoY: number): number {
        return (isoX - isoY);
    }

    /**
     * proyeksi dari koordinat isometrik ke layar
     * @param isoX posisi x di koordinat isometrik
     * @param isoY posisi y di koordinat isometrik
     * @returns posisi y di layar
     */
    iso2LayarY(isoX: number, isoY: number): number {
        return (isoX + isoY) / 2;
    }

    /**
     * proyeksi ke posisi isometric dari posisi layar
     * @param sx posisi x di layar
     * @param sy posisi y di layar
     * @returns posisi x di koordinat isometrik
     */
    layar2IsoX(sx: number, sy: number): number {
        return (sx + 2 * sy) / 2;
    }

    /**
     * proyeksi ke posisi isometric dari posisi layar
     * @param sx posisi x di layar
     * @param sy posisi y di layar
     * @returns posisi y di koordinat isometrik
     */
    layar2IsoY(sx: number, sy: number): number {
        return (2 * sy - sx) / 2;
    }
}
export const isoUtil: IsoUtil = new IsoUtil();

