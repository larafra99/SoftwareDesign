export function checkformdata(formData, length) {
    let formFilled = 0;
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
//# sourceMappingURL=formdata.js.map