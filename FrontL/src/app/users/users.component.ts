import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

import { User } from './user';
import {NgForm} from '@angular/forms';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any = [] ;


  constructor(private service: UsersService) { }

  ngOnInit() {
    this.service.getUsers().subscribe((data: any) => {
      const utilisateurs = data;
      for ( const user of utilisateurs) {
        this.users.push(user);
      }

    });
  
  }

    add(nom){
      const user : User=new User(nom);
      console.log(user)
      this.service.adduser(user).subscribe();
    }
  delete(user:User){
    this.service.deleteUser(user.id).subscribe();
  }

}
