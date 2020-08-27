import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormField } from "../../models/form-field";
import { FieldTypes } from "../../models/field-types.model";
import { FormFieldDialogComponent } from "../form-field-dialog/form-field-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  public buttonsTitles = {
    ADD_FIELD: 'Add a field',
    DELETE_FIELD: 'Remove',
    SUBMIT: 'Submit'
  };
  public title = 'Dynamic Form';
  public form: FormGroup;
  public formFields: FormField[] = [];
  public fieldTypes = FieldTypes;

  @Output() formResults: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  public createForm(): void {
    this.form = new FormGroup({});
  }

  public openFormFieldDialog(): void {
    const dialogRef = this.dialog.open(FormFieldDialogComponent, {
      minWidth: '400px'
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(field => field)
      )
      .subscribe((field: FormField) => this.addFormField(field));
  }

  public addFormField(field: FormField): void {
    this.form.addControl(field.name, this.fb.control(null, field.required ? Validators.required : []));
    this.formFields.push(field);
  }

  public deleteFormField(index: number, formControlName: string): void {
    this.form.removeControl(formControlName);
    this.formFields.splice(index, 1);
  }

  public sendResults(): void {
    this.formResults.emit(this.form.value);
  }
}
