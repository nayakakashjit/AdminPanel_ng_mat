import { Component, OnInit } from '@angular/core';
import { HttpService } from '@app/core/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private httpService: HttpService,
  ) { }

  ngOnInit() {
    this.httpService.get('homeloan/users').subscribe(
      (res) => console.log(res)
    )
  }

}
