import { $ } from '../base/base.js';
import { PRODUCT_STORAGE_KEY } from '../base/constant.js';
import validateForm from '../component/validate.js'
import toast from '../component/toast.js';
import { getItemLocal , setItemLocal } from '../component/localstorage.js'

const form = $('#formOrder');


const formOrder = {
    handleEvents: function () {
        form.addEventListener("submit", event => {
            const products =  getItemLocal(PRODUCT_STORAGE_KEY)
            const productIds = products.map((product) => product.id)
            let formData = {
                name: form.name.value,
                email: form.email.value,
                address: form.address.value,
                phone: form.phoneNumber.value,
                productIds: productIds
            }
            event.preventDefault();
            if(validateForm(form) && productIds.length > 0) {
                    const url = `http://localhost:3000/orders`;
                    axios.post(url, formData)
                        .then(res => {
                            toast({
                                title: "Thành công!",
                                message: "Bạn đã đặt hàng thành công.",
                                type: "success",
                                duration: 5000
                            });
                            setItemLocal(PRODUCT_STORAGE_KEY, [])
                        })
                        .catch(error => console.log(error))
            }
        })
    },

    init: function () {
        this.handleEvents();
    },
};

formOrder.init()

