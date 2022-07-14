export function checkFormData(formData: FormData, length: number): boolean {
  // checks if form is filled out
    let formfilled:number = 0;

    for (const entry of formData.values()) {
      if (entry != "") {
        formfilled++;
      }
    }

    if (formfilled == length) {
      return true;
    }

    return false;
  }