import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class TimerService {

    private countdownTimerRef: any = null;
    private init: number = 0;
    public paused: boolean = true;
    private countdownEndSource = new Subject<void>();
    private countdownSource = new BehaviorSubject<number>(0);
    public countdownEnd$ = this.countdownEndSource.asObservable();
    public countdown$ = this.countdownSource.asObservable();

    constructor() { }

    destroy(): void {
        this.clearTimeout();
    }

    restartCountdown(init?: number) {
        if (init)
            this.init = init;
        if (this.init && this.init > 0) {
            this.paused = true;
            this.clearTimeout();
            this.countdownSource.next(this.init);
        }
    }

    toogleCountdown() {
        this.paused = !this.paused;
        if (this.paused == false) {
            this.doCountdown();
        } else {
            this.clearTimeout();
        }

    }

    private doCountdown() {
        this.countdownTimerRef = setTimeout(() => {
            this.countdownSource.next(this.countdownSource.getValue() - 1);
            this.processCountdown();
        }, 1000);
    }

    private processCountdown() {
        if (this.countdownSource.getValue() == 0) {
            this.countdownEndSource.next();
        }
        else {
            this.doCountdown();
        }
    }

    private clearTimeout() {
        if (this.countdownTimerRef) {
            clearTimeout(this.countdownTimerRef);
            this.countdownTimerRef = null;
        }
    }

}