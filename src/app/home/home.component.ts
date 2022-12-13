import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpSalasService } from '../services/httpsalas.service';
import { Sala } from '../services/sala';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  submitted: boolean = false;
  dataSource: MatTableDataSource<Sala> = new MatTableDataSource<Sala>();
  errorMessage: any;
  displayedColumns: string[] = ['numero', 'capacidade'];
  isLoading: boolean = false;

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  currentPage: number;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent;

  constructor(
    private httpSalasService: HttpSalasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllSalas();
  }

  ngAfterViewInit() {}

  getAllSalas() {
    this.isLoading = true;
    this.httpSalasService.getAll(0, 0).subscribe({
      next: (response) => {
        this.dataSource.data = response.items;
        setTimeout(() => {
          this.pageIndex = this.currentPage;
          this.length = response.totalCount;
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Request failed with error' + error),
          console.error(error.status);
        if (error.status === 404) {
          alert('Não existem salas na base de dados.'),
            (this.dataSource.data = []);
        } else if (error.status === 0) {
          // mandar de volta para o login
          this.router.navigate(['/login']);
        }
        this.errorMessage = error;
      },
      complete: () => {
        //console.error('Request completed');
        this.isLoading = false;
      },
    });
  }
}
