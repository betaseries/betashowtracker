<script lang="ts">
    import { Button,FormField,TextField } from "attractions";
    import md5 from "md5";
    import { tokenStore } from "../stores";

    let login = "";
    let password = "";
    let errors: { code: number; text: string };
    const apiKey = import.meta.env.VITE_API_KEY as string;
    const sendLogin = async () => {
        const hashedPassword = md5(password);
        const res = await fetch(
            `https://api.betaseries.com/members/auth?login=${login}&client_id=${apiKey}&password=${hashedPassword}`,
            { method: "POST" }
        );

        const json = await res.json();
        if (json.errors.length) {
            errors = json.errors[0];
        } else {
            tokenStore.set(json.token);
            localStorage.setItem("tokenStore", json.token);
        }
    };
</script>

<form on:submit|preventDefault={sendLogin}>
    <FormField
        name="Pseudo"
        required
        errors={[errors?.code === 4002 && errors.text]}
    >
        <TextField bind:value={login} />
    </FormField>
    <FormField
        name="Mot de passe"
        required
        errors={[errors?.code === 4003 && errors.text]}
    >
        <TextField type="password" bind:value={password} />
    </FormField>
    <div style="margin-left: 250px;">
        <Button style="display:inline" type="submit" filled>Se connecter</Button
        >
        <a
            target="_blank"
            style="text-decoration: none"
            href="https://www.betaseries.com/inscription/"
            ><Button style="display:inline" outline>S'enregistrer</Button></a
        >
    </div>
</form>

<style>
</style>
