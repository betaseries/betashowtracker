<script lang="ts">
    import { toast } from "@zerodevx/svelte-toast";
    import { Divider, Loading } from "attractions";
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime";
    import { t } from "../i18n";
    import { localeStore, showsStore, tokenStore } from "../stores";
    import ProgressBarComponent from "./ProgressBarComponent.svelte";
    import ButtonCheckEpisode from "./showComponent/ButtonCheckEpisode.svelte";

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
    // Ajout du 'displayCheck' afin d'afficher le check dans le bouton le temps de la validation
    showsStore.subscribe((value: Array<{}>) => {
        shows = value
            ? value.map((s) => ({ ...s, displayCheck: false }))
            : null;
    });
    getShows();
</script>

{#if !shows}
    <section style="margin-top:20px">
        <Loading />
    </section>
{:else}
    {#each shows as show}
        <div class="container-show">
            <img
                class="poster-show"
                height="100px"
                src={show.images.poster || "https://picsum.photos/102/150"}
                alt=""
            />
            <div class="container-show-right">
                <div class="container-info-show">
                    <div>
                        <h2>
                            {show.title}
                        </h2>
                        <p>
                            {show.user.next.code} <br />
                            {show.user.next.title}
                        </p>
                        <p class="release-date">
                            {dayjs(show.user.next.date)
                                .locale(lang)
                                .format("DD MMMM YYYY")}
                        </p>
                    </div>
                    <ButtonCheckEpisode {show} {checkShow} />
                </div>
                <div class="container-show-stats">
                    <ProgressBarComponent
                        progressPercent={Math.round(show.user.status)}
                        {show}
                    />
                </div>
            </div>
        </div>
        <Divider />
    {/each}
{/if}
