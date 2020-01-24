import { Case } from './case';


export class Maze {


    difficulty: number;
    size: number;
    board: Case[][];
    paths: Case[];
    showpath: boolean;
    isdone: boolean;
    startFinish: Case[];
    playerPos: Case;
    visited: Case[];

    constructor(dif: number) {
        this.difficulty = dif;
        this.size = dif;
        this.board = [];
        this.paths = [];
        this.visited = [];
        this.startFinish = [];
        this.playerPos = null;
        this.isdone = false;
        this.showpath = false;
        for (let i = 0; i < this.size; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.size; j++) {
                this.board[i][j] = new Case(i, j);
            }
        }

        this.initNeighbors();
        this.make(this.size);

    }



randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

  make(dimensions: number) {

    const grid  = new Array();
    for (let i = 0; i < dimensions; i++) {
        grid[i] = new Array();

        for (let j = 0; j < dimensions; j++) {
            grid[i][j] = '';
        }
    }


    this.addInnerWalls(grid, true, 1, grid.length - 2, 1, grid.length - 2);
    this.addOuterWalls(grid);
    for (let i = 0; i < dimensions; i++) {
            for (let j = 0; j < dimensions; j++) {

                const b = this.board[i][j];
                if (grid[i][j] !== 'w') {
                    b.changeType('path');
                    this.paths.push(b);
                } else {
                    b.changeType('wall');
                }
            }

    }

    this.setStartFinish(this.paths);

    this.isdone = true;


}

  addOuterWalls(grid: any[] | string[][]) {

    for (let i = 0; i < grid.length; i++) {
        if (i === 0 || i === (grid.length - 1)) {
            for (let j = 0; j < grid.length; j++) {
                grid[i][j] = 'w';
            }
        } else {
            grid[i][0] = 'w';
            grid[i][grid.length - 1] = 'w';
        }
    }
}


  addInnerWalls(grid: any[], h: boolean, minX: number, maxX: number, minY: number, maxY: number) {
    if (h) {

        if (maxX - minX < 2) {
            return;
        }

        const y = Math.floor(this.randomNumber(minY, maxY) / 2) * 2;
        this.addHWall(grid, minX, maxX, y);

        this.addInnerWalls(grid, !h, minX, maxX, minY, y - 1);
        this.addInnerWalls(grid, !h, minX, maxX, y + 1, maxY);
    } else {
        if (maxY - minY < 2) {
            return;
        }

        const x = Math.floor(this.randomNumber(minX, maxX) / 2) * 2;
        this.addVWall(grid, minY, maxY, x);

        this.addInnerWalls(grid, !h, minX, x - 1, minY, maxY);
        this.addInnerWalls(grid, !h, x + 1, maxX, minY, maxY);
    }
}

  addHWall(grid: any[], minX: number, maxX: number, y: number) {

    const hole = Math.floor(this.randomNumber(minX, maxX) / 2) * 2 + 1;

    for (let i = minX; i <= maxX; i++) {
        if (i === hole) { grid[y][i] = '';
        } else {grid[y][i] = 'w'; }
    }
}

  addVWall(grid: any[], minY: number, maxY: number, x: number) {

    const hole = Math.floor(this.randomNumber(minY, maxY) / 2) * 2 + 1;

    for (let i = minY; i <= maxY; i++) {
        if (i === hole) {
            grid[i][x] = '';
        } else {
            grid[i][x] = 'w';
        }
    }
}

setCurrentPlayer(current: Case) {
    if (this.playerPos !== null) {
            this.playerPos.isPlayer = false;
        }
    this.playerPos = current;
    this.playerPos.isPlayer = true;
}

