  
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { UsersComponent } from './users/users.component';
import { MazeComponent } from './maze/maze.component';



const routes: Routes = [
  { path: '', redirectTo: '/maze', pathMatch: 'full' },
  { path: 'users',  component: UsersComponent },
  {path: 'maze', component: MazeComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ],
  providers: [],
})
export class AppRoutingModule {}