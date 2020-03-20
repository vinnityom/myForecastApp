import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {
  @Input('isSearchRunning') isSearchRunning: boolean;
  @Input('querySubscription') querySubscription: Subscription;
  @Input('searchParams') searchParams: Observable<any>;

  @Output() onSubmitForm = new EventEmitter();
  
  public getWeatherForm: FormGroup;
  public isSearchButtonDisabled: boolean;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.getWeatherForm = formBuilder.group({
      city: '',
    });
  }

  ngOnInit(): void {
    this.checkSearchButtonState();

    const childQuerySubscription = this.searchParams.subscribe(({ city }) => {
      if (!!city) {
        this.getWeatherForm.patchValue({ city });
      }
    });

    this.querySubscription.add(childQuerySubscription);
  }

  private checkSearchButtonState(): void {
    const cityControlValue = this.getWeatherForm.value.city;
    const isFormFilled = cityControlValue && cityControlValue.length;

    this.isSearchButtonDisabled = this.isSearchRunning || !isFormFilled;
  }

  public handleSubmit(event: { city: string }): void {
    this.onSubmitForm.emit(event);
  }
}
