import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges {

  @Input() init: number = 0;
  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();
  public counter: number = 0;
  private countdownTimerRef: any = null;

  constructor() { }

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnChanges(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }

  startCountdown() {
    if (this.init && this.init > 0) {
      this.clearTimeout();
      this.counter = this.init;
      this.doCountdown();
    }
  }

  doCountdown() {
    this.countdownTimerRef = setTimeout(() => {
      this.counter = this.counter - 1;
      this.processCountdown();
    }, 1000);
  }

  private clearTimeout() {
    if (this.countdownTimerRef) {
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }

  processCountdown() {
    this.onDecrease.emit(this.counter);
    if (this.counter == 0) {
      this.onComplete.emit();
    } else {
      this.doCountdown();
    }
  }

}
