import { Component } from '@angular/core';
import {ApiService} from 'src/app/services/api.service';
import {HackService} from 'src/app/services/hack.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'big3-hack';
  constructor(private api: ApiService, private hack: HackService) {
  }

  matching = false;
  match(): void {
      this.matching = true;
      this.hack.startHack();
  }
}
