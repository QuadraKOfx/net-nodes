import {Component, OnInit} from "@angular/core";
import {FileUploadService} from "../../services/file-upload.service";
import {FileUpload} from "../../models/FileUpload";
import {map} from "rxjs/operators";
import * as d3 from 'd3';

@Component({
  selector: 'upload-file',
  templateUrl: './upload-file.component.html'
})
export class UploadFileComponent implements OnInit {

  selectedFiles?: FileList;
  fileUploads: any[] = [];
  currentFileUpload?: FileUpload;
  percentage = 0;

  constructor(protected fileService: FileUploadService) {
  }

  ngOnInit(): void {
    // this.fileService.getFiles(6).snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
    //   )
    // ).subscribe((value: any) => {
    //   this.fileUploads = value;
    // });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  uploadToFirebase(): void {
    // if (this.selectedFiles) {
    //   const file: File | null = this.selectedFiles.item(0);
    //   this.selectedFiles = undefined;
    //   if (file) {
    //     this.currentFileUpload = new FileUpload(file);
    //     this.fileService.pushFileToStorage(this.currentFileUpload).subscribe({
    //       next: (percentage) => this.percentage = Math.round(percentage ? percentage : 0),
    //       complete: () => console.info("Activity Task Completed")
    //     });
    //   }
    // }
  }

}
