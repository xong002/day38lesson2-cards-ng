import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DrawCardsComponent } from './components/draw-cards/draw-cards.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'draw/:id', component: DrawCardsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
