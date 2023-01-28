import { AfterContentInit, Component, ElementRef, QueryList, ViewChild, ViewChildren, AfterViewInit, ChangeDetectorRef, Renderer2 } from '@angular/core';
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
  @ViewChildren(SimpleAlertViewComponent) alerts!: QueryList<SimpleAlertViewComponent>;
  @ViewChild('timerInput') timeInput!: ElementRef;
  constructor(
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2
  ) {
    this.timers = [30, 15, 3];
  }

  ngAfterViewInit() {
    console.log(this.timeInput);
    this.renderer.setAttribute(this.timeInput.nativeElement, "placeholder", "enter seconds");
    this.renderer.addClass(this.timeInput.nativeElement, "time-in");
    this.alerts.forEach(item => {
      if (!item.title) {
        item.title = 'Hi!';
        item.message = 'Hello World';
      }
    });
    this.cdRef.markForCheck();
  }

  ngAfterContentInit(): void {

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

  public submitAddTimer() {
    this.timers.push(this.time);
    this.hideAddTimer();
  }

  public showEndTimerAlert() {
    this.alerts.first.show();
    // this.isEndTimerAlertVisible = true;
  }

}
