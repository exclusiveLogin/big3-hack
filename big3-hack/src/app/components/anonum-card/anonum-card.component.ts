import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-anonum-card',
  templateUrl: './anonum-card.component.html',
  styleUrls: ['./anonum-card.component.css']
})
export class AnonumCardComponent implements OnInit {

    pdescription = 'Нет информации о человеке';
    get description(): string{
        return this.pdescription;
    }
    @Input() set description(value){
        this.pdescription = this.b64DecodeUnicode(value);
    }
    b64DecodeUnicode(str): string {
        return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
  constructor() { }

  ngOnInit(): void {
  }

}
