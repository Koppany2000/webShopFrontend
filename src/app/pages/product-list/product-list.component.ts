import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryType } from 'src/app/Categorytype';
import { ProductInfo } from 'src/app/models/productInfo';
import { ProductStatus } from 'src/app/ProductStatus';
import { JwtResponse } from 'src/app/response/JwtResponse';
import { Role } from 'src/app/Role';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService,
              private productService: ProductService,
              private route: ActivatedRoute) {
  }
  currentUserSubscription:Subscription;
  Role = Role;
  currentUser: JwtResponse;
  page: any;
  CategoryType = CategoryType;
  ProductStatus = ProductStatus;
  private querySub: Subscription;

  ngOnInit() {
      this.querySub = this.route.queryParams.subscribe(() => {
          this.update();
      });
      this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
        this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
      this.querySub.unsubscribe();
  }

  update() {
      if (this.route.snapshot.queryParamMap.get('page')) {
          const currentPage = +this.route.snapshot.queryParamMap.get('page');
          const size = +this.route.snapshot.queryParamMap.get('size');
          this.getProds(currentPage, size);
      } else {
          this.getProds();
      }
  }

  getProds(page: number = 1, size: number = 5) {
      this.productService.getAllInPage(+page, +size)
          .subscribe(page => {
              this.page = page;
          });

  }


  remove(productInfos: ProductInfo[], productInfo) {
      this.productService.delelte(productInfo).subscribe(_ => {
              productInfos = productInfos.filter(e => e.productId != productInfo);
          },
          err => {
          });
  }


}