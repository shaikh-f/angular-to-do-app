import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../../api/product';
import { ProductService } from '../../../service/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html'
})
export class ToDoListComponent implements OnInit, OnDestroy {

    products!: Product[];

    subscription!: Subscription;

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsSmall().then(data => this.products = data);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
