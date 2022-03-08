window.onload = function () {
    document.querySelectorAll("[data-i18n]").forEach((item) => {
        const translate = trans(item.dataset.i18n);
        if (translate !== item.dataset.trans) item.innerHTML = translate;
    });
};
