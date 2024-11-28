import { sendToBackground } from "@plasmohq/messaging"

document.addEventListener("keydown", async (event) => {
  if (event.key === "|") {
    await sendToBackground({
      name: "open-popup"
    })
  }
})
