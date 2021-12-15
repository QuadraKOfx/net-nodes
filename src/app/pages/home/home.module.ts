import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./home.component";
import {LinkGraphModule} from "../../components/link-graph/link-graph.module";
import {UploadFileModule} from "../../components/upload-file/upload-file.module";
import {GanttModule} from "../../components/gantt-graph/gantt.module";

@NgModule({
  imports: [CommonModule, LinkGraphModule, UploadFileModule, GanttModule],
  declarations: [HomeComponent]
})
export class HomeModule {}
