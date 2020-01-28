export class User {
  id: number;
  nom: string;
  score: Score;

 constructor(nom: string) {
   this.nom = nom;
   this.score = new Score();
 }


}

class Score{

  points: number;
  constructor(){
    this.points =0;
  }

}