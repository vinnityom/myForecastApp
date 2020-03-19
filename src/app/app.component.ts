import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-forecast-app';

  public getWetherForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.getWetherForm = formBuilder.group({
      city: '',
    })
  }
  
  public onGetWether(formValue: { city: string }): void {
    
  }
}
