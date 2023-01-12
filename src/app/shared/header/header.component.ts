import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  languages = [
    {
    name: 'ENGLISH',
    code: 'en',
    icon: '/assets/img/uk.png'
  },
  {
    name: 'FRENCH',
    code: 'fr',
     icon: '/assets/img/fr.png'
    },
]

  selectedLanguage = localStorage.getItem('lang') || 'fr';
  constructor(private translate : TranslateService) {
  }

  ngOnInit(): void {
  }
  
  changeLanguage() {
    localStorage.setItem('lang', this.selectedLanguage);
    // console.log(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }

}
