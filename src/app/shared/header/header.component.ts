import { Component, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TextDirectionController } from 'src/app/entities/all.entity';

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
    {
      name: 'ARABIC',
      code: 'ar',
       icon: '/assets/img/ar.png'
      },
]

  selectedLanguage = localStorage.getItem('lang') || 'fr';
  private DirectionController = new TextDirectionController();
  constructor(private translate : TranslateService, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.changeDirection();
  }
  
  changeLanguage() {
    localStorage.setItem('lang', this.selectedLanguage);
    // change dir and lang attribute in body element
    this.DirectionController.textDirection = this.selectedLanguage === 'ar' ? 'rtl' : 'ltr';
    this.changeDirection();
    // console.log(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }

  changeDirection() {
    this.renderer.setAttribute(document.body, 'dir', this.DirectionController.textDirection);
    this.renderer.setAttribute(document.body, 'lang', this.selectedLanguage);
  }
}
