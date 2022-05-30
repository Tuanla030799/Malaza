import { $} from '../base/base.js';
export default function loadPaginate(totalPage) {
    const paging = $(".page__paging")
    const page = [...Array(totalPage + 1).keys()].slice(1)
    const htmls = page.map((numberPage) => {
        return `<button class="button-paging number-page" data-id=${numberPage}>${numberPage}</button>`
    })

    paging.innerHTML = `
        <button class="button-paging pre-page"> <i class="fas fa-caret-left"></i></button>
        ${htmls.join('')}
        <button class="button-paging next-page"> <i class="fas fa-caret-right"></i></button>
    `
}
