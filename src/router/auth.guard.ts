import { vmx } from '@/store'

export default function (to:any, from:any, next:any) {
  if (vmx.user.isUserLoggedIn) {
    vmx.general.changeTitle(to.name)
    next()
  } else {
    next('/login')
  }
}
