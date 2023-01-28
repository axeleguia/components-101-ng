import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-timer-none',
  templateUrl: './timer-none.component.html',
  styleUrls: ['./timer-none.component.scss'],
  providers: [TimerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TimerNoneComponent implements OnInit, OnDestroy {

  @Output() onComplete = new EventEmitter<void>();
  @Input() init: number = 20;
  private countdownEndSubscription!: Subscription;
  private countdownSubscription!: Subscription;
  public countdown: number = 0;

  constructor(
    public timer: TimerService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.timer.restartCountdown(this.init);
    this.countdownEndSubscription = this.timer.countdownEnd$.subscribe(() => {
      this.onComplete.emit();
    });

    this.countdownSubscription = this.timer.countdown$
      .subscribe((data) => {
        this.countdown = data;
        this.cdRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.timer.destroy();
    this.countdownEndSubscription.unsubscribe();
    this.countdownSubscription.unsubscribe();
  }

  get progress() {
    console.log('getting progress');
    return (this.init - this.countdown) / this.init * 100
  }

}
