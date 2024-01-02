import { Routes } from '@angular/router';
import { SoccerTopLeaguesHomeComponent } from './components/soccer-top-leagues-home/soccer-top-leagues-home.component';

export const routes: Routes = [
    { path: '', component: SoccerTopLeaguesHomeComponent, pathMatch: 'full' },
    { path: 'team-game-results/:teamId', 
    loadComponent:() =>import('./components/team-game-results/team-game-results.component').then((res)=>res.TeamGameResultsComponent)
},
];
