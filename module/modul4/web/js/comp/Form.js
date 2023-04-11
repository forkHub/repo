class Form {
    getValue(name, form) {
        return form.querySelector('input[name="' + name + '"]').value;
    }
}
export const formValue = new Form();
