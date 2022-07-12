export function checkformdata(formData: FormData, length: number): boolean {
    let formFilled:number = 0;

    for (const entry of formData.values()) {
      if (entry != "") {
        formFilled++;
      }
    }

    if (formFilled == length) {
      return true;
    }

    return false;
  }