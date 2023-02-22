import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-delete-account-button',
  templateUrl: './delete-account-button.component.html',
  styles: []
})
export class DeleteAccountButtonComponent {
  deleteAccountForm = this.formBuilder.group({
    password: ['']
  });

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  openDeleteAccountModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  async onDeleteAccountSubmit(modal: NgbModalRef) {
    if (!this.deleteAccountForm.value.password) return;

    this.authService
      .deleteAccount(this.deleteAccountForm.value.password)
      .subscribe(() => modal.close());
  }
}
