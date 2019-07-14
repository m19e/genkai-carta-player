export default function({ store, route, redirect }) {
  console.log('test')
  if (
    !store.getters['auth/isAuthenticated'] &&
    route.fullPath !== '/sign-in'
    // route.fullPath !== '/sign-up'
  ) {
    redirect('/sign-in')
  }
}
