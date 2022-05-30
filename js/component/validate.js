import toast from '../component/toast.js';
export default function validateForm(form) {
    let errorForm = [];
    const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validPhoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if(!form.name.value.trim()) {
        form.name.focus()
        errorForm.push("Trường họ tên nhập không hợp lệ vui lòng nhập lại.")
    } 
    if (form.address.value === "" || form.address.value.length < 10) {
        form.address.focus()
        errorForm.push("Trường địa chỉ nhập không hợp lệ vui lòng nhập lại.")
    } 
    if (form.email.value === "" || !form.email.value.match(validEmailRegex)) {
        form.email.focus()
        errorForm.push("Trường email nhập không hợp lệ vui lòng nhập lại.")
    } 
    if (form.phoneNumber.value === "" || !form.phoneNumber.value.match(validPhoneRegex)) {
        form.phoneNumber.focus()
        errorForm.push("Trường số điện thoại nhập không hợp lệ vui lòng nhập lại.")
    }

    if (errorForm.length > 0) {
        errorForm.forEach(element => {
            toast({
                title: "Thất bại!",
                message: element,
                type: "error",
                duration: 5000
            });
        });
        return false
    }
    return true;
}