setStartFinish(paths: Case[]) {
        /*paths[0].isStart = true;
        paths[paths.length - 1].isFinish = true;*/

        if (this.startFinish.length > 0)  {
            this.startFinish[0].isStart = false;
            this.startFinish[1].isFinish = false;
            this.startFinish = [];
        }

        const rand = this.randomNumber(0, paths.length - 1);
        let rand2 = this.randomNumber(0, paths.length - 1);
        if (rand === rand2) {
            console.log('rand equal');
            while (rand === rand2) {
                rand2 = this.randomNumber(0, paths.length - 1);
            }
        }

        paths[rand].isStart = true;

        this.setCurrentPlayer(paths[rand]);

        paths[rand2].isFinish = true;
        this.startFinish.push(paths[rand]);
        this.startFinish.push(paths[rand2]);
    }

sortVisited(visited: Case[]) {
    visited.sort((n1, n2) => n1.distance - n2.distance);
}

initNeighbors() {
        for (let i = 0; i < this.size; i++) {

            for (let j = 0; j < this.size; j++) {
                if (i === 0) {
                    this.board[i][j].addNeighbor(this.board[i + 1][j]);

                    if (j === 0) {
                    this.board[i][j].addNeighbor(this.board[i][j + 1]);
                    } else if ( j === this.size - 1) {
                        this.board[i][j].addNeighbor(this.board[i][j - 1]);
                    } else {
                    this.board[i][j].addNeighbor(this.board[i][j - 1]);
                    this.board[i][j].addNeighbor(this.board[i][j + 1]);
                    }
                } else if ( i === this.size - 1 ) {

                    this.board[i][j].addNeighbor(this.board[i - 1][j]);
                    if (j === 0) {
                    this.board[i][j].addNeighbor(this.board[i][j + 1]);
                    } else if ( j === this.size - 1) {
                    this.board[i][j].addNeighbor(this.board[i][j - 1]);
                    } else {
                    this.board[i][j].addNeighbor(this.board[i][j - 1]);
                    this.board[i][j].addNeighbor(this.board[i][j + 1]);

                    }
                } else {
                    this.board[i][j].addNeighbor(this.board[i - 1][j]);
                    this.board[i][j].addNeighbor(this.board[i + 1][j]);
                    if (j === 0) {

                    this.board[i][j].addNeighbor(this.board[i][j + 1]);
                    } else if ( j === this.size - 1) {

                    this.board[i][j].addNeighbor(this.board[i][j - 1]);
                    } else {
                    this.board[i][j].addNeighbor(this.board[i][j + 1]);
                    this.board[i][j].addNeighbor(this.board[i][j - 1]);
                    }

                }
            }
        }
    }

upneighbor(unVisited: Case[], current: Case) {

    for (const neighbor of current.neighbors) {
        if (neighbor.getType() === 'path' && neighbor.visited === false) {
            if ( Math.min(neighbor.distance, current.distance + 1) !== neighbor.distance) {
                neighbor.distance = current.distance + 1;
                neighbor.previous = current;
            }
            unVisited.push(neighbor);
        }

    }

}

dikjstra(start) {

    if (this.visited.length > 0) {
        for (const visited of this.visited) {
            visited.setUnVisited();
            visited.distance = Infinity;
            visited.previous = null;
            visited.setPathInactive();
        }
        this.visited = [];
    }
    let dpt = null;
    if (start) {
       dpt = this.startFinish[0];

    } else {
        dpt = this.playerPos;
    }

    const shortestPath = [];
    const unVisited = [];
    dpt.distance = 0;
    dpt.setVisited();
    this.visited.push(dpt);
    for (const neighbor of dpt.neighbors) {
        if (neighbor.getType() === 'path') {
            neighbor.distance = 1;
            unVisited.push(neighbor);
        }
    }

    while (unVisited.length > 0) {
        this.sortVisited(unVisited);
        let current = unVisited.shift();
        current.setVisited();

        this.visited.push(current);

        if (current === this.startFinish[1]) {
            while (current != null) {
                if (!start) {
                    current.setPathActive();
                    if (!this.showpath) {
                        this.showpath = true;
                    }
                }

                shortestPath.push(current);
                current = current.previous;
            }
            return shortestPath;
        }
        this.upneighbor(unVisited, current);
    }



}


}
