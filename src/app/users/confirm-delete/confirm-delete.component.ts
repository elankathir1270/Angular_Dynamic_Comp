import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../Models/User';

@Component({
  selector: 'app-confirm-delete',
  standalone: false,

  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.css',
})
export class ConfirmDeleteComponent {
  @Input() userToDelete: User;
  @Output() OnConfirmation: EventEmitter<boolean> = new EventEmitter<boolean>();

  onConformationBtnClicked(value: boolean) {
    this.OnConfirmation.emit(value);
  }
}
