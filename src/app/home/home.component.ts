import { Component, OnInit, OnChanges, Input, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { debounceTime, distinctUntilChanged, pluck } from 'rxjs/operators';
import { FixerService } from '../services/fixer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SnotifyService } from 'ng-snotify';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ FixerService, NgxSpinnerService, SnotifyService ],
})
export class HomeComponent implements OnInit {

  public exchangeForm: FormGroup;

  public symbols: Object = {
    'EUR': 'Euro',
    'USD': 'United States Dollar'
  };

  public latest: Object = {
    'rates': {
      'EUR': 1,
    }
  };

  constructor(private fixerService: FixerService,
              private spinner: NgxSpinnerService,
              private snotifyService: SnotifyService ) {}


  ngOnInit() {
    // [from][amount] [to][resutl]
    this.exchangeForm = new FormGroup ({
      from: new FormControl('EUR', [
        Validators.required,
      ]),
      to: new FormControl('USD', [
        Validators.required,
      ]),
      amount: new FormControl('1', [
        Validators.required,
      ]),
    });

    // API
    this.spinner.show();
    forkJoin(
      this.fixerService.symbols$(),
      this.fixerService.latest$()
    )
    .subscribe( result => {
      this.spinner.hide();
      if (result[0]['success'] && result[1]['success']) {
        this.symbols  = result[0]['symbols'];
        this.latest   = result[1];
      } else {
        console.error('API SERVICE ERROR');
      }
    });
  }

  inputInstance ( inputName: string ) {
    return this.exchangeForm.get(inputName);
  }

  errorMessages ( inputName: string ) {
    const inputInstance = this.exchangeForm.get( inputName );
    let error: string;

    switch ( inputName ) {
      case 'base':
        error = inputInstance
                  .hasError('required') ? 'El campo es obligatorio.' : '';
        break;
    }

    return error;
  }

  onSubmit() {
    console.log('Value to query', this.exchangeForm.value);
  }

}


  // fixerSource () {

  // }

      // this.fixerService.symbols()
    //   .subscribe(symbols => {
    //     this.spinner.hide();
    //     console.log('symbols:', symbols);
    //   });

    //   this.exchangeForm.get('base')
    //     .valueChanges
    //     .pipe(
    //       debounceTime(1000),
    //       distinctUntilChanged()
    //     )
    //     .subscribe(val => {
    //       console.log(`My name is ${val}.`);
    //     });

    // this.fixerSource();