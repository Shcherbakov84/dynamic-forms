import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { FieldTypes } from "../../models/field-types.model";
import { FormField } from "../../models/form-field";

interface FieldType {
  value: FieldTypes;
  label: string;
}

@Component({
  selector: 'form-field-dialog',
  templateUrl: './form-field-dialog.component.html',
  styleUrls: ['./form-field-dialog.component.scss']
})
export class FormFieldDialogComponent implements OnInit {
  public readonly buttonsTitles = {
    SUBMIT: 'Add',
    CANCEL: 'Cancel'
  };
  public form: FormGroup;
  public readonly controlsKeys = {
    LABEL: 'label',
    NAME: 'name',
    TYPE: 'type',
    REQUIRED: 'required'
  };
  public readonly fieldLabels = {
    LABEL: 'Field label',
    NAME: 'Field name',
    TYPE: 'Field type',
    REQUIRED: 'Required'
  };
  public fieldTypes: FieldType[] = [
    {
      value: FieldTypes.SINGLE,
      label: 'Single Line Text'
    },
    {
      value: FieldTypes.MULTIPLE,
      label: 'Multi Line Text'
    },
    {
      value: FieldTypes.DATE,
      label: 'Date'
    },
    {
      value: FieldTypes.NUMBER,
      label: 'Number'
    }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormFieldDialogComponent>
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  public createForm(): void {
    this.form = this.fb.group({
      [this.controlsKeys.LABEL]: [null, [Validators.required]],
      [this.controlsKeys.NAME]: [null, [Validators.required]],
      [this.controlsKeys.TYPE]: [null, [Validators.required]],
      [this.controlsKeys.REQUIRED]: [null, []]
    });
  }

  public saveFormField(): void {
    const field: FormField = {
      label: this.getFormControlValue(this.controlsKeys.LABEL),
      name: this.getFormControlValue(this.controlsKeys.NAME),
      type: this.getFormControlValue(this.controlsKeys.TYPE),
      required: this.getFormControlValue(this.controlsKeys.REQUIRED)
    };

    this.dialogRef.close(field);
  }

  private getFormControlValue(key: string): any {
    return this.form.get(key) && this.form.get(key).value;
  }

  public closeDialog(): void {
    this.dialogRef.close(null);
  }

}
