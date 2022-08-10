import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { TableViewComponent } from './table-view/table-view.component';

export const routes: Routes = [
    {
        path: 'home', component: TableViewComponent
    },

    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    }
];

export const routingConfiguration: ExtraOptions = {
    paramsInheritanceStrategy: 'always'
  };
@NgModule({
    imports: [RouterModule.forRoot(routes, routingConfiguration)],
    exports: [RouterModule]
})
export class AppRoutingModule { }