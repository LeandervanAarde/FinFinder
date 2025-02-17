import { Component, EventEmitter, Output, Input } from '@angular/core';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label: string;
  @Input() class: string;
  @Output() clickHandler = new EventEmitter<any>();

  onClickHandler(e) {
    this.clickHandler.emit(e);
  }
}
