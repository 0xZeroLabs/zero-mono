import * as Comlink from "comlink"
import init, { Presentation, Prover } from "tlsn-js"

Comlink.expose({
  init,
  Prover,
  Presentation
})
