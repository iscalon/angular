import { Routes } from '@angular/router';
import { RightSideComponent } from './right-side/right-side.component';
import { QuotationDetailsComponent } from './quotation-details/quotation-details.component';
import { BoughtComponent } from './bought/bought.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmptyComponent } from './empty/empty.component';

export const routes: Routes = [
    {
        path: '',
        component: EmptyComponent,
        pathMatch: 'full'
    },
    {
        path: 'right',
        component: RightSideComponent,
        children: [
            {
                path: '',
                component: EmptyComponent,
                pathMatch: 'full'
            },        
            {
                path: 'followed',
                component: QuotationDetailsComponent
            },
            {
                path: '**',
                component: NotFoundComponent
            }
        ]
    },
    {
        path: 'empty',
        component: EmptyComponent,
        outlet: 'secondaire' 
    },
    {
        path: 'bought',
        component: BoughtComponent,
        outlet: 'secondaire'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
