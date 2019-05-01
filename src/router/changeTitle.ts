import { vmx } from '@/store'

export default function (to:any, from:any, next:any) {
  vmx.general.changeTitle(to.name)
  next()
}
