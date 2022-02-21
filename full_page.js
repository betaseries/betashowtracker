export const checkCookiesFull = (target) => {
    return new Promise((resolve) => {
        try {
            chrome.runtime.sendMessage(
                { type: "checkCookie", name: target },
                function (response) {
                    return resolve(response);
                }
            );
        } catch {
            return resolve(null);
        }
    });
};
export const storageChrome = (typeStorage, key, value) => {
    return new Promise((resolve) => {
        try {
            chrome.runtime.sendMessage(
                { type: "storage", typeStorage, key, value },
                function (response) {
                    return resolve(response);
                }
            );
        } catch {
            return resolve(null);
        }
    });
};
export const forceNetflixUpdate = () => {
    return new Promise((resolve) => {
        try {
            chrome.runtime.sendMessage(
                { type: "forceRefreshNetflix" },
                function (response) {
                    console.log("response :>> ", response);
                    return resolve(response);
                }
            );
        } catch {
            return resolve(null);
        }
    });
};
