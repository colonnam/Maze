import { Component, OnInit } from '@angular/core';
import { Maze } from './maze';
import { Case } from './case';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css']
})
export class MazeComponent implements OnInit {

  maze: Maze;
  activeNeighbors: Case[];
  neighborsOf: Case;




  ngOnInit() {
  }

  getdiff(val: number) {

    this.maze = new Maze(val);
    this.activeNeighbors = [];
    this.neighborsOf = null;

  }

  showcell(c: Case) {
        console.log(c);
    }

    @HostListener('document:keydown', ['$event'])
        handleKeyboardEvent(event: KeyboardEvent) {
        const key = event.key;
        if (key === 'ArrowUp' || key === 'ArrowRight' || key === 'ArrowDown' || key === 'ArrowLeft') {
          event.preventDefault();
        }
        console.log(key);
        if (this.maze.isdone === true) {

          this.maze.playerPos = this.play(key, this.maze.playerPos, this.maze.board);
          if (this.maze.playerPos === this.maze.startFinish[1]) {
            console.log('win');
            this.makeMaze();
          }
       }
        }

      play(key: string, player: Case, board: Case[][]) {

      console.log(player);
      if ( key === 'ArrowUp' && board[player.getPosX() - 1][player.getPosY()].getType() !== 'wall') {
        console.log(player);
        player.isPlayer = false;
        player = board[player.getPosX() - 1][player.getPosY()];
        player.isPlayer = true;
        }
      if ( key === 'ArrowDown' && board[player.getPosX() + 1][player.getPosY()].getType() !== 'wall') {
        console.log(player);
        player.isPlayer = false;
        player = board[player.getPosX() + 1][player.getPosY()];
        player.isPlayer = true;
        }
      if ( key === 'ArrowLeft' && board[player.getPosX()][player.getPosY() - 1].getType() !== 'wall') {
        console.log(player);
        player.isPlayer = false;
        player = board[player.getPosX()][player.getPosY() - 1];
        player.isPlayer = true;
        }
      if ( key === 'ArrowRight' && board[player.getPosX()][player.getPosY() + 1].getType() !== 'wall') {
        console.log(player);
        player.isPlayer = false;
        player = board[player.getPosX()][player.getPosY() + 1];
        player.isPlayer = true;
        }
      return player;
        }

  changetype(x: number, y: number) {


    /*if (this.maze.board[x][y].type === 'path') {
      this.maze.board[x][y].type = 'wall';

    } else if (this.maze.board[x][y].type === 'wall') {
      this.maze.board[x][y].type = 'bomb';
    } else {
      this.maze.board[x][y].type = 'path';
    }

    console.log(this.maze.board[x][y].neighbors);
    this.showneighbors(x, y );
    */
   if (this.maze.board[x][y].type === 'path') {
      this.maze.board[x][y].type = 'bomb';
    } else {
      this.maze.board[x][y].type = 'path';
    }

  }

  showneighbors(x: number , y: number) {
    if ( this.activeNeighbors.length > 0) {
      for (const neighbor of this.activeNeighbors) {
        neighbor.switchActive();
      }
      this.activeNeighbors = [];
    }
    if ( this.neighborsOf !== this.maze.board[x][y]) {

      this.neighborsOf = null;
      this.neighborsOf = this.maze.board[x][y];
      for (const neighbor of this.maze.board[x][y].neighbors) {
        // console.log(neighbor);
        neighbor.switchActive();
        this.activeNeighbors.push(neighbor);
      }
    } else {
      this.neighborsOf = null;

    }
  }
  showallneighbors() {
    let i = 1;
    for ( const bloc of this.maze.board) {
      for (const cell of bloc) {
        setTimeout( () => {this.showneighbors(cell.getPosX(), cell.getPosY()); }, i * 100);
        i += 1;

      }
    }
  }

  randtype() {
    const myArray = ['path', 'path', 'bomb', 'wall'];
    for (let i = 0; i < this.maze.size; i++) {
      for (let j = 0; j < this.maze.size; j++) {
       const rand = myArray[Math.floor(Math.random() * myArray.length)];
       this.maze.board[i][j].type = rand;
      }
    }
  }

  makeMaze(anim = false) {

    this.maze.make(this.maze.size, anim);

  }

  findpath(){
    console.log(this.maze.dikjstra());

    }


}
