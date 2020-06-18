
export function validateFieldsByForm(form, fields = null, opts = {}) {
  return new Promise(resolve => {
    form.validateFields(fields, opts, (errors, values) => {
      if (errors) resolve(false)
      else resolve(values)
    })
  })
}

export function validateFieldsAndScrollByForm(form, fields = null, opts = {}) {
  return new Promise(resolve => {
    form.validateFieldsAndScroll(fields, opts, (errors, values) => {
      if (errors) resolve(false)
      else resolve(values)
    })
  })
}
