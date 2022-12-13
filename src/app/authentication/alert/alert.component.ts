import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { HttpAlertService } from './httpalert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;
  showMessage: boolean = false;

  constructor(private httpAlertService: HttpAlertService) {}

  ngOnInit() {
    this.subscription = this.httpAlertService
      .getAlert()
      .subscribe((message) => {
        this.message = message;
        this.showMessage = this.message.type === 'error' ? true : false;
      });
  }

  ngOnDestroy() {
    this.showMessage = this.message.type === 'error' ? true : false;
    this.subscription.unsubscribe();
  }
}
