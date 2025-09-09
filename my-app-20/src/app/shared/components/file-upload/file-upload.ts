import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  imports: [],
  template: `
    <div class="file-upload">
      <label for="upload">{{ label }}</label>
      <input type="file" id="upload" (change)="onFileSelected($event)" />
      @if(errorMessage) {
      <span class="error">
        {{ errorMessage }}
        Only the following file types are permitted:
        <ul>
          @for(type of accept; track $index) {
          <li>
            {{ type }}
          </li>
          }
        </ul>
      </span>
      }
    </div>
  `,
  styles: ``,
})
export class FileUpload {
  @Input({ required: true }) label!: string;
  @Input({
    transform: (value: string) => value.split(','),
  })
  accept: string[] = [];
  @Output() selected = new EventEmitter<FileList>();
  errorMessage = '';

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.errorMessage = Array.from(files).every((f) => this.accept.includes(f.type))
      ? ''
      : 'Invalid file type';

    if (this.errorMessage === '') {
      this.selected.emit(files);
    }
  }
}
