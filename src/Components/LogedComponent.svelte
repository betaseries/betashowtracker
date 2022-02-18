<script lang="ts">
    import { Tab } from "attractions";
    import { t } from "../i18n";
    import AutocompleteComponent from "./AutocompleteComponent.svelte";
    import SettingsComponent from "./SettingsComponent.svelte";
    import ShowsComponent from "./ShowsComponent.svelte";
    import SynchroComponent from "./SynchroComponent.svelte";

    let selectedTab = "synchro";
</script>

<div style="display: flex; justify-content: start">
    <Tab
        value="trackers_shows"
        name="navigation"
        checked={selectedTab === "trackers_shows"}
        on:change={(event) => {
            selectedTab = event.detail.value;
        }}
        bind:group={selectedTab}>{$t("nav.manage-shows")}</Tab
    >
    <Tab
        value="synchro"
        name="navigation"
        checked={selectedTab === "synchro"}
        on:change={(event) => {
            selectedTab = event.detail.value;
        }}
        bind:group={selectedTab}>{$t("nav.sync-platform")}</Tab
    >
    <Tab
        value="settings"
        name="navigation"
        checked={selectedTab === "settings"}
        on:change={(event) => {
            selectedTab = event.detail.value;
        }}
        bind:group={selectedTab}>{$t("nav.settings")}</Tab
    >
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
