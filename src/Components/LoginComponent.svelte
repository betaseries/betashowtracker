<script lang="ts">
    import { Button } from "attractions";
    import { connectAccountBS } from "../../full_page";
    import { t } from "../i18n";
</script>

<section style="display: flex;flex-direction: column;">
    <p>
        {$t("login.label")}
    </p>
    <Button
        on:click={() => connectAccountBS()}
        style="display:inline"
        type="submit"
        filled
    >
        {$t("login.button.login")}
    </Button>
</section>
