import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { HttpService } from '@app/core/services/http.service';
import { IHomeLoan } from '../../../../core/models/homeLoan'


@Component({
  selector: 'app-home-loan',
  templateUrl: './home-loan.component.html',
  styleUrls: ['./home-loan.component.css']
})
export class HomeLoanComponent implements OnInit, AfterViewInit  {
  public ELEMENT_DATA!: IHomeLoan [];
  public displayedColumns: string [] = ['Name', 'Phone', 'Email', 'Company', 'State', 'City', 'Resident', 'Bank', 'WP', 'Actions'];
  public dataSource = new MatTableDataSource<IHomeLoan>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
    private httpService: HttpService,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.httpService.get('homeloan').subscribe(
      (res) => {
        this.ELEMENT_DATA = res.data;
        this.dataSource = new MatTableDataSource<IHomeLoan>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

}
