export default function productGrids(product) {
    return `
        <div class="product__item col-6 col-lg-4">
            <div class="product__card">
                <div class="card">
                    <div style="--aspect-ratio:231/267;">
                        <img class="card-img-top" src=${product.src} alt="">
                    </div>
                    <div class="card-body">
                        <div class="card__brand">${product.brand}</div>
                        <div class="card__title py-3">${product.title}</div>
                        <div class="card__price">
                            <span>${product.sell}</span>
                            <span class="old-price ms-2">${product.price ? product.price : ""}</span>
                        </div>
                    </div>
                    <div class="card__button">
                        <button class="button button-product button__buy" data-value='${JSON.stringify(product)}'>Mua Hàng</button>
                        <button class="button button-like"> <i class="fa-solid fa-heart"></i></button>
                        <button class="button button-product"><i class="fas fa-sync"></i></button>
                    </div>
                </div>
            </div>
            <a href="detail.html"></a>
        </div>
    `
}
