import { FieldTypes } from "./field-types.model";

export interface FormField {
  name: string;
  label: string;
  type: FieldTypes | string;
  required: boolean;
}
