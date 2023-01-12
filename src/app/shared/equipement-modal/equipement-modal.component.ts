import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IProjectEquipement, IRoomEquipement } from 'src/app/entities/all.entity';

@Component({
  selector: 'app-equipement-modal',
  templateUrl: './equipement-modal.component.html',
  styleUrls: ['./equipement-modal.component.scss']
})
export class EquipementModalComponent implements OnInit {

  // input equipement
  equipement: IProjectEquipement | IRoomEquipement | any | null = null;
  usingLang : string | null = null;
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

}
