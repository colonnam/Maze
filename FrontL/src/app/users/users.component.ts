import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

import { User } from './user';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any = [] ;
  current:any=[]



  constructor(private service: UsersService) { }

  ngOnInit() {
    this.service.getUsers().subscribe((data: any) => {
      const utilisateurs = data;
      for ( const user of utilisateurs) {
        this.users.push(user);
      }
      this.current=this.currentUser();
      console.log(this.current);
    });
    
    
  }
  currentUser(){
    return [localStorage.getItem('currentUsername'),localStorage.getItem('currentUserPoints')];
    ;
  }

  verify(nom: string) {
    for (const user of this.users) {
      if (user.nom === nom) {
        localStorage.setItem('currentUsername', user.nom);
        localStorage.setItem('currentUserPoints', user.score.points);
        return;
      }
    }
    const n:any = this.add(nom);
    localStorage.setItem('currentUsername', n.nom);
    localStorage.setItem('currentUserPoints', n.score.points);

  }

    add(nom: string) {
      const user: User = new User(nom);
      console.log(user);
      this.service.adduser(user).subscribe();
      return user;
    }
  delete(user: User) {
    this.service.deleteUser(user.id).subscribe();
  }

}
