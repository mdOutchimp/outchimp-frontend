export default function ({ store, redirect, app }) {
    if (store.$auth.loggedIn == true) {
        if (store.$auth.user.type == "buyer" && store.$auth.user.isVerified == false)
            redirect("/buyers/verify-email");

        if (store.$auth.user.type == "seller" && store.$auth.user.isVerified == false)
            redirect("/sellers/verify-email");
    }
}
