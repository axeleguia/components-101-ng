import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountdownComponent } from './countdown/countdown.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { DisplayComponent } from './display/display.component';
import { AlertViewComponent } from './alert-view/alert-view.component';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';
import { TabComponent } from './tab/tab.component';
import { TabsComponent } from './tabs/tabs.component';
import { TimerComponent } from './timer/timer.component';
import { TimerShadowComponent } from './timer-shadow/timer-shadow.component';
import { TimerNoneComponent } from './timer-none/timer-none.component';

@NgModule({
  declarations: [
    AppComponent,
    CountdownComponent,
    ProgressBarComponent,
    DisplayComponent,
    AlertViewComponent,
    SimpleAlertViewComponent,
    TabComponent,
    TabsComponent,
    TimerComponent,
    TimerShadowComponent,
    TimerNoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
