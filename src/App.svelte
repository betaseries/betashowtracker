<script lang="ts">
    import { SvelteToast } from "@zerodevx/svelte-toast";
    // Add import for each language
    import "dayjs/locale/fr";
    import { storageChrome } from "../full_page";
    import LogedComponent from "./Components/LogedComponent.svelte";
    import LoginComponent from "./Components/LoginComponent.svelte";
    import { tokenStore } from "./stores";
    let token = localStorage.getItem("tokenStore");
    function updateToken() {
        storageChrome("get", "tokenUser").then((resp) => {
            if (resp) {
                document.body.style.height = "600px";
                tokenStore.update(() => resp);
            }
        });
    }
    updateToken();
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
</style>
