import {ITiledMap} from "@workadventure/tiled-map-type-guard";
import {EntityBuilder, IEntity, ISerialFormat, SerDe} from "sim-ecs";
import {TiledTile} from "./models/tile.decl";
import {ERenderOrder, TiledMap} from "./models/map.decl";

export async function loadMap(mapJSON: string): Promise<ISerialFormat> {
    const entities = new Set<IEntity>();
    const rawMap = ITiledMap.parse(mapJSON);

    // go over each tile
    //   create an entity per tile with all attributes etc.

    const mapWidth = rawMap.height ?? 0;
    const mapHeight = rawMap.width ?? 0;
    const tileCount = mapWidth * mapHeight;
    const map = new TiledMap(
        (() => {
            switch (rawMap.renderorder) {
                case 'left-down': return ERenderOrder.LeftDown;
                case 'left-up': return ERenderOrder.LeftUp;
                case 'right-down': return ERenderOrder.RightDown;
                case 'right-up': return ERenderOrder.RightUp;
                default: return ERenderOrder.RightDown;
            }
        })(),
        mapWidth,
        mapHeight,
    );

    entities.add(
        new EntityBuilder()
            .with(map)
            .build()
    );

    // todo: first decode tilesets
    {
        let tileset;
        for (tileset of rawMap.tilesets) {
            tileset
        }
    }

    {
        let layer;
        for (layer of rawMap.layers) {
            if (layer.type != 'tilelayer') {
                continue;
            }

            for (let i = 0; i < tileCount; i++) {
                entities.add(
                    new EntityBuilder()
                        .with(new TiledTile())
                        .build()
                );
            }
        }
    }

    // bake it?

    return new SerDe().serialize({
        entities: entities.values(),
        resources: {},
    });
}
