import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IBusinessLoan } from '@app/core/models/businessLoan';
import { HttpService } from '@app/core/services/http.service';
import { SnackBarService } from '@app/core/services/snack-bar.service';


@Component({
  selector: 'app-business-loan',
  templateUrl: './business-loan.component.html',
  styleUrls: ['./business-loan.component.css']
})
export class BusinessLoanComponent implements OnInit {

  public ELEMENT_DATA!: IBusinessLoan [];
  public displayedColumns: string [] = ['Name', 'Phone', 'Email', 'State', 'City', 'Emp Type', 'Years in operation', 'Turnover', 'Current a/c', 'Bank', 'GST', 'Actions'];
  public dataSource = new MatTableDataSource<IBusinessLoan>(this.ELEMENT_DATA);

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
    this.httpService.get('business/users').subscribe(
      (res) => {
        console.log(res);
        this.ELEMENT_DATA = res.data;
        this.dataSource = new MatTableDataSource<IBusinessLoan>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      },
      (error) =>{
        console.log(error);
        this.snackBService.openSnackBar(error.message, error.status);
      }
    )
  }

  public delete(event: any) {
    this.httpService.delete(`business/users/${event._id}`).subscribe(
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
