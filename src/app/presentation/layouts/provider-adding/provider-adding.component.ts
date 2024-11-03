import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProviderLight } from '@domain/models/provider';
import { ProviderService } from '@domain/services/provider.service';
import { IconType } from '@presentation/utils/icon/icon-type.enum';
import { IconComponent } from '@presentation/utils/icon/icon.component';

@Component({
  selector: 'app-provider-adding',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <div class="container-main">
      <h1>Add your new provide!</h1>
    </div>
  `,
  styleUrl: 'provider-adding.component.scss',
})
export class ProviderAddingComponent implements OnInit {
  protected readonly IconType = IconType;
  public providerService = inject(ProviderService);
  public router = inject(Router);

  constructor() {} // private _dialog: MatDialog // private _productService: ProductService,

  public async ngOnInit(): Promise<void> {
    // this.providerService.get().subscribe((providers) => {
    //   this.providers = [...providers];
    // });
  }
}
