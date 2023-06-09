import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ICreditCard } from '@app/core/models/creditCard';
import { HttpService } from '@app/core/services/http.service';
import { SnackBarService } from '@app/core/services/snack-bar.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit, AfterViewInit {
  public ELEMENT_DATA!: ICreditCard [];
  public displayedColumns: string [] = ['Name', 'Phone', 'Email', 'State', 'City', 'Emp Type', 'Gender', 'PAN', 'EXt CC', 'Bank', 'Ext CC Bank', 'Max Limit', 'Company', 'Actions'];
  public dataSource = new MatTableDataSource<ICreditCard>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private httpService: HttpService,
    private cdr: ChangeDetectorRef,
    private snackBService:SnackBarService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }


  ngOnInit(): void {
    this.getLoans();
  }

  public getLoans() {
    this.httpService.get('creditCard/users').subscribe(
      (res) => {
        this.ELEMENT_DATA = res.data;
        this.dataSource = new MatTableDataSource<ICreditCard>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      },
      (error) =>{
        console.log(error);
        this.snackBService.openSnackBar(error.message, error.status);
      }
    )
  }

  public delete(event: any) {
    this.httpService.delete(`creditCard/users/${event._id}`).subscribe(
      (res) => {
        this.snackBService.openSnackBar(res.message, res.status);
        this.getLoans();
      },
      (err) => {
        console.log(err);
        this.snackBService.openSnackBar(err.message, err.status);
      }
    )
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
