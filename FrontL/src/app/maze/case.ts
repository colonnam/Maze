export class Case {


    type: string;
    visited: boolean;
    posx: number;
    posy: number;
    neighbors: Case[];
    active: boolean;
    isStart: boolean;
    isFinish: boolean;
    isPlayer: boolean;
    distance: number;
    previous: Case;

    constructor(x: number, y: number) {
        this.type = 'path';
        this.posy = y;
        this.posx = x;
        this.visited = false;
        this.active = false;
        this.neighbors = [];
        this.isStart = false;
        this.isFinish = false;
        this.isPlayer = false;
        this.previous = null;
        this.distance = Infinity;
 }

    setVisited() {
        this.visited = true;
    }
    setUnVisited() {
        this.visited = false;
    }
    setPathActive() {
        this.active = true;
    }
    setPathInactive() {
         this.active = false;
    }
    addNeighbor(neighbor: Case) {
        this.neighbors.push(neighbor);
    }
    getType() {
        return this.type;
    }
    changeType(type: string) {
        this.type = type;
    }
    changeTypeToPath() {
        this.type = 'path';
    }
    changeTypeToWall() {
        this.type = 'wall';
    }

    getPosX() {
        return this.posx;
    }
    getPosY() {
        return this.posy;
    }
}
