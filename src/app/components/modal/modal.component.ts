import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input()
  visible: boolean = false;

  @Input()
  title: string;

  constructor() { }

  ngOnInit(): void {
  }

  setVisibility(visibility: boolean): void {
    this.visible = visibility;
  }

  toggle(){
    this.visible = !this.visible;
  }

}
