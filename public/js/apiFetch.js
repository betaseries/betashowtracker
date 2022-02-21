const api_url = "https://api.betaseries.com";
const api_key = "9676a6078b37";
const apiFetch = async (url) => {
    const token = await localStorage.get("tokenUser");
    return new Promise((resolve, reject) => {
        fetch(api_url + url, {
            method: "GET",
            headers: new Headers({
                "X-BetaSeries-Key": api_key,
                "X-BetaSeries-Token": token,
            }),
        })
            .then((res) => res.json())
            .then((resp) => resolve(resp))
            .catch((err) => reject({ error: err }));
    });
};
const apiFetchPost = async (url, body = {}) => {
    const token = await localStorage.get("tokenUser");
    return new Promise((resolve, reject) => {
        fetch(api_url + url, {
            method: "POST",
            headers: new Headers({
                "X-BetaSeries-Key": api_key,
                "X-BetaSeries-Token": token,
            }),
            body,
        })
            .then((res) => res.json())
            .then((resp) => resolve(resp))
            .catch((err) => reject({ error: err }));
    });
};
