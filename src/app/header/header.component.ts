import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(feature: String) {
    console.log("Emitting: " + feature);
    this.featureSelected.emit(feature);
  }

  onSaveData() {
    console.log("save");
  }

  onFetchData() {
    console.log("fetch");
  }

}
