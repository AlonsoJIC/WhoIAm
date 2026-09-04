import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(module => module.HomeModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./pages/projects/projects.module').then(module => module.ProjectsModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then(module => module.ContactModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module').then(module => module.NotFoundModule)
  },
  {
    path: 'projects/:id',
    loadChildren: () => import('./pages/project-detail/project-detail.module').then(module => module.ProjectDetailModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  //RENDERIZA LA PAGE NOTFOUND.... SIEMPRE VA DE ULTIMO PORQUE INTERFIERE!....
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then(module => module.NotFoundModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
