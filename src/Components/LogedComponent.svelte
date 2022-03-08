<script lang="ts">
    import { Tab } from "attractions";
    import { t } from "../i18n";
    import AutocompleteComponent from "./AutocompleteComponent.svelte";
    import SettingsComponent from "./SettingsComponent.svelte";
    import ShowsComponent from "./ShowsComponent.svelte";
    import SynchroComponent from "./SynchroComponent.svelte";

    // tab par défaut
    let selectedTab = "trackers_shows";
</script>

<div style="display: flex; justify-content: start">
    <Tab
        value="trackers_shows"
        name="navigation"
        checked={selectedTab === "trackers_shows"}
        on:change={(event) => {
            selectedTab = event.detail.value;
        }}
        bind:group={selectedTab}
    >
        <span class="item-nav">{$t("nav.manage-shows")}</span>
    </Tab>
    <Tab
        value="synchro"
        name="navigation"
        checked={selectedTab === "synchro"}
        on:change={(event) => {
            selectedTab = event.detail.value;
        }}
        bind:group={selectedTab}
    >
        <span class="item-nav">{$t("nav.sync-platform")}</span>
    </Tab>
    <Tab
        value="settings"
        name="navigation"
        checked={selectedTab === "settings"}
        on:change={(event) => {
            selectedTab = event.detail.value;
        }}
        bind:group={selectedTab}
    >
        <span class="item-nav">{$t("nav.settings")}</span>
    </Tab>
</div>
<section class="container-main">
    {#if selectedTab === "trackers_shows"}
        <AutocompleteComponent />
        <ShowsComponent />
    {:else if selectedTab === "synchro"}
        <SynchroComponent />
    {:else if selectedTab === "settings"}
        <SettingsComponent />
    {/if}
</section>
