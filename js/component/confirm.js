import { $ } from '../base/base.js';
export default function dialog(title , message, handleConfirm) {
    $('#exampleModalLabel').innerHTML = title;
    $('#modaltext').innerHTML = message
    $('#btnconfirm').addEventListener("click", event => {
        handleConfirm();
    });
}
