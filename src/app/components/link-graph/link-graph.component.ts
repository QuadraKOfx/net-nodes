import {Component, OnInit,} from "@angular/core";
import {Edge, IEdge} from "../../models/Edge";
import {TaskNode} from "../../models/Node";
import * as d3_zoom from "d3-zoom";
import {FileUploadService} from "../../services/file-upload.service";
import {Subscription} from "rxjs";
import * as d3 from 'd3';
import {GraphService} from "../../services/graph.service";

@Component({
  selector: 'app-link-graph',
  templateUrl: 'link-graph.component.html',
})
export class LinkGraphComponent implements OnInit {

  private svg: any;
  private margin = {top: 10, right: 30, bottom: 30, left: 40};
  private nodeSize: number = 0;
  private width: number;
  private height: number;
  private rows: any = [];
  private edges: IEdge[] = [];
  private _nodes: any = [];
  private selectedFiles?: FileList;

  protected subscription: Subscription = new Subscription();

  constructor(protected fileService: FileUploadService,
              protected gService: GraphService) {
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.width = 960 - this.margin.left - this.margin.right;
  }

  ngOnInit() {
    // Dispatch Subscriptions
    this.dispatchSubs();
    // PREPARE GRAPH SPACE AREA
    this.createSVG();
    // LOAD DATA MATRIX
    d3.text("../assets/adj.csv").then(data => {
      this.rows = d3.csvParseRows(data);
      // NUMBER OF NODES IN OUR DATA
      this.nodeSize = this.rows.length;
      console.info("Number of Nodes: " + this.nodeSize);
      // DECOUPLE && CONSTRUCT EDGES FROM ADJ MATRIX
      this.rows.forEach((row: any, index: number) => {
        const node = new TaskNode(index + 1, index);
        this._nodes.push(node);
        row.forEach((edge: any, indexJ: number) => {
          if (edge === "1") {
            // console.info(index, indexJ);
            const edge = new Edge(index, indexJ);
            this.edges.push(edge);
          }
        })
      })
      this.gService.sendData({nodes: this._nodes, edges: this.edges});
      this.plotEdgeGraph();
    })
  }

  private dispatchSubs(): void {
    this.subscription.add(this.fileService.currentSource.subscribe(value => {
      if (value) {
        console.info(value);
      }
    }));
  }

  private plotEdgeGraph() {
    // INITIALIZE EDGES
    const edge = this.svg
      .append("g")
      .selectAll("line")
      .data(this.edges)
      .enter()
      .append("line")
      .attr("stroke-width", function(d: any) {
        return 3;
    }).style("stroke", "pink");


    // INITIALIZE NODES
    const node = this.svg
      .append("g")
      .selectAll("circle")
      .data(this._nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", function(d: any) {
        return "red";
      })
      .call(d3.drag()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded))

    node.append("title")
      .text((d: any) => d['id']);

    // APPLY FORCE SIMULATION ON NETWORK
    const simulation = d3.forceSimulation(this._nodes)
      .force("link", d3.forceLink().id(function(d:any) {return d['value']}).links(this.edges))
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(this.width / 2, this.height / 2))
      .on("tick", ticked)

    // console.info(this._nodes);
    // console.info(this.edges);

    function dragStarted(event:any, d: any) {
      if (!event.active) { simulation.alphaTarget(0.3).restart()}
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event:any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnded(event:any, d: any) {
      if (!event.active) {simulation.alphaTarget(0)}
      d.fx = null;
      d.fy = null;
    }

    // TODO READ ABOUT TICK EVENTS
    function ticked() {
      edge
        .attr("x1", function(d: any) {return d['source'].x})
        .attr("y1", function(d: any) {return d['source'].y})
        .attr("x2", function(d: any) {return d['target'].x})
        .attr("y2", function(d: any) {return d['target'].y})
      node
        .attr("cx", function(d: any) {return d['x']})
        .attr("cy", function(d: any) {return d['y']})
    }
  }

  private createSVG(): void {
    this.svg = d3.select("#graph")
      .style('border', "solid " + 3 + "px")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")

    const zoom = d3_zoom.zoom().on('zoom', zoomed) as any;
    d3.select("#graph").call(zoom);

    function zoomed(d: any) {
      d3.select("g").attr("transform", d.transform);
    }
  }


}
