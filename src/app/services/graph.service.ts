import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private graphData = new BehaviorSubject(null);
  data: Observable<any> = this.graphData.asObservable();

  sendData(data: any): void {
    this.graphData.next(data);
  }

  getData(): Observable<any> {
    return this.data;
  }
}
