import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data$!: Observable<string>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.data$ = this.dataService.getAdminData();
  }
}
