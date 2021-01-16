import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { AppRoutingModule } from './app-routing.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const socketConfig: SocketIoConfig = {
  url: 'http://localhost:3334',
  options: {},
};

@NgModule({
  declarations: [AppComponent, MainMenuComponent, MainFooterComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    SocketIoModule.forRoot(socketConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
