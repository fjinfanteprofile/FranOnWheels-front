
import { Component, TemplateRef } from '@angular/core';

import { ToastService } from '../../service/toast.service';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [NgbToastModule, NgIf, NgTemplateOutlet, NgFor],
  templateUrl: './toast-container.component.html',
  host: { 'class': 'toast-container position-fixed top-0 start-50 translate-middle-x p-3', style: 'z-index: 1200' },
})
export class ToastsContainer {
  constructor(public toastService: ToastService) {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
