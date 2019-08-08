import veeValidate from 'vee-validate'

export default async ({ Vue }) => {
  Vue.use(veeValidate, {
    inject: false
  })
}
