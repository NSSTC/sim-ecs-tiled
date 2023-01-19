# Tiled map importer for sim-ecs

This is a helper library to import Tiled map editor JSON files into sim-ecs


## Usage

### Installation

```shell
$ npm install sim-ecs-tiled
```


### Loading a map

A map can easily be loaded anytime by passing the json data as object:

```typescript
const mapObject = (await fetch('/path/to/my-map.tmj')).json();

// From prep world:
prepWorld.load(await loadMap(mapObject));

// From state
class MyState extends State {
    async create(actions: ITransitionActions) {
        actions.commands.load(await loadMap(mapObject));
    }
    
    // same for other methods...
}
```

