<script lang="ts">
    import { Button } from "attractions";
    import { storageChrome } from "../../full_page";
    import { t } from "../i18n";
    import { tokenStore } from "../stores";

    const handleDisconnectExtension = () => {
        tokenStore.set("");
        localStorage.removeItem("tokenStore");
        storageChrome("clear");
    };
</script>

<section class="container-settings">
    <Button on:click={() => handleDisconnectExtension()}>
        {$t("settings.logout_extension")}
    </Button>
</section>
