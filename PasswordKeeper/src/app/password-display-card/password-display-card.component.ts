import { Component, OnInit, Input, trigger, style, state, transition, animate } from '@angular/core';
import { Password } from "../password.model";

import * as firebase from 'firebase';
import { MdSnackBar, MdDialogConfig, MdDialog } from "@angular/material";
import { PasswordDialogComponent } from "../password-dialog/password-dialog.component";

@Component({
  selector: 'password-display-card',
  templateUrl: './password-display-card.component.html',
  styleUrls: ['../shared/common.scss', './password-display-card.component.scss'],
  animations: [
    trigger('showPassword', [
      state('collapsed', style({
        height: 0
      })),
      state('expanded', style({
      })),
      transition('* => *', animate('0.3s'))
    ])
  ]
})
export class PasswordDisplayCardComponent implements OnInit {

  @Input() password: Password;
  @Input() firebasePath: string;
  isExpanded = false;
  get showPasswordState(): string {
    return this.isExpanded ? "expanded" : "collapsed";
  }

  constructor(private snackBar: MdSnackBar,
    private dialog: MdDialog) { }

  ngOnInit() {
  }

  edit(): void {
    var dialogConfig = new MdDialogConfig();
    dialogConfig.data = {
      firebasePath: this.firebasePath,
      password: this.password
    };
    this.dialog.open(PasswordDialogComponent, dialogConfig);
  }

  remove(): void {
    this.snackBar.open('Password Removed', 'Dismiss', {
      duration: 3000
    });
    firebase.database().ref().child(this.firebasePath).child(this.password.$key).remove();
  }

}
