import { Case } from './case';


export class Maze {


    difficulty: number;
    size: number;
    board: Case[][];
    paths: Case[];
    isdone: boolean;
    startFinish: Case[];
    visited: Case[];
    playerPos: Case;

    constructor(dif: number) {
        this.difficulty = dif;
        this.size = dif * 9;
        this.board = [];
        this.visited = [];
        this.paths = [];
        this.startFinish = [];
        this.playerPos = null;
        this.isdone = false;
        for (let i = 0; i < this.size; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.size; j++) {
                this.board[i][j] = new Case(i, j);
            }
        }
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


    makebad() {

        for (const bloc of this.board) {
            for ( const current of bloc) {
                if (!current.visited) {
                    current.setVisited();
                    current.changeType('path');
                    this.visited.push(current);
                }
                const unvisited = [];
                for ( const neighbor of current.neighbors) {
                    if ( !neighbor.visited) {
                        unvisited.push(neighbor);
                    }
                }

                while ( unvisited.length > 0) {

                    const rand = Math.floor(Math.random() * unvisited.length);
                    const randomneigh = unvisited[rand];
                    randomneigh.setVisited();
                    randomneigh.changeTyperand();
                    this.visited.push(randomneigh);
                    unvisited.splice(rand, 1);
                }

            }

        }

    }


  make(dimensions: number, tmout = false) {


    this.paths = [];

    const grid  = new Array();
    for (let i = 0; i < dimensions; i++) {
        grid[i] = new Array();

        for (let j = 0; j < dimensions; j++) {
            grid[i][j] = '';
        }
    }

    this.addOuterWalls(grid);
    this.addInnerWalls(grid, true, 1, grid.length - 2, 1, grid.length - 2);

    if (tmout === true) {
        let t = 1;
        for (let i = 0; i < dimensions; i++) {
            for (let j = 0; j < dimensions; j++) {
                const b = this.board[i][j];
                if (grid[i][j] !== 'w') {
                    setTimeout(() => {b.changeType('path'); }, t * 20);
                    this.paths.push(b);
                } else {
                    setTimeout( () => {b.changeType('wall'); } , t * 20);
                }
                t += 1;
            }
        }
    } else {
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
    }
    this.setStartFinish(this.paths);
    this.isdone = true;


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

        if (this.playerPos !== null) {
            console.log('player not null');
            this.playerPos.isPlayer = false;
        }
        this.playerPos = paths[rand];
        this.playerPos.isPlayer = true;
        paths[rand2].isFinish = true;
        this.startFinish.push(paths[rand]);
        this.startFinish.push(paths[rand2]);
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

  randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
sortNodes(nodes: Case[]) {
    nodes.sort((n1, n2) => n1.distance - n2.distance);
}
dikjstra() {
    this.playerPos.distance = 0;
    this.playerPos.setVisited();
    const ordernodes = [];
    for (const neighbor of this.playerPos.neighbors) {
        if (neighbor.getType() === 'path') {
            neighbor.distance = 1;
            this.visited.push(neighbor);
        }
    }
    while (this.visited.length > 0) {
        console.log('ok');
        this.sortNodes(this.visited);
        let clnode = this.visited.shift();

        clnode.visited = true;

        if (clnode === this.startFinish[1]) {
            while (clnode != null) {
                clnode.switchActive();
                ordernodes.push(clnode);
                clnode = clnode.previous;
            }
            return ordernodes;
        }
        this.upneighbor(clnode);
    }



}
upneighbor(current: Case) {
    for (const neighbor of current.neighbors) {
        if (neighbor.getType() === 'path' && neighbor.visited === false) {
            if ( Math.min(neighbor.distance, current.distance + 1) !== neighbor.distance) {
                neighbor.distance = current.distance + 1;
                neighbor.previous = current;
            }
            this.visited.push(neighbor);
        }

    }

}

}
