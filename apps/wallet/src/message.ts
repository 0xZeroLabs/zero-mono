const DEV_CENTER_SERVER = "https://dev.0xzero.org/v1/";
// const STORAGE_LAYER = "https://storage.0xzero.org/v1/";

const ErrorType = {
  DO_NOT_MEET_REQUIREMENTS: 0,
};
const CurrentState = {
  FINISHED: "finished",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const eventListener = async (event: any) => {
  if (event.source !== window) return;
  // TODO: need check origin
  if (
    event.data.type &&
    (event.origin.includes("localhost") || event.origin.includes("0xzero.org"))
  ) {
    dispatchMessage(event.data);
  } else if (event.data.type === "AUTH_OMID" && event.data.appid) {
    const url = `${DEV_CENTER_SERVER}/origin`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          app_id: event.data.appid,
        }),
      });

      const permissionOrigin = await response.json();
      if (event.origin.includes(permissionOrigin.info.origin)) {
        dispatchMessage(event.data);
      }
    } catch (error) {
      console.error(error);
    }
  }
};
window.addEventListener("message", eventListener);

chrome.runtime.onMessage.addListener(async (message, _sender, sendResponse) => {
  let event = message.event;
  if (typeof event == "string" && event.startsWith("{")) {
    event = JSON.parse(message.event);
  }
  if (message?.action === "ALERT") {
    if (event.type === ErrorType.DO_NOT_MEET_REQUIREMENTS) {
      broadcastMessage({ type: "NOT_MATCH_REQUIREMENTS", id: event?.id });
    } else {
      broadcastMessage({ type: "UNEXPECTED_VERIFY_ERROR", id: event?.id });
    }
  } else if (message?.action === "PROOF_FINISH") {
    if (event.state === CurrentState.FINISHED) {
      sendMessageToBackground("close current tab");
      broadcastMessage({ type: "GENERATE_ZKP_SUCCESS", ...event });
    }
  } else if (message?.action === "ILLEGAL_WINDOW_CLOSING") {
    broadcastMessage({ type: "ILLEGAL_WINDOW_CLOSING", id: message.event.id });
  } else if (message?.action === "SEND_GROTH16_PROOF_TO_PAGE") {
    broadcastMessage({ type: "PROOF_PARAMETERS", ...message.event });
  } else if (message?.action === "SEND_GROTH16_PROOF_LIST_TO_PAGE") {
    broadcastMessage({ type: "PROOF_LIST", ...message.event });
  } else if (message?.action === "SEND_SBT_RESULT_TO_PAGE") {
    broadcastMessage({ type: "SET_SBT_RESULT", ...message.event });
  } else if (message?.action === "SEND_SBT_ADDRESS_LIST_TO_PAGE") {
    broadcastMessage({ type: "SBT_ADDRESS_LIST", ...message.event });
  } else if (message?.action === "SEND_SBT_PUB_KEY_TO_PAGE") {
    broadcastMessage({ type: "SBT_PUB_KEY", ...message.event });
  }

  sendResponse({ received: true });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dispatchMessage(data: { type: string; id: any }) {
  console.log("dispatchMessage", data.type);
  try {
    switch (data.type) {
      case "AUTH_OMID":
        window.sessionStorage.setItem("omid-signin", "true");
        return sendMessageToBackground("create a new tab", { ...data });
      case "REQUEST_GROTH16_PROOF":
        return sendMessageToBackground("request groth16 proof info", {
          ...data,
        });
      case "REQUEST_ALL_PROOF":
        return sendMessageToBackground("request all proofs", { ...data });
      case "SET_SBT_CHAIN_ADDRESS":
        return sendMessageToBackground("set address for diff chain", {
          ...data,
        });
      case "REQUEST_SBT_ADDRESS_LIST":
        return sendMessageToBackground("request all sbt address", { ...data });
      case "REQUEST_SBT_PUB_KEY":
        return sendMessageToBackground("request pubKey of sbt", { ...data });
      default:
        return null;
    }
  } catch (e) {
    console.error(e);
  }
}

function sendMessageToBackground(
  type: string,
  data?: { type: string } | undefined
) {
  chrome.runtime?.sendMessage({ type, data });
}

/**
 *
 * @param {*} message  { type: string; id?: number | string; proof?: any; taskId?: string }
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function broadcastMessage(message: { type: string; id: any }) {
  window.postMessage({ ...message, source: "zkPass" }, "*");
}
