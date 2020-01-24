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
  difficulty: number;
  moves: number;
  bestmoves: number;
  score: number;
  levelscore: number;
  cheat: number;
  timeStart: any;
  time: any;
  timeEnd: any;
  events: string[];



  ngOnInit() {

    this.events = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'p'];
    this.score = 0;
    setInterval(() => {
    }, 100);

  }

  makeMaze(val: number) {
    this.difficulty = val;
    this.moves = 0;
    this.cheat = 1;
    this.maze = new Maze(val);
    this.timeStart = Date.now();
    this.bestmoves = this.findpath().length;
    setInterval(() => {
      this.time = Date.now() - this.timeStart;
    }, 100);
  }

  showcell(c: Case) {
        console.log(c);
    }
    getScore() {

      const bonus = (this.difficulty * (this.bestmoves ** 3) * 10000);
      const malus = (this.timeEnd * (this.moves ** 2) * (this.cheat ** 2));
      const bs =(this.timeEnd);

      console.log(bonus, malus,bs);

      return Math.floor(bonus / malus);
    }

    @HostListener('document:keydown', ['$event'])
        handleKeyboardEvent(event: KeyboardEvent) {
          const key = event.key;
          if (this.events.includes(key)) {
            event.preventDefault();
          }

          if (this.maze) {
            if (this.maze.isdone === true) {
              this.maze.playerPos = this.play(key, this.maze.playerPos, this.maze.board);
              if (this.maze.playerPos === this.maze.startFinish[1]) {
                this.timeEnd = Date.now() - this.timeStart;
                this.levelscore = this.getScore();
                this.score += this.levelscore;
                this.makeMaze(this.difficulty += 2);
              }
            }
          }
        }

      play(key: string, player: Case, board: Case[][]) {

        if (this.maze.showpath && key !== 'p') {
          for ( const p of this.maze.paths) {
            p.setPathInactive();
          }
          this.maze.showpath = false;
        }

        if (key === 'p' && !this.maze.showpath) {
          this.cheat += 1;
          this.findpath(false);
        }

        if ( key === 'ArrowUp' && board[player.getPosX() - 1][player.getPosY()].getType() !== 'wall') {
          player = this.changePos(player, board, player.getPosX() - 1, player.getPosY());
          }

        if ( key === 'ArrowDown' && board[player.getPosX() + 1][player.getPosY()].getType() !== 'wall') {

          player = this.changePos(player, board, player.getPosX() + 1, player.getPosY());
          }

        if ( key === 'ArrowLeft' && board[player.getPosX()][player.getPosY() - 1].getType() !== 'wall') {

          player = this.changePos(player, board, player.getPosX(), player.getPosY() - 1);
          }

        if ( key === 'ArrowRight' && board[player.getPosX()][player.getPosY() + 1].getType() !== 'wall') {

          player = this.changePos(player, board, player.getPosX(), player.getPosY() + 1);

          }

        return player;
      }

      changePos(player: Case, board: Case[][], x: number, y: number) {
        this.moves += 1;
        player.isPlayer = false;
        player = board[x][y];
        player.isPlayer = true;
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




findpath(start= true) {

    return this.maze.dikjstra(start);

    }


}
