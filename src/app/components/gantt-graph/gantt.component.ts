import {Component, Input, OnInit} from "@angular/core";
import {INode} from "../../models/Node";
import {IEdge} from "../../models/Edge";
import * as d3 from 'd3';
import {Subscription} from "rxjs";
import {GraphService} from "../../services/graph.service";

@Component({
  selector: 'gantt-graph',
  templateUrl: 'gantt.component.html'
})
export class GanttComponent implements OnInit {

  nodes: INode[] = [];
  edges: IEdge[] = [];

  constructor(protected gService: GraphService) {
  }

  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.dispatchSubs();
    // LOAD DATA FROM PREVIEWS VIEW
    // LOAD NODE PROPERTIES ( LOCALLY )
    // THEN CONSTRUCT TEMP OBJECT FOR GANTT VISUALS
    d3.text("../assets/FSDnodeProperties.csv").then(data => {
      // console.info(data);
      const filtered = data.split('\n').slice(1);
      const newCSV = filtered.join('\n');
      const rows = d3.csvParseRows(newCSV);
      // console.info(this.nodes);
      rows.forEach(node => {
        // console.info(this.nodes[+node[0]])
        this.nodes[+node[0] - 1].eDate = node[2];
        this.nodes[+node[0] - 1].sDate = node[1];
      })
    })
  }

  private dispatchSubs() {
    this.subscription.add(this.gService.data.subscribe((data: any) => {
      this.nodes = data['nodes'];
      this.edges = data['edges'];
    }))
  }
}
