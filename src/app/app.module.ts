import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';

import { HeaderComponent } from './header/header.component';
import { VendorSearchComponent } from './vendor-search/vendor-search.component';
import { VendorDetailComponent } from './vendor-detail/vendor-detail.component';
import { VendorsComponent } from './vendors/vendors.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
     HttpClientInMemoryWebApiModule.forRoot(
       InMemoryDataService, { dataEncapsulation: false }
     )
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    VendorSearchComponent,
    VendorDetailComponent,
    VendorsComponent,
    SidebarComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
