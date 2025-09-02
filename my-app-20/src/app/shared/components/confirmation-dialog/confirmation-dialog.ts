import { Component, Input } from '@angular/core';

@Component({
  selector: 'confirmation-dialog',
  imports: [],
  template: `
    <dialog [open]="isConfirmationOpen">
      Are you sure you want to perform this action?

      <button (click)="!isConfirmationOpen">Cancel</button>
      <button (click)="!isConfirmationOpen">Confirm</button>
    </dialog>
  `,
  styles: ``,
})
export class ConfirmationDialog {
  @Input() isConfirmationOpen = true;
}
