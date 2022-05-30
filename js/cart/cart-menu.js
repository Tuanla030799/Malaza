import { $ } from '../base/base.js';
import { PRODUCT_STORAGE_KEY } from '../base/constant.js'
import miniCart from '../component/cart-mini.js'
import { getItemLocal } from '../component/localstorage.js'

const megamenuCart = $(".mega-menu--cart")

const cartMenu = {
    loadCart: function() {
        let products = getItemLocal(PRODUCT_STORAGE_KEY);
        let totalPrice = 0;
        const cart = products.map((product) => {
            totalPrice += product.sell
            return miniCart(product);
        }).join("");
        const htmls = `${cart}
            <div class="mega-menu__price">
                <span class="mega-menu__total">Tổng số</span>
                <span class="card__price">${totalPrice}đ</span></div>
            <div class="button button-dark">Giỏ Hàng</div>
        `
        megamenuCart.innerHTML = htmls;
    },

    init: function () {
        this.loadCart();
    }
}

cartMenu.init();

export default function loadCartMenu() {
    cartMenu.init();
}
