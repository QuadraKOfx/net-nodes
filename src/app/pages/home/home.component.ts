import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mode: string = "Link";

  ngOnInit() {
    console.info("WELCOME TO THE HOME COMPONENT");
  }

  switchModes() {
    this.mode = (this.mode === "Link") ? "Gantt" : "Link";
    console.info(this.mode);
  }

}
