import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-madmoone-spinner',
  templateUrl: './madmoone-spinner.component.html',
  styleUrls: ['./madmoone-spinner.component.scss'],
})
export class MadmooneSpinnerComponent implements OnInit {
  public _loading: boolean = true;
  @Input('loading') 
  set loadingSpinner(loading: boolean) {
    this._loading = loading;
  //  this._loading ? this.spinner.show() : this.spinner.hide();
  }
  get loading(): boolean{
    return this._loading;
  }

  @Input() height : any = null; 
  constructor(
    private spinner: NgxSpinnerService,

  ) {
    this.spinner.show();
  }

  ngOnInit(): void {}
}
