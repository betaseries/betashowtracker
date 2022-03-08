import config from "./config";

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
                    return resolve(response);
                }
            );
        } catch {
            return resolve(null);
        }
    });
};
export const connectAccountBS = () => {
    return new Promise((resolve) => {
        try {
            chrome.tabs.create({
                url:
                    config.url_redirect +
                    "/authorize?client_id=" +
                    config.app.api_key +
                    "&redirect_uri=" +
                    config.url_redirect,
            });
        } catch {
            return resolve(null);
        }
    });
};
