<script lang="ts">
    import AutocompleteComponent from "./Components/AutocompleteComponent.svelte";
    import LoginComponent from "./Components/LoginComponent.svelte";
    import ShowsComponent from "./Components/ShowsComponent.svelte";
    import { SvelteToast } from "@zerodevx/svelte-toast";
    import { tokenStore } from "./stores";
    let token = localStorage.getItem("tokenStore");
    tokenStore.subscribe((value) => {
        token = value;
    });
</script>

<main>
    <SvelteToast />
    <h2>Beta Show Tracker</h2>
    {#if !token}
        <LoginComponent />
    {:else}
        <AutocompleteComponent />
        <ShowsComponent />
    {/if}
</main>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }

    main {
        padding: 1em;
        margin: 0 auto;
    }
</style>
