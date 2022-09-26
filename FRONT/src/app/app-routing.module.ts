import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './components/auth-guard/auth-guard.service';
import { HomeComponent } from './pages/home/home.component';

import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';



// TUTORIAIS
import { XPComponent } from './pages/tutorials/xp/xp.component';
import { ScrumComponent } from './pages/tutorials/scrum/scrum.component';
import { KanbanComponent } from './pages/tutorials/kanban/kanban.component';
import { FDDComponent } from './pages/tutorials/fdd/fdd.component';
import { CrystalComponent } from './pages/tutorials/crystal/crystal.component';

// API
import { RestComponent } from './pages/api/rest/rest.component';
import { SoapComponent } from './pages/api/soap/soap.component';


//CADASTRO
import { PessoaComponent } from './pages/cadastro/pessoa/pessoa.component';
import { EmpresaComponent } from './pages/cadastro/empresa/empresa.component';
import { TimeComponent } from './pages/cadastro/time/time.component';
import { FuncionarioComponent } from './pages/cadastro/funcionario/funcionario.component';
import { ProjetoComponent } from './pages/cadastro/register/projeto.component';
import { UsuarioComponent } from './pages/cadastro/usuario/usuario.component';





const routes: Routes = [
  { path: '', component: HomeComponent },

  // TUTORIAIS
  { path: 'metodologias/xp', component: XPComponent },
  { path: 'metodologias/scrum', component: ScrumComponent },
  { path: 'metodologias/kanban', component: KanbanComponent },
  { path: 'metodologias/fdd', component: FDDComponent },
  { path: 'metodologias/crystal', component: CrystalComponent },

  //CADASTRO
  { path: 'cadastro/pessoa', component: PessoaComponent , canActivate: [AuthGuardService] },
  { path: 'cadastro/empresa', component: EmpresaComponent , canActivate: [AuthGuardService] },
  { path: 'cadastro/time', component: TimeComponent , canActivate: [AuthGuardService] },
  { path: 'cadastro/funcionario', component: FuncionarioComponent , canActivate: [AuthGuardService] },
  { path: 'cadastro/projeto', component: ProjetoComponent, canActivate: [AuthGuardService] },
  { path: 'cadastro/usuario', component: UsuarioComponent, canActivate: [AuthGuardService] },

  //API
  { path: 'api/rest', component: RestComponent },
  { path: 'api/soap', component: SoapComponent },


  { path: 'login', component: LoginComponent },

  { path: 'profile', component: ProfileComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
