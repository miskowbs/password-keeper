import { Component, OnInit, Input, trigger, style, state, transition, animate } from '@angular/core';
import { Password } from "../password.model";

import * as firebase from 'firebase';

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

  constructor() { }

  ngOnInit() {
  }

  edit(): void {
    console.log("edit", this.password);
  }

  remove(): void {
    console.log("remove", this.password);
    firebase.database().ref().child(this.firebasePath).child(this.password.$key).remove();
  }

}
