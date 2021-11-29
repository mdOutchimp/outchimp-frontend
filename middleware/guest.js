export default function ({ store, redirect, app }) {
    if (store.$auth.loggedIn == true) {
        if (store.$auth.user.type == "buyer")
            redirect("/buyers/dashboard");

        if (store.$auth.user.type == "seller")
            redirect("/sellers/dashboard");
    }
}
