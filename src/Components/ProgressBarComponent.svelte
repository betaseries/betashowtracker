<script lang="ts">
    import _padStart from "lodash/padStart";
    import moment from "moment";
    import { t } from "../i18n";
    export let progressPercent;
    export let show;
    const readableMinutes = (duration) => {
        if (!duration || parseInt(duration) === 0) {
            return "—";
        }

        let allDuration = moment.duration(Number(duration), "minutes");

        const years = Math.floor(allDuration.asYears());
        allDuration = allDuration.subtract(years, "years");
        const months = Math.floor(allDuration.asMonths());
        allDuration = allDuration.subtract(months, "months");
        const weeks = Math.floor(allDuration.asWeeks());
        allDuration = allDuration.subtract(weeks, "weeks");
        const days = Math.floor(allDuration.asDays());
        allDuration = allDuration.subtract(days, "days");
        const hours = Math.floor(allDuration.asHours());
        allDuration = allDuration.subtract(hours, "hours");

        let minutes = Math.floor(allDuration.asMinutes());
        allDuration = allDuration.subtract(minutes, "minutes");
        minutes = _padStart(minutes, 2, 0);

        const seconds = _padStart(Math.floor(allDuration.asSeconds()), 2, 0);

        let readable = "";
        readable += years
            ? `${years} ${$t("readable_duration.year", {}, years > 1)} `
            : "";
        readable += months
            ? `${months} ${$t("readable_duration.month", {}, months > 1)} `
            : "";
        readable += weeks
            ? `${weeks} ${$t("readable_duration.week", {}, weeks > 1)} `
            : "";

        readable += days ? `${days} ${$t("readable_duration.days")} ` : "";
        readable +=
            !years && !months && !weeks && hours > 0
                ? `${hours} ${$t("readable_duration.hours")} `
                : "";
        readable +=
            !years && !months && !weeks && !days && minutes > 0
                ? `${minutes} ${$t("readable_duration.minutes")} `
                : "";
        readable +=
            !years && !months && !weeks && !days && !hours && !minutes
                ? `${seconds} ${$t("readable_duration.seconds")}`
                : "";

        return readable.trim();
    };
</script>

<section class="progress-bar">
    <div class="current-progress" style={`width:${progressPercent}%`} />
</section>
<p class="time-remaining">
    {readableMinutes(show.user.remaining * parseInt(show.length))}
    ({show.user.remaining} ép)
</p>

<style>
    .progress-bar {
        width: 100px;
        height: 6px;
        background-color: #eee;
        margin-right: 10px;
    }
    .current-progress {
        height: 100%;
        background: linear-gradient(270deg, #54709d, #c1e1fa);
    }
    .time-remaining {
        height: 12px;
        font-family: Lucida Grande;
        font-size: 11px;
        line-height: 12px;
        color: #999;
        font-weight: 500;
    }
</style>
