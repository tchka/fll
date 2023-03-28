import instance from './instance'
import interceptorsSetup from './interceptors'

import authModule from './auth'
import orderModule from './order'


interceptorsSetup(instance);


export default {
  order: orderModule(instance),
  auth: authModule(instance),
}
