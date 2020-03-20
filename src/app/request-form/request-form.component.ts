import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {
  @Input('isSearchRunning') isSearchRunning: boolean;
  @Output() onSubmitForm = new EventEmitter();
  
  public getWeatherForm: FormGroup;
  public isSearchButtonDisabled: boolean;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.getWeatherForm = formBuilder.group({
      city: '',
    })
  }

  ngOnInit(): void {
    this.checkSearchButtonState();
  }

  private checkSearchButtonState(): void {
    const cityControlValue = this.getWeatherForm.value.city;
    const isFormFilled = cityControlValue && cityControlValue.length;

    this.isSearchButtonDisabled = this.isSearchRunning || !isFormFilled;
  }

  public handleSublit(event: { city: string }): void {
    this.onSubmitForm.emit(event);
  }
}
