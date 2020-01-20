export class Case {


    type: string;
    visited: boolean;
    posx: number;
    posy: number;
    neighbors: Case[];
    active: boolean;

    constructor(x: number, y: number) {
        this.type = 'wall';
        this.posy = y;
        this.posx = x;
        this.visited = false;
        this.active = false;
        this.neighbors = [];
 }

    setVisited() {
        this.visited = true;
    }
    switchActive() {
        this.active = !this.active;
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
    changeTyperand() {
        const t = ['wall', 'path'];
        const rand = Math.floor(Math.random() * t.length);
        this.changeType(t[rand]);
    }

    getPosX() {
        return this.posx;
    }
    getPosY() {
        return this.posy;
    }
}
