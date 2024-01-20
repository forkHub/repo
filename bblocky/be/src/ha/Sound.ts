namespace ha.be {

    export class Sound implements IAudio {
        static readonly list: IAudio[] = [];

        private _src: string = '';
        private _loaded: boolean = false;
        private _sound: HTMLAudioElement;
        private _playedCount: number;

        public get playedCount(): number {
            return this._playedCount;
        }
        public set playedCount(value: number) {
            this._playedCount = value;
        }

        public get sound(): HTMLAudioElement {
            return this._sound;
        }
        public set sound(value: HTMLAudioElement) {
            this._sound = value;
        }

        public get loaded(): boolean {
            return this._loaded;
        }
        public set loaded(value: boolean) {
            this._loaded = value;
        }

        public get src(): string {
            return this._src;
        }
        public set src(value: string) {
            this._src = value;
        }

        static Load(url: string): void {
            let sound: HTMLAudioElement = document.createElement("audio");

            let s = new Sound();
            s.src = url;
            s.loaded = false;
            s.sound = sound;

            sound.onload = () => {
                s.loaded = true;
            }
            sound.onended = () => {
                s.playedCount++;
            }
            sound.src = url;

            Sound.list.push(s);

        }

        static Play(s: IAudio): void {
            s.sound.play();
        }

        static PlayedCount(s: IAudio): number {
            let h = s.playedCount;
            s.playedCount = 0;
            return h;
        }


    }
}