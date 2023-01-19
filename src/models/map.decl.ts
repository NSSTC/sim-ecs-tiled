import {ITiledMap} from "@workadventure/tiled-map-type-guard";

export enum ERenderOrder {
    LeftDown,
    LeftUp,
    RightDown,
    RightUp,
}

export class TiledMap {
    constructor(
        public renderOrder: ERenderOrder,
        public width: number,
        public height: number,
    ) {}
}
