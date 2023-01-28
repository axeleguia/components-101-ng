import { AfterContentInit, AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, ElementRef, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit, AfterViewInit {
  public isAddTimerVisible: boolean = false;
  public time: number = 0;
  public timers: Array<number> = [];
  public simpleAlert!: ComponentRef<SimpleAlertViewComponent>;

  @ViewChild("timerInput") timeInput!: ElementRef;
  @ViewChild("alert", { read: ViewContainerRef }) alertContainer!: ViewContainerRef;

  constructor(private renderer: Renderer2, private resolver: ComponentFactoryResolver) {
    this.timers = [30, 15, 3];
  }

  ngAfterViewInit() {
    this.renderer.setAttribute(this.timeInput.nativeElement, "placeholder", "enter seconds");
    this.renderer.addClass(this.timeInput.nativeElement, 'time-in');
  }

  ngAfterContentInit() {
  }

  public showAddTimer() {
    this.isAddTimerVisible = true;
    setTimeout(() => {
      this.renderer.selectRootElement(this.timeInput.nativeElement).focus();
    });
  }

  public hideAddTimer() {
    this.isAddTimerVisible = false;
  }

  public showEndTimerAlert() {
    const alertFactory = this.resolver.resolveComponentFactory(SimpleAlertViewComponent);
    this.simpleAlert = this.alertContainer.createComponent(alertFactory);
    this.simpleAlert.instance.title = "Timer ended";
    this.simpleAlert.instance.message = "Your countdown has finished";
    this.simpleAlert.instance.onDismiss.subscribe(() => {
      this.simpleAlert.destroy();
    });

    this.simpleAlert.instance.show();
  }

  public submitAddTimer() {
    this.timers.push(this.time);
    this.hideAddTimer();
  }

}
