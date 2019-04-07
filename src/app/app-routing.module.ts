import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './search/details/details.component';


const routes: Routes = [
    { path: 'user/:id',        //'user/:id'
    component: DetailsComponent,
    data: {}
  },
  { path: '', component: SearchComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
