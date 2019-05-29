const arrayOfFields: any = [];

export const getFields = (query: string, start: number) => {
  const fields = query.split("\n").slice(start - 1);

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i].split("}")[0].trim();
    if (field.indexOf("{") > -1) {
      const nestedField = field.split("{")[0].trim();
      arrayOfFields.push(nestedField);
      i = getNestedFields(fields, nestedField, ++i, fields.length, 1);
    } else if (field !== "") arrayOfFields.push(field);
  }

  return arrayOfFields;
};

const getNestedFields = (
  fields: string[],
  field: string,
  i: number,
  len: number,
  deep: number
) => {
  const f = fields[i].trim();

  if (i < len && deep > 0) {
    if (f.indexOf("{") > -1) {
      const nestedField = field + "." + f.split("{")[0].trim();
      arrayOfFields.push(nestedField);
      return getNestedFields(fields, nestedField, ++i, len, ++deep);
    } else if (f === "}") {
      const tmp = field.split(".").slice(0, deep - 1);
      field = tmp.length > 1 ? tmp.join(".") : tmp[0];
      return getNestedFields(fields, field, ++i, len, --deep);
    } else if (f !== "}") {
      arrayOfFields.push(field + "." + f);
      return getNestedFields(fields, field, ++i, len, deep);
    }
  }

  return --i;
};
