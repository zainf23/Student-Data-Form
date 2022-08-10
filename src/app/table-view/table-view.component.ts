import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  public showStudentHeader: boolean = true;
  public showEmailHeader: boolean = true;
  public showIdHeader: boolean = true;
  public showStatusHeader: boolean = true;
  public data: any;
  public headers: Array<string> = new Array<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public filterFunction(column: number): void {
    let input: any, filter, table: any, tr, td, txtValue;
    switch(column) {
      case 0:
        input = document.getElementById("nameQuery");
        break;
      case 1:
        input = document.getElementById("emailQuery");
        break;
      case 2:
        input = document.getElementById("idQuery");
        break;
      case 3:
        input = document.getElementById("statusQuery")
        break;
    }
    filter = input.value.toUpperCase();
    console.log(filter);
    table = document.getElementById("dataTable");
    tr = table.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
      console.log(column);
      td = tr[i].getElementsByTagName("td")[column];
      console.log(td);
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

  public checkSubmit() {
    let self = this;
    let csvFile: any = document.getElementById("excelFile");
    let input = csvFile.files[0];
    let reader = new FileReader();
    let seperator = ",";
    reader.onload = function(e: any) {
      let text = e.target.result.toString();
      self.data = self.csvToArray(text, seperator);
      console.log(self.data);
    };
    reader.readAsText(input);
  }

  public csvToArray(str: string, delimiter: string) {
    let self = this;
    self.headers = (str.slice(0, str.indexOf("\n")).split(delimiter));
    let rows = str.slice(str.indexOf("\n")+1).split("\n");
    for (let i=0; i<self.headers.length; i++) {
      self.headers[i] = self.headers[i].replace(/\W|\s/g, '').toUpperCase();
    }
    let arr: any = rows.map(function (row) {
      let values = row.split(delimiter);
      let el = self.headers.reduce(function (object: any, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });
    return arr;
  }

}
