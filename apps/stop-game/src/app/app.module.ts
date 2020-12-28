import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';

@NgModule({
  declarations: [AppComponent, MainMenuComponent, MainFooterComponent, ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
