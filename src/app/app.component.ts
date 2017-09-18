import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DForm } from './dynamic-form/model/dynamic-form.model';
import { DynamicControlService } from './dynamic-form/service/dynamic-control.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: DForm;
  title = 'app';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.form = new DForm();
    this.getFormJson();
  }

  getFormJson() {
    this.http.get<DForm>('/assets/EXAMPLE.json')
      .subscribe(f => {
        this.form = f;
        console.log(f);
      });
  }

}
