import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FileDetailsComponent} from "./file-details.component";

@NgModule({
  imports: [CommonModule],
  declarations: [FileDetailsComponent],
  exports: [FileDetailsComponent]
})
export class FileDetailsModule {}
