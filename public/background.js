const listCookies = {
    netflix: [
        "NetflixId",
        "SecureNetflixId",
        "cL",
        "OptanonConsent",
        "nfvdid",
        "memclid",
        "clSharedContext",
    ],
    arte: ["lr-user--token"],
    canalPlus: ["passId", "sessionId"],
};
try {
    importScripts(
        "./checkCookies.js",
        "./js/netflixRefresh.js",
        "./js/storage.js",
        "./js/apiFetch.js"
    );
} catch (e) {
    console.error(e);
}

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    if (request.type == "checkCookie") {
        Promise.all(checkCookies(request.name))
            .then((cookies) => {
                const checkAllCookies = cookies.filter(Boolean);
                if (cookies.length !== checkAllCookies.length)
                    return sendResponse(null);
                const cookiesCompute = checkAllCookies.reduce(
                    (acc, item) => ({ ...acc, [item.name]: item.value }),
                    {}
                );
                sendResponse({ cookiesCompute, checkAllCookies });
                return true;
            })
            .catch((error) => {
                console.log("error", error);
                return sendResponse(null);
            });
        return true;
    } else if (request.type == "forceRefreshNetflix") {
        localStorage.get("tokenUser").then((tokenUser) => {
            const now = Math.floor(Date.now() / 1000);
            if (tokenUser) {
                localStorage.set("lastUpdateNetflix", now);
                netflixRefresh();
            }
            return true;
        });
    } else if (request.type == "storage") {
        switch (request.typeStorage) {
            case "get":
                localStorage
                    .get(request.key)
                    .then((resp) => sendResponse(resp));
                return true;
            case "set":
                localStorage.set(request.key, request.value, () =>
                    sendResponse(true)
                );
                return true;
            case "remove":
                localStorage.remove(request.key, request.value, () =>
                    sendResponse(true)
                );
                return true;
            case "clear":
                localStorage.clear();
                sendResponse(true);
                return true;
        }
        return true;
    }
    return true;
});
chrome.tabs.onUpdated.addListener(async (r, changeInfo, tab) => {
    if (tab.status === "complete") {
        const lastUpdateNetflix = await localStorage.get("lastUpdateNetflix");
        const tokenUser = await localStorage.get("tokenUser");
        const now = Math.floor(Date.now() / 1000);
        console.log("lastUpdateNetflix", lastUpdateNetflix);
        console.log("now", now);
        console.log("tokenUser", tokenUser);
        if (
            tokenUser &&
            lastUpdateNetflix &&
            lastUpdateNetflix + 60 * 60 * 6 < now
        ) {
            console.log("New DATE", now);
            localStorage.set("lastUpdateNetflix", now);
            netflixRefresh();
        }
    }
});
