import { Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { EstimationsComponent } from './estimations/estimations.component';
import { ResultsComponent } from './results/results.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: EstimationsComponent
    },
    {
        path: 'results',
        component: ResultsComponent
    },
    {
        path: '**',
        component: NotfoundComponent
    }
];
