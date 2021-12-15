import {Component, Input} from "@angular/core";
import {FileUpload} from "../../models/FileUpload";
import {FileUploadService} from "../../services/file-upload.service";

@Component({
  selector: 'file-details',
  templateUrl: './file-details.component.html'
})
export class FileDetailsComponent {

  @Input() fileUpload!: FileUpload;

  constructor(private uploadService: FileUploadService) { }

  generateGraph(fileUpload: FileUpload) {
    console.info("Generating Graph: " + fileUpload.name);
    // this.uploadService.getFile(fileUpload).subscribe((value: any) => {
    //   console.info(value);
    // })
  }

  deleteFileUpload(fileUpload: FileUpload): void {
    console.info("Deleting File: " + fileUpload.name);
  }
}
