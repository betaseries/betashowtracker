<script lang="ts">
    import { Button, Loading, Divider } from "attractions";
    import { CheckIcon } from "svelte-feather-icons";
    import ProgressBar from "@okrad/svelte-progressbar";
    import { toast } from "@zerodevx/svelte-toast";
    import { tokenStore, showsStore } from "../stores";
    import("dayjs/locale/fr");
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime";

    dayjs.extend(relativeTime);
    const apiKey = import.meta.env.VITE_API_KEY;
    let token: string;
    tokenStore.subscribe((value) => {
        token = value;
    });

    const getShows = async () => {
        const res = await fetch(
            `https://api.betaseries.com/shows/member?key=${apiKey}&access_token=${token}&status=current&order=last_seen`,
            { method: "GET" }
        );
        const shows = await res.json();
        showsStore.set(shows.shows);
    };

    const checkShow = async (id: number) => {
        const res = await fetch(
            `https://api.betaseries.com/episodes/watched?key=${apiKey}&access_token=${token}&id=${id}`,
            { method: "POST" }
        );
        await res.json();
        getShows();
        toast.push("Épisode visionné", {
            duration: 3000,
            theme: {
                "--toastBackground": "#3B8DD0",
                "--toastColor": "white",
                "--toastBarBackground": "#1d5482",
            },
        });
    };

    let shows;
    showsStore.subscribe((value) => {
        shows = value;
    });
    getShows();
</script>

{#if !shows}
    <Loading />
{:else}
    {#each shows as show}
        <div style="margin: 10px;display:flex">
            <div style="width: 150px;">
                <img
                    height="150px"
                    src={show.images.poster || "https://picsum.photos/102/150"}
                    alt=""
                />
            </div>
            <div style="width: 450px;">
                <h2>
                    {show.title}
                </h2>

                <div style="width: 400px;display:flex;margin:20px">
                    <div style="width: 100px;display:flex">
                        <Button
                            filled
                            round
                            on:click={() => checkShow(show.user.next.id)}
                        >
                            <CheckIcon size="20" class="mr" />
                        </Button>
                    </div>
                    <div style="width: 400px;">
                        <h3 style="margin: 3px;">{show.user.next.code}</h3>
                        <h4 style="margin: 3px;">{show.user.next.title}</h4>
                        <p style="margin: 10px 0px 0px 3px;">
                            Sortie {dayjs(show.user.next.date)
                                .locale("fr")
                                .fromNow()}
                        </p>
                    </div>
                </div>
            </div>
            <div style="width: 100px;margin-top:50px">
                <div style="width:100%;display:inline">
                    <ProgressBar
                        textSize={100}
                        style="radial"
                        width={100}
                        series={{
                            perc: Math.round(show.user.status),
                            color: "#3B8DD0",
                        }}
                    />
                </div>
            </div>
        </div>
        <Divider />
    {/each}
{/if}

<style>
</style>
