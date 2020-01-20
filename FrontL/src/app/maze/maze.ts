import { Case } from './case';


export class Maze {


    difficulty: number;
    size: number;
    board: Case[][];
    visited: Case[];

    constructor(dif: number) {
        this.difficulty = dif;
        this.size = dif * 9;
        this.board = [];
        this.visited = [];
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
                    this.board[i][j].changeType('wall');
                    this.board[i][j].setVisited();
                    if (j === 0) {
                    this.board[i][j].addNeighbor(this.board[i][j + 1]);
                    } else if ( j === this.size - 1) {
                        this.board[i][j].addNeighbor(this.board[i][j - 1]);
                    } else {
                    this.board[i][j].addNeighbor(this.board[i][j - 1]);
                    this.board[i][j].addNeighbor(this.board[i][j + 1]);
                    }
                } else if ( i === this.size - 1 ) {
                    this.board[i][j].changeType('wall');
                    this.board[i][j].setVisited();
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
                    this.board[i][j].changeType('wall');
                    this.board[i][j].addNeighbor(this.board[i][j + 1]);
                    } else if ( j === this.size - 1) {
                    this.board[i][j].changeType('wall');
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


  make(dimensions, tmout) {
      
    const grid  = new Array();
    for (var i = 0; i < dimensions; i++) {
        grid[i] = new Array();

        for (var j = 0; j < dimensions; j++) {
            grid[i][j] = "";
        }
    }

    this.addOuterWalls(grid);
    this.addInnerWalls(grid,true, 1, grid.length - 2, 1, grid.length - 2);
    console.log(grid)
    if(tmout===true){
        let t=1;
        for (var i = 0; i < dimensions; i++) {
            for (var j = 0; j < dimensions; j++) {
                const b=this.board[i][j];
                if (grid[i][j] !== "w"){
                    setTimeout(() => {b.changeType('path');},t*30);
                }
                else{
                    setTimeout( () => {b.changeType('wall');},t*30);
                }
                t+=1;
            }
        }
    }
    else{
        for (var i = 0; i < dimensions; i++) {
            for (var j = 0; j < dimensions; j++) {
                const b=this.board[i][j];
                if (grid[i][j] !== "w"){
                    b.changeType('path');
                }
                else{
                    b.changeType('wall');
                }
            }
        }
    }
}

  addOuterWalls(grid) {
   
    for (var i = 0; i < grid.length; i++) {
        if (i == 0 || i == (grid.length - 1)) {
            for (var j = 0; j < grid.length; j++) {
                grid[i][j] = "w";
            }
        } else {
            grid[i][0] = "w";
            grid[i][grid.length - 1] = "w";
        }
    }
}


  addInnerWalls(grid,h, minX, maxX, minY, maxY) {
    if (h) {

        if (maxX - minX < 2) {
            return;
        }

        const y = Math.floor(this.randomNumber(minY, maxY)/2)*2;
        this.addHWall(grid,minX, maxX, y);

        this.addInnerWalls(grid,!h, minX, maxX, minY, y-1);
        this.addInnerWalls(grid,!h, minX, maxX, y + 1, maxY);
    } else {
        if (maxY - minY < 2) {
            return;
        }

        var x = Math.floor(this.randomNumber(minX, maxX)/2)*2;
        this.addVWall(grid,minY, maxY, x);

        this.addInnerWalls(grid,!h, minX, x-1, minY, maxY);
        this.addInnerWalls(grid,!h, x + 1, maxX, minY, maxY);
    }
}

  addHWall(grid,minX, maxX, y) {

    var hole = Math.floor(this.randomNumber(minX, maxX)/2)*2+1;

    for (var i = minX; i <= maxX; i++) {
        if (i == hole) grid[y][i] = "";
        else grid[y][i] = "w";
    }
}

  addVWall(grid,minY, maxY, x) {
 
    var hole = Math.floor(this.randomNumber(minY, maxY)/2)*2+1;

    for (var i = minY; i <= maxY; i++) {
        if (i == hole) grid[i][x] = "";
        else grid[i][x] = "w";
    }
}

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
}
