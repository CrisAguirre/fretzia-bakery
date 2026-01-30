import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NosotrosComponent } from './nosotros.component';
import { CheescakesComponent } from './cheescakes.component';

const routes: Routes = [
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'cheescakes', component: CheescakesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
