<script lang="ts">
    import ProgressBar from "@okrad/svelte-progressbar";
    import { toast } from "@zerodevx/svelte-toast";
    import { Button, Divider, Loading } from "attractions";
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime";
    import { CheckIcon } from "svelte-feather-icons";
    import { t } from "../i18n";
    import { localeStore, showsStore, tokenStore } from "../stores";

    dayjs.extend(relativeTime);
    const apiKey = import.meta.env.VITE_API_KEY;
    let token: string;
    tokenStore.subscribe((value) => {
        token = value;
    });
    let lang: string;
    localeStore.subscribe((value: string) => {
        lang = value;
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
        toast.push($t("manage-show.episode-viewed"), {
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
    <section style="margin-top:20px">
        <Loading />
    </section>
{:else}
    {#each shows as show}
        <div class="container-item-show">
            <div class="container-info-show">
                <img
                    class="poster-show"
                    height="100px"
                    src={show.images.poster || "https://picsum.photos/102/150"}
                    alt=""
                />
                <div class="container-item-show-right">
                    <h2>
                        {show.title}
                    </h2>
                    <div class="container-show-middle">
                        <div
                            style="display:flex; justify-content: center; align-items: center; margin-right:10px"
                        >
                            <Button
                                filled
                                round
                                on:click={() => checkShow(show.user.next.id)}
                            >
                                <CheckIcon size="16" class="mr" />
                            </Button>
                        </div>
                        <div class="info-show">
                            <div>
                                <p>
                                    {show.user.next.code}
                                </p>
                                <p>
                                    {show.user.next.title}
                                </p>
                            </div>
                            <p class="release-date">
                                {$t("manage-show.release")}
                                {dayjs(show.user.next.date)
                                    .locale(lang)
                                    .fromNow()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container-progress-bar">
                <ProgressBar
                    textSize={100}
                    style="radial"
                    width={80}
                    series={{
                        perc: Math.round(show.user.status),
                        color: "#3B8DD0",
                    }}
                />
            </div>
        </div>
        <Divider />
    {/each}
{/if}
