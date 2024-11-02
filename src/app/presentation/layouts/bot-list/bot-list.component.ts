import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconComponent } from 'app/presentation/utils/icon/icon.component';

@Component({
  selector: 'cm-product-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IconComponent
  ],
  template: `
    <div class="container-main">
      <div class="header">
        <p style="color: white; font-size: 28px; font-weight: 500;">Your Bots:</p>
        <div class="header__right">
          <div class="header__right__search">
            <input type="text" placeholder="Поиск по имени" #filter>
            <app-icon icon="search"></app-icon>
          </div>
          <button class="add-button">
            <app-icon  icon="search"></app-icon>
          </button>
        </div>
      </div>
      
      <div class="bot-list">
        @for (product of productsFilteredList; track product) {
          <div class="bot">
            <div class="bot__content"> 
              <div class="bot__content__avatar-stub">
                <app-icon class="d-flex" icon="robot-black"></app-icon>
              </div>
              <div class="bot__content__info">
                <span class="bot__content__info__name">KebabSuperBot</span>
                <span class="bot__content__info__description">Description</span>
              </div>
            </div>
            <div class="bot__status active">
              <div class="circle"></div>
              <p>Enabled</p>
            </div>
            <div class="bot__toggle active"></div>
          </div>  
        }
      </div>
    
    </div>
  `,
  styleUrl: './bot-list.component.scss'
})
export class BotListComponent {

  // public products: IProduct[] = [];
  public productsFilteredList: number[] = [1, 2, 3, 4, 5, 6, 7];
  // public filterValue: string = '';
  // private key: string = '0';
  // public isActiveBase: boolean = true;
  // public isActiveUser: boolean = false;

  constructor(
    // private _productService: ProductService,
    // private _dialog: MatDialog
  ) {
  }

}
