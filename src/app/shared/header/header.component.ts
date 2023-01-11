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

  selectedLanguage = 'fr'
  constructor(private translate : TranslateService) {
  }

  ngOnInit(): void {
  }
  
  changeLanguage() {
    // console.log(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }

}
