import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public titles = {
    RESULTS: 'Form Submit Results'
  };

  public formResults = null;

  public storeResults(results) {
    this.formResults = results;
  }

}
