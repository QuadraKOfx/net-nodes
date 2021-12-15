import {Injectable} from "@angular/core";
import {async, BehaviorSubject, finalize, Observable, Subject} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FileUpload} from "../models/FileUpload";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  // WE USE BEHAVIOR SUBJECT IN CASE WE NEED MORE THAN ONE FILE
  private fileSource = new BehaviorSubject(null);
  private generateFileActions = new Subject();
  private basePath = '/uploads';

  downloadURL: string = "";
  currentSource = this.fileSource.asObservable();

  constructor(protected http: HttpClient){
    // protected db: AngularFirestore,
              // protected _db: AngularFireDatabase,
              // protected storage: AngularFireStorage) {
    // this.db = db;
  }

  // pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
  //   const filePath = `${this.basePath}/${fileUpload.file.name}`;
  //   const storageRef = this.storage.ref(filePath);
  //   const uploadTask = this.storage.upload(filePath, fileUpload.file);
  //
  //   uploadTask.snapshotChanges().pipe(
  //     finalize(() => {
  //       storageRef.getDownloadURL().subscribe(downloadURL => {
  //         fileUpload.url = downloadURL;
  //         fileUpload.name = fileUpload.file.name;
  //         this.saveFileData(fileUpload);
  //       });
  //     })
  //   ).subscribe();
  //   return uploadTask.percentageChanges();
  // }
  //
  // private saveFileData(fileUpload: FileUpload): void {
  //   this._db.list(this.basePath).push(fileUpload);
  // }
  //
  // getFiles(numberItems: number): AngularFireList<FileUpload> {
  //   return this._db.list(this.basePath, ref =>
  //     ref.limitToLast(numberItems));
  // }
  //
  // getFile(fileUpload: FileUpload): Observable<any> {
  //   console.info(fileUpload.url);
  //   return this.http.get(fileUpload.url);
  // }

  processGenerateGraph(files: any) {
    this.fileSource.next(files)
  }

}



