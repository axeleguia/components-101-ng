import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';
import { Tab } from './tab.interface';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit, Tab {

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
  @Input() title!: string;
  public isActive: boolean = false;

  constructor(public tabs: TabsComponent) {}

  ngOnInit() {
    this.tabs.addTab(this);
  }

  clickTabContent() {
    this.onClick.emit();
  }

}
