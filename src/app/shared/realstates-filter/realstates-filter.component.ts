import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-realstates-filter',
  templateUrl: './realstates-filter.component.html',
  styleUrls: ['./realstates-filter.component.scss'],
})
export class RealstatesFilterComponent implements OnInit {

  @Input() title = 'Liste des Biens';
  @Input() desc = 'Liste des Biens dans ce projet';
  showFilter = false;

  filterForm: FormGroup = new FormGroup({});

  showPropertiesPublic = true;
  propertiesTypes = ['type 1', 'type 2', 'type 3', 'type 4'];


  constructor() {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.filterForm = new FormGroup({
      name: new FormControl(null),
      type: new FormControl(null),
      etage: new FormControl(null),
      exposition: new FormControl(null),
    });
  }

  resetForm() {
    this.filterForm.reset();
  }
}
