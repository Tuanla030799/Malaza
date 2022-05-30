import { $ } from '../base/base.js';
import { PRODUCT_STORAGE_KEY } from '../base/constant.js'
import dialog from '../component/confirm.js'
import { getItemLocal , setItemLocal } from '../component/localstorage.js'

const tableCart = $(".table-card__tbody")
const btnDelete = $(".delete-product")

const shoppingCart = {
    products: getItemLocal(PRODUCT_STORAGE_KEY),

    loadProduct: function() {
        const htmls = this.products.map((product) => {
            return `
                <tr>
                    <td><img src=${product.src} alt=""/></td>
                    <td>${product.title}</td>
                    <td>${product.sell}</td>
                    <td>1</td>
                    <td>345.000đ</td>
                    <td>
                        <a data-bs-toggle='modal' href='#exampleModal' role='button'>
                        <i class="fas fa-trash-alt cart__delete" data-id='${product.id}'></i>
                        </a>
                    </td>
                </tr>
            `
        })

        tableCart.innerHTML = htmls.join("");
    },

    handleEvents: function() {
        const _this = this

        //delete product
        tableCart.addEventListener("click", e => {
            if (e.target.closest(".cart__delete")) {
                let idDelete = Number(e.target.closest(".cart__delete").dataset.id)
                dialog('Delete product','Do you want delete product?',
                    function() {
                        _this.products = _this.products.filter((product) => product.id !== idDelete)
                        setItemLocal(PRODUCT_STORAGE_KEY, _this.products)
                        _this.loadProduct()
                    }
                );
            };
        })

        //delete all product 
        btnDelete.addEventListener("click", event => {
            console.log("first", 123)
            dialog('Delete product','Do you want delete product?',
                function() {
                    setItemLocal(PRODUCT_STORAGE_KEY, [])
                    _this.loadProduct()
                }
            );
        })
    },

    init: function () {
        this.loadProduct();
        this.handleEvents();
    }
}

shoppingCart.init();
