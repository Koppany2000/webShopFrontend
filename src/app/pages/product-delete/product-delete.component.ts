import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryType } from 'src/app/enum/Categorytype';
import { ProductInfo } from 'src/app/models/productInfo';
import { ProductStatus } from 'src/app/enum/ProductStatus';
import { JwtResponse } from 'src/app/response/JwtResponse';
import { Role } from 'src/app/enum/Role';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit , OnDestroy {

  constructor(private userService: UserService,
              private productService: ProductService,
              private route: ActivatedRoute,
              private router:Router) {
  }
  currentUserSubscription:Subscription;
  Role = Role;
  currentUser: JwtResponse;
  indeterminate = false;
  setOfCheckedId = new Set<string>();
  page: any;
  checked=false;
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

  
  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }
  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
  refreshCheckedStatus(): void {
    const listOfEnabledData =this.page.content;
    this.checked = listOfEnabledData.every(({ productId }) => this.setOfCheckedId.has(productId));
    this.indeterminate = listOfEnabledData.some(({ productId }) => this.setOfCheckedId.has(productId)) && !this.checked;
   
  }
  onAllChecked(checked: boolean): void {
    this.page.content
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
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
  delete(){
    const requestData = this.page.content.filter(data => this.setOfCheckedId.has(data.productId));
    requestData.forEach(element => {
      this.productService.delelte(element).subscribe(data =>{
        this.router.navigate(['/seller/product']);
        
      })
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