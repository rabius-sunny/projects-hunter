import { init } from '@paralleldrive/cuid2'

const getUID = init({
  length: 6
})

export default getUID
