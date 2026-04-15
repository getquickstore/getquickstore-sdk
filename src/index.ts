export * from "./generated"
export { createClient } from "./client"

import * as generated from "./generated"
import { createClient } from "./client"

const sdk = {
  ...generated,
  createClient,
}

export default sdk