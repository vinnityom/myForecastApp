import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent {
  @Output() onSubmitForm = new EventEmitter();
  
  public getWeatherForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.getWeatherForm = formBuilder.group({
      city: '',
    })
  }

  public handleSublit(event: { city: string }): void {
    this.onSubmitForm.emit(event);
  }
}
