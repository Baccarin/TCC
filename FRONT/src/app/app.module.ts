import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { LoaderModule } from './components/loader/loader.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderInterceptor } from './components/loader/loader.interceptor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProfileComponent } from './pages/profile/profile.component';
import { NgxJsonViewModule } from 'ng-json-view';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { RecaptchaModule } from 'ng-recaptcha';
import { RECAPTCHA_LANGUAGE } from "ng-recaptcha";
// import { NgxMaskModule, IConfig } from 'ngx-mask';

//tutoriais
import { XPComponent } from './pages/tutorials/xp/xp.component';
import { ScrumComponent } from './pages/tutorials/scrum/scrum.component';
import { FDDComponent } from './pages/tutorials/fdd/fdd.component';
import { KanbanComponent } from './pages/tutorials/kanban/kanban.component';
import { CrystalComponent } from './pages/tutorials/crystal/crystal.component';

// CADASTRO
import { PessoaComponent } from './pages/cadastro/pessoa/pessoa.component';
import { EmpresaComponent } from './pages/cadastro/empresa/empresa.component';
import { FuncionarioComponent } from './pages/cadastro/funcionario/funcionario.component';
import { TimeComponent } from './pages/cadastro/time/time.component';
import { ProjetoComponent } from './pages/cadastro/register/projeto.component';
import { UsuarioComponent } from './pages/cadastro/usuario/usuario.component';



import { NgxPaginationModule } from 'ngx-pagination';
import { RestComponent } from './pages/api/rest/rest.component';

// const maskConfig: Partial<IConfig> = {
//   validation: false,
// };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    HeaderComponent,
    LoginComponent,
    ProfileComponent,
    
    // TUTORIAIS
    XPComponent,
    ScrumComponent,
    KanbanComponent,
    FDDComponent,
    CrystalComponent,

    // API
    RestComponent,
    
    //CADASTROS
    PessoaComponent,
    EmpresaComponent,
    FuncionarioComponent,
    TimeComponent,
    ProjetoComponent,
    UsuarioComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderModule,
    Ng2SearchPipeModule,
    NgxJsonViewModule,
    NgxJsonViewerModule,
    RecaptchaModule,
    NgxPaginationModule,
    // NgxMaskModule.forRoot(maskConfig),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }, {
    provide: RECAPTCHA_LANGUAGE,
    useValue: "en", 
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
