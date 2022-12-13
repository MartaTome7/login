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
  inputNumeroSala: any;
  displayedColumns: string[] = ['numero', 'capacidade'];
  totalRows = 100;
  currentPage = 0;
  pageSizeOptions: number[] = [2, 4, 6];
  pageSize = this.pageSizeOptions[this.pageSizeOptions.length - 1];
  isLoading: boolean = false;

  constructor(
    private httpSalasService: HttpSalasService,
    private router: Router
  ) {}

  @ViewChild('paginatorSalas') paginator: MatPaginator;

  ngOnInit() {
    this.getAllSalas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  pageChanged(event: PageEvent) {
    this.totalRows = event.length;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getAllSalas();
  }

  getAllSalas() {
    this.isLoading = true;
    this.httpSalasService
      .getAll(this.currentPage + 1, this.pageSize)
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.items;
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = response.totalCount;
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
