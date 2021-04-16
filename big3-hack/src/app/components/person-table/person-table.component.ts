import { Component, OnInit } from '@angular/core';
import {ApiService} from 'src/app/services/api.service';

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})
export class PersonTableComponent implements OnInit {

  constructor(private api: ApiService) { }

    users = this.api.onInitDataReceive$;
  ngOnInit(): void {
  }

}
