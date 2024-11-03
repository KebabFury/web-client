import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-two-side-template',
  template: `
    <div class="two-side-template-container">
      <div class="left">
        <ng-content select="[left]" />
      </div>
      <div class="right">
        <ng-content select="[right]" />
      </div>
    </div>
  `,
  styleUrl: 'two-side-template.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TwoSideTemplateComponent {}
