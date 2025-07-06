import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AuthGuard } from '@auth0/auth0-angular'; // We'll use Auth0's Angular AuthGuard

const routes: Routes = [
  {
    path: 'todos',
    component: TodoListComponent,
    canActivate: [AuthGuard],  // protect this route so only logged-in users access
  },
  {
    path: '', 
    redirectTo: 'todos', 
    pathMatch: 'full'  // default route redirecting to /todos
  },
  {
    path: '**',
    redirectTo: 'todos',  // fallback to /todos for any unknown route
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
