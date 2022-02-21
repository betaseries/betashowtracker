<script lang="ts">
    import dayjs from "dayjs";
    import {
        checkCookiesFull,
        forceNetflixUpdate,
        storageChrome,
    } from "../../full_page";
    import { t } from "../i18n";
    import { modalStore } from "../stores";
    import { apiFetchDelete, apiFetchPost } from "../utils/apiFetch";
    import Close from "./svg/Close.svelte";
    import Refresh from "./svg/Refresh.svelte";
    export let service;
    export let checkServices;
    function callNetflixHome() {
        return new Promise((resolve, reject) => {
            fetch("https://www.netflix.com/browse")
                .then((resp) => resp.text())
                .then((e) => {
                    const data = e
                        .match(/<script>window.netflix(.*?)<\/script>/gm)
                        .find((i) => i.match("profilesList"));
                    if (!data) return reject();
                    return resolve(data);
                })
                .catch((err) => reject(err));
        });
    }

    const syncAccount = (service) => {
        const { target, link } = service;
        checkCookiesFull(target).then((data) => {
            if (!data) {
                console.log("Erreur de check cookie");
                modalStore.update((m) => ({
                    open: true,
                    type: "error_cookies",
                    platform: target,
                    link,
                }));
                return;
            }
            switch (target) {
                case "arte":
                    const body = new FormData();
                    body.append("token", data.cookiesCompute["lr-user--token"]);
                    apiFetchPost("/sync/arte", body).then(
                        (resp: { email?: string }) => {
                            if (resp.email) {
                                checkServices();
                                modalStore.update((m) => ({
                                    open: true,
                                    type: "connect_arte",
                                    platform: target,
                                }));
                            }
                        }
                    );
                    break;
                case "netflix":
                    modalStore.update(() => ({
                        open: true,
                        type: "loading_netflix",
                        platform: target,
                    }));
                    callNetflixHome().then((html: string) => {
                        let formData = new FormData();
                        let cookiesString = "";
                        data.checkAllCookies.forEach((c, i) => {
                            cookiesString += `${c.name}=${c.value}${
                                data.checkAllCookies.length - 1 !== i
                                    ? "; "
                                    : ""
                            }`;
                        });
                        formData.append("cookie", cookiesString);
                        formData.append("html", html);
                        apiFetchPost("/sync/netflix_profiles", formData).then(
                            (resp: { profiles: Array<{}> }) => {
                                if (resp?.profiles?.length === 0) {
                                    modalStore.update(() => ({
                                        open: true,
                                        type: "profiles_empty",
                                        platform: target,
                                    }));
                                    return;
                                }
                                modalStore.update(() => ({
                                    open: true,
                                    type: "choice_profile",
                                    platform: target,
                                    profiles: resp.profiles,
                                    cookiesString,
                                }));
                            }
                        );
                    });
                    break;
                default:
                    break;
            }
        });
    };

    const disconnect = (platform: "netflix" | "arte") => {
        apiFetchDelete("/sync/" + platform).then((_) => {
            if (platform === "netflix") {
                storageChrome("remove", "lastUpdateNetflix");
            }
            modalStore.update(() => ({
                open: true,
                type: "disconnect",
                platform,
            }));
            checkServices();
        });
    };

    const displayLastUpdate = (timeUpdate) =>
        timeUpdate && timeUpdate !== "0"
            ? dayjs.unix(timeUpdate).format("DD/MM/YYYY")
            : $t("thumbnails.label.never-synced");
</script>

<div class="item-list-platforms">
    <img src="/images/{service.target}.jpg" alt={service.name} />
    <span>
        <p>
            <strong>{service.name}</strong><br />
            {#if service.synchro}
                <span class="green">{$t("thumbnails.label.synced")}</span>
                {#if service.target !== "arte"}
                    <span
                        class="container-svg-action"
                        on:click={() => syncAccount(service)}
                    >
                        <Refresh />
                    </span>
                {/if}
                <span
                    class="container-svg-action"
                    on:click={() => disconnect(service.target)}
                >
                    <Close />
                </span>
                <br />
                <span>
                    {$t("thumbnails.label.last-sync")}
                    <br />
                    {displayLastUpdate(service.last_update)}
                </span>
                {#if service.target === "netflix"}
                    <br />
                    <span
                        class="action-force-reload"
                        on:click={() =>
                            forceNetflixUpdate().then((_) => {
                                console.log("check");
                                checkServices();
                            })}
                    >
                        {$t("thumbnails.label.forceing-sync")}
                    </span>
                {/if}
            {:else}
                <span class="link_sync" on:click={() => syncAccount(service)}>
                    {$t("thumbnails.label.sync")}
                </span>
            {/if}
        </p>
    </span>
</div>
