import { Password } from './../password.model';
import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent implements OnInit {
  formPassword: Password;

  constructor(private dialogRef: MdDialogRef<PasswordDialogComponent>) {
    var data = this.dialogRef.config.data;
    console.log("Received the data", data);
    this.formPassword = new Password();
  }

  ngOnInit() {
  }

  onSubmit() {
    try {
      console.log("TODO. Push", this.formPassword);
      this.dialogRef.close();

    } catch (e) {
      console.log("Error while submiting form", e);
    }
  }

}
