import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {UploadFileComponent} from "./upload-file.component";
import {FileDetailsModule} from "../file-details/file-details.module";

@NgModule({
  imports: [CommonModule, FileDetailsModule],
  declarations: [UploadFileComponent],
  exports: [UploadFileComponent]
})
export class UploadFileModule {}
