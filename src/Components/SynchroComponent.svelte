<script lang="ts">
    import { Dialog, Modal } from "attractions";
    import config from "../../config";
    import { forceNetflixUpdate, storageChrome } from "../../full_page";
    import { t } from "../i18n";
    import { modalStore, serviceSynchroStore } from "../stores";
    import { apiFetch, apiFetchPost } from "../utils/apiFetch";
    import compareNetflixFirst from "../utils/compareNetflixFirst";
    import ItemListPlatform from "./ItemListPlatform.svelte";

    let dataSynchro;
    serviceSynchroStore.subscribe((value) => {
        dataSynchro = value;
    });
    let modalData;
    modalStore.subscribe((value) => {
        modalData = value;
    });

    const checkServices = () => {
        serviceSynchroStore.set([]);
        config.services.forEach(async (service) => {
            apiFetch("/sync/" + service.target).then((res: any) => {
                let dataService: {
                    target: string;
                    synchro: boolean;
                    last_update: string;
                    name: string;
                    link: string;
                };
                dataService = {
                    ...service,
                    synchro: false,
                    last_update: res.last_update,
                };
                if (service.target === "netflix") {
                    dataService.synchro = res?.profile?.length > 0;
                } else if (service.target === "arte") {
                    dataService.synchro = res?.email?.length > 0;
                }
                serviceSynchroStore.update((s: Array<typeof dataService>) => [
                    ...s,
                    dataService,
                ]);
            });
        });
    };
    checkServices();

    const syncProfileNetflix = (
        profile: string,
        guid: string,
        cookieString: string
    ) => {
        let formData = new FormData();
        formData.append("cookie", cookieString);
        formData.append("guid", guid);
        formData.append("profile", profile);
        apiFetchPost("/sync/netflix", formData).then(
            (syncNetflix: { profile: string }) => {
                modalStore.update((m) => ({
                    open: true,
                    type: "connect_netflix",
                    platform: "netflix",
                    profile: syncNetflix.profile,
                }));
                storageChrome(
                    "set",
                    "lastUpdateNetflix",
                    Math.floor(Date.now() / 1000)
                );
                forceNetflixUpdate();
                checkServices();
            }
        );
    };
</script>

<section class="container-list-platforms">
    {$t("explaination-syncro")}
    {#each dataSynchro.sort(compareNetflixFirst) as service}
        <ItemListPlatform {service} {checkServices} />
    {/each}
    {$t("explaination-syncro.sub-title")}
</section>
<Modal bind:open={modalData.open} let:closeCallback>
    <Dialog title="Information" {closeCallback}>
        {#if modalData.type === "disconnect"}
            <p>{$t("modal.logout.label")}</p>
        {:else if modalData.type === "error_cookies"}
            <p>
                {@html $t("modal.error-cookie", {
                    "%name%": modalData.platform,
                    "%link%": modalData.link,
                })}
            </p>
        {:else if modalData.type === "profiles_empty"}
            <p>
                {@html $t("modal.empty-profiles.netflix", {
                    "%name%": modalData.platform,
                })}
            </p>
        {:else if modalData.type === "loading_netflix"}
            <p>{$t("modal.load-account")}</p>
        {:else if modalData.type === "connect_arte"}
            <p>{$t("modal.syncOK.arte")}</p>
        {:else if modalData.type === "connect_netflix"}
            <p>
                {@html $t("modal.syncOK.netflix", {
                    "%login%": modalData.profile,
                })}
            </p>
        {:else if modalData.type === "choice_profile"}
            <p>{$t("modal.choice-profiles.netflix.label")}</p>
            <ul>
                {#each modalData.profiles as profile}
                    <li
                        class="item-select-profile"
                        on:click={() =>
                            syncProfileNetflix(
                                profile.name,
                                profile.guid,
                                modalData.cookiesString
                            )}
                    >
                        {profile.name}
                    </li>
                {/each}
            </ul>
        {/if}
    </Dialog>
</Modal>
