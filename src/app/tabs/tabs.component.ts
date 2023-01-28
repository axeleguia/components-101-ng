import { Component, ContentChildren, OnInit, AfterContentInit, OnDestroy, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { Tab } from '../tab/tab.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit, OnDestroy {

  @ContentChildren(TabComponent) public tabs!: QueryList<TabComponent>;

  private tabClickSubscriptions: any[] = [];

  constructor() { }

  ngOnDestroy(): void {
    if (this.tabClickSubscriptions) {
      this.tabClickSubscriptions.forEach((tabSubscription) => tabSubscription.unsubscribe());
    }
  }

  ngAfterContentInit(): void {
    this.tabs.forEach((tab) => {
      let subscription = tab.onClick.subscribe(() => {
        console.log(`tab ${tab.title} is content clicked`)
      });
      this.tabClickSubscriptions.push(subscription);
    });
    this.selectTab(this.tabs.first);
  }

  ngOnInit() { }

  selectTab(tab: Tab) {
    this.tabs.forEach(tab => tab.isActive = false);
    tab.isActive = true;
  }

}
