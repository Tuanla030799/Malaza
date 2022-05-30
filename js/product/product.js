import { $, $$ } from '../base/base.js';
import { PRODUCT_STORAGE_KEY } from '../base/constant.js'
import toast from '../component/toast.js';
import productGrids from '../component/product-grid.js'
import { getItemLocal, setItemLocal } from '../component/localstorage.js'
import loadPaginate from '../component/pagination.js';
import loadCartMenu from '../cart/cart-menu.js'


const productList = $("#product-grid");
const page = $(".page__paging");
const productTag = $("#product-filter")

const product = {
    currentPage: 1,
    pageLimit: 6,
    totalPage: 0,
    data: {},

    fetchProduct: function (data) {
        let products = [];
        const url = `http://localhost:3000/products`;
        const paging =  {
            _page: this.currentPage,
            _limit: this.pageLimit
        };
        const params = { ...paging, ...data}
        axios.get(url, { params })
            .then(res => {
                products = res.data.data
                const pagination = res.data.pagination
                this.currentPage = pagination._page
                this.pageLimit = pagination._limit
                this.totalPage = pagination._totalRows
                const pageSize = Math.ceil(this.totalPage/this.pageLimit)
                loadPaginate( this.currentPage, pageSize)
                
                const htmls = products.map((product) => {
                    return productGrids(product)
                });
                productList.innerHTML = htmls.join("");
            })
            .catch(error => console.log(error))
    },

    handleEvents: function () {
        const _this = this
        let productCart = getItemLocal(PRODUCT_STORAGE_KEY) ? getItemLocal(PRODUCT_STORAGE_KEY) : [];
        productList.addEventListener("click", e => {
            if (e.target.closest(".button__buy")) {
                productCart.push(JSON.parse(e.target.closest(".button__buy").dataset.value))
                setItemLocal(PRODUCT_STORAGE_KEY, productCart)
                loadCartMenu()
                toast({
                    title: "Thành công!",
                    message: "Bạn đã thêm sản phẩm vào giỏ hàng.",
                    type: "success",
                    duration: 5000
                });
            } else {
                toast({
                    title: "Thất bại!",
                    message: "Có lỗi xảy ra, vui lòng thử lại.",
                    type: "error",
                    duration: 5000
                });
            }
        })

        page.addEventListener("click", e => {
            if (e.target.closest(".pre-page")) {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.fetchProduct()
                }
            }
        });
    
        page.addEventListener("click", e => {
            if (e.target.closest(".next-page")) {
                const pageSize = this.totalPage/this.pageLimit
                if (this.currentPage < Math.ceil(pageSize)) {
                    this.currentPage++;
                    this.fetchProduct()
                }
            }
        });

        page.addEventListener("click", e => {
            if (e.target.closest(".number-page")) {
                this.currentPage = e.target.closest(".number-page").dataset.id
                this.fetchProduct()
            }
        });

        //handle fillter
        
        productTag.addEventListener("click", tag => {
            if (tag.target.closest(".button-tag-product")) {
                // tag active
                if(tag.target.closest(".button-tag--active")) {
                    // tag.target.classList.remove("button-tag--active");
                    $(".button-tag--active").classList.remove("button-tag--active")
                } else {
                    if($(".button-tag--active")) {
                        $(".button-tag--active").classList.remove("button-tag--active")
                    }
                    tag.target.classList.add("button-tag--active");
                    const params = {
                        brand: tag.target.closest(".button-tag--active").dataset.value,
                    }
                    this.fetchProduct(params)
                }
            }
        })
    },

    start: function () {
        this.fetchProduct();
        this.handleEvents();
    },
};

product.start()
