import { Injectable, TemplateRef } from '@angular/core';
import { TOAST_MSGS, TOAST_TYPES } from '../components/constants';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  showToast(messageKey: string, type: TOAST_TYPES.success | TOAST_TYPES.danger, options: any = { delay: 2000, autohide: true }) {
    const message = messageKey;
    const classname = type === TOAST_TYPES.success ? 'bg-success text-light' : 'bg-danger text-light';
    this.toasts.push({ textOrTpl: message, classname, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

}
