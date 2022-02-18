<script lang="ts">
    import { SvelteToast } from "@zerodevx/svelte-toast";
    import LogedComponent from "./Components/LogedComponent.svelte";
    import LoginComponent from "./Components/LoginComponent.svelte";
    import { tokenStore } from "./stores";
    let token = localStorage.getItem("tokenStore");
    tokenStore.subscribe((value) => {
        token = value;
    });
</script>

<main>
    <SvelteToast />
    <p class="logo"><img src="/images/logo.png" alt="BetaSeries" /></p>
    {#if !token}
        <LoginComponent />
    {:else}
        <LogedComponent />
    {/if}
</main>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }

    main {
        padding: 1em;
        margin: 1em;
        background-color: white;
    }

    .logo {
        text-align: center;
        margin: 0;
        padding: 0;
    }
    .logo img {
        width: 400px;
    }
</style>
