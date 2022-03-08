function readCookies(name) {
    return new Promise((resolve) => {
        chrome.cookies.getAll({ name }, function (r) {
            let response = null;
            if (r && r[0]) {
                response = r[0];
            }
            resolve(response);
        });
    });
}
function checkCookies(serviceName) {
    if (
        !listCookies ||
        !listCookies[serviceName] ||
        listCookies[serviceName].length === 0
    )
        return null;

    return listCookies[serviceName].map((item) => readCookies(item));
}
