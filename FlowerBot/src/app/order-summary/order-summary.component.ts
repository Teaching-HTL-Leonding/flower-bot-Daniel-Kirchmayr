import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  template: `
    <div *ngIf="orderSummary">
      <h2>Order Summary</h2>
      <div *ngFor="let bouquet of orderSummary.bouquets">
        <h3>Bouquet ({{ bouquet.size }})</h3>
        <ul>
          <li *ngFor="let flower of bouquet.flowers">
            {{ flower.quantity }} x {{ flower.color }} {{ flower.type }}
          </li>
        </ul>
      </div>
      <p>Total Price: {{ orderSummary.totalPrice }}€</p>
    </div>
  `,
  styles: []
})
export class OrderSummaryComponent implements OnInit {
  orderSummary: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.orderSummary = navigation?.extras.state?.['orderSummary'];
  }

  ngOnInit(): void {}
}
