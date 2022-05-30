export default function miniCart(product) {
    return `
        <a href="shopping-cart.html">
            <div class="card card--mini">
                <div class="card__img" style="--aspect-ratio:1;"><img class="card-img" src=${product.src} alt="card"/></div>
                <div class="card-body"> 
                <div class="card-title">${product.title}</div>
                <div class="card__price">${product.sell}đ</div>
                </div>
            </div>
        </a> `
}
