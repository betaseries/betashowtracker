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
            })
            .catch((error) => {
                console.log("error", error);
                return sendResponse(null);
            });
    } else if (request.type == "forceRefreshNetflix") {
        localStorage.get("tokenUser").then((tokenUser) => {
            const now = Math.floor(Date.now() / 1000);
            if (tokenUser) {
                localStorage.set("lastUpdateNetflix", now);
                netflixRefresh().then((_) => sendResponse(true));
            }
        });
    } else if (request.type == "storage") {
        switch (request.typeStorage) {
            case "get":
                localStorage
                    .get(request.key)
                    .then((resp) => sendResponse(resp));
                break;
            case "set":
                localStorage.set(request.key, request.value, () =>
                    sendResponse(true)
                );
                break;

            case "remove":
                localStorage.remove(request.key, request.value, () =>
                    sendResponse(true)
                );
                break;

            case "clear":
                localStorage.clear();
                sendResponse(true);
                break;
        }
    }
    return true;
});

// permet de lancer la syncro auto toutes les 6 heures
chrome.tabs.onUpdated.addListener(async (_, __, tab) => {
    if (tab.status === "complete") {
        const lastUpdateNetflix = await localStorage.get("lastUpdateNetflix");
        const tokenUser = await localStorage.get("tokenUser");
        const now = Math.floor(Date.now() / 1000);
        if (
            tokenUser &&
            lastUpdateNetflix &&
            lastUpdateNetflix + 60 * 60 * 6 < now
        ) {
            console.log("Refresh Netflix");
            localStorage.set("lastUpdateNetflix", now);
            netflixRefresh();
        }
    }
});
