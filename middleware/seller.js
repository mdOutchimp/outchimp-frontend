export default function ({ store, redirect }) {
  if (store.$auth.loggedIn === false || store.$auth.user.type !== "seller") {
    redirect('/sellers/signin')
  };
}

