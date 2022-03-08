<script lang="ts">
    import { toast } from "@zerodevx/svelte-toast";
    import { Button } from "attractions";
    import Autocomplete from "attractions/autocomplete/autocomplete.svelte";
    import { PlusIcon } from "svelte-feather-icons";
    import { t } from "../i18n";
    import { showsStore, tokenStore } from "../stores";

    const apiKey = import.meta.env.VITE_API_KEY;

    let token: string;
    tokenStore.subscribe((value) => {
        token = value;
    });

    let selection = [];
    async function* getOptions(text) {
        const res = await fetch(
            `https://api.betaseries.com/shows/search?key=${apiKey}&access_token=${token}&title=${text}`,
            { method: "GET" }
        );
        const result = await res.json();
        const selectedShows = result.shows
            .filter((show) => !show.user.next.id && !show.user.archived)
            .map((show) => ({
                name: show.title,
                details: show.description,
                id: show.id,
            }));
        yield selectedShows;
    }

    const addToList = async (ids: number[]) => {
        if (ids.length === 0) {
            return null;
        }
        const joinedIds = ids.join(",");
        const res = await fetch(
            `https://api.betaseries.com/shows/show?key=${apiKey}&access_token=${token}&id=${joinedIds}`,
            { method: "POST" }
        );
        const result = await res.json();
        const fetchedShows = result.shows ? result.shows : [result.show];
        showsStore.update((shows: any) => [...fetchedShows, ...shows]);
        toast.push($t("toast.show-added", {}, ids.length > 1), {
            duration: 3000,
            theme: {
                "--toastBackground": "#3B8DD0",
                "--toastColor": "white",
                "--toastBarBackground": "#1d5482",
            },
        });
        selection = [];
    };
</script>

<section style="display: flex; flex-direction: column; padding-bottom: 10px;">
    <div style="margin-bottom:10px">
        <Autocomplete
            minSearchLength={2}
            placeholder={$t("manage-show.search-show")}
            {getOptions}
            {selection}
        />
    </div>
    <div style="display:flex;justify-content:center">
        <Button
            filled
            on:click={() => addToList(selection.map((show) => show.id))}
        >
            <PlusIcon size="20" class="mr" />
            {$t("manage-show.add-show-list")}
        </Button>
    </div>
</section>
