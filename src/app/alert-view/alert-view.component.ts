import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-view',
  templateUrl: './alert-view.component.html',
  styleUrls: ['./alert-view.component.scss']
})
export class AlertViewComponent implements OnInit {

  @Output() onCancel = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
