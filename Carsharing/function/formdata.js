export function checkFormData(formData, length) {
    // checks if form is filled out
    let formfilled = 0;
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
//# sourceMappingURL=formdata.js.map