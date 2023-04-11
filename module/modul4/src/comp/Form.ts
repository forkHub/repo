class Form {

    getValue(name: string, form: HTMLFormElement): string {
        return (form.querySelector('input[name="' + name + '"]') as HTMLInputElement).value;
    }
}
export const formValue: Form = new Form();