import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { IInstaLoan } from '@app/core/models/instaLoan';
import { HttpService } from '@app/core/services/http.service';
import { SnackBarService } from '@app/core/services/snack-bar.service';

@Component({
  selector: 'app-insta-loan',
  templateUrl: './insta-loan.component.html',
  styleUrls: ['./insta-loan.component.css']
})
export class InstaLoanComponent implements OnInit, AfterViewInit {

  public ELEMENT_DATA!: IInstaLoan [];
  public displayedColumns: string [] = ['Name', 'Phone', 'Email', 'Office Email', 'Company', 'State', 'City', 'Salary', 'Loan amount', 'Bank', 'PAN', 'Actions'];
  public dataSource = new MatTableDataSource<IInstaLoan>(this.ELEMENT_DATA);

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
    this.httpService.get('insta/users').subscribe(
      (res) => {
        this.ELEMENT_DATA = res.data;
        this.dataSource = new MatTableDataSource<IInstaLoan>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      },
      (error) =>{
        console.log(error);
        this.snackBService.openSnackBar(error.message, error.status);
      }
    )
  }

  public delete(event: any) {
    this.httpService.delete(`insta/users/${event._id}`).subscribe(
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
