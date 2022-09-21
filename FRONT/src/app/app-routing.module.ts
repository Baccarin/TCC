import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './components/auth-guard/auth-guard.service';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { HomeComponent } from './pages/home/home.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { LocationComponent } from './pages/location/location.component';
import { LoginComponent } from './pages/login/login.component';
import { NotesComponent } from './pages/notes/notes.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { RespostasComponent } from './pages/respostas/respostas.component';
import { SendmessageComponent } from './pages/sendmessage/sendmessage.component';

// TUTORIAIS
import { XPComponent } from './pages/tutorials/xp/xp.component';
import { ScrumComponent } from './pages/tutorials/scrum/scrum.component';
import { KanbanComponent } from './pages/tutorials/kanban/kanban.component';
import { FDDComponent } from './pages/tutorials/fdd/fdd.component';
import { CrystalComponent } from './pages/tutorials/crystal/crystal.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  // TUTORIAIS
  { path: 'metodologias/xp', component: XPComponent },
  { path: 'metodologias/scrum', component: ScrumComponent },
  { path: 'metodologias/kanban', component: KanbanComponent },
  { path: 'metodologias/fdd', component: FDDComponent },
  { path: 'metodologias/crystal', component: CrystalComponent },


  { path: 'respostas', component: RespostasComponent },
  { path: 'location', component: LocationComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'sendmessage', component: SendmessageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'notes', component: NotesComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuardService] },
  { path: 'list-users', component: ListUsersComponent, canActivate: [AuthGuardService] },
  { path: 'edit-users', component: EditUserComponent, canActivate: [AuthGuardService] },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
