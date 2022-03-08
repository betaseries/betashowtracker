<script lang="ts">
    import { CheckIcon } from "svelte-feather-icons";

    export let show;
    export let checkShow;
</script>

<button
    class="button-check-episode"
    on:click={() => {
        show.displayCheck = true;
        checkShow(show.user.next.id);
    }}
>
    {#if show.displayCheck}
        <CheckIcon size="16" class="mr" />
    {/if}
</button>
