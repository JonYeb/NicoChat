const msg = {
  "time": 1552400352142,
  "tags": {
    "badges": "broadcaster/1",
    "color": "#641FEF",
    "display-name": "SenderName",
    "emotes": "25:5-9",
    "flags": "",
    "id": "885d1f33-8387-4206-a668-e9b1409a998b",
    "mod": "0",
    "room-id": "85827806",
    "subscriber": "0",
    "tmi-sent-ts": "1552400351927",
    "turbo": "0",
    "user-id": "85827806",
    "user-type": ""
  },
  "nick": "sendername",
  "userId": "123123",
  "displayName": "senderName",
  "displayColor": "#641FEF",
  "badges": [
    {
      "type": "broadcaster",
      "version": "1",
      "url": "https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/3",
      "description": "Broadcaster"
    }
  ],
  "channel": "channelname",
  "text": "Test Kappa test",
  "isAction": false,
  "emotes": [
    {
      "type": "twitch",
      "name": "Kappa",
      "id": "25",
      "gif": false,
      "urls": {
        "1": "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
        "2": "https://static-cdn.jtvnw.net/emoticons/v1/25/2.0",
        "4": "https://static-cdn.jtvnw.net/emoticons/v1/25/4.0"
      },
      "start": 5,
      "end": 9
    }
  ],
  "msgId": "885d1f33-8387-4206-a668-e9b1409a99Xb"
};

const text = [
  "n ono TriSad", "THANK YOU ANONYMOUS", "Poggers Champion", "PowerUpL EntropyWins PowerUpR", " im so grateful for the sub gifters here's yalls kith", "yo",
  "n ono TriSad", "THANK YOU ANONYMOUS", "Poggers Champion", "PowerUpL EntropyWins PowerUpR", " im so grateful for the sub gifters here's yalls kith", "yo"
]

function sendText() {
  let number = Number.parseInt(Math.random() * 10);
  for (let i = 0; i < number; i++) {
    window.setTimeout( () => {
      renderText(text[i], msg)
    }, 500 * (i+1))
  }

}

/////////////////////////////////

const heightOffset = 25;

let	direction = "ltr",
  backgroundColor = "rgba(36, 6, 73, 0.15)",
  messages = 0;

let contentElement;
contentElement = document.getElementById('niconico-chat');
window.addEventListener('onEventReceived', function (obj) {
  if (!obj.detail.event) {
    return;
  }
  if (typeof obj.detail.event.itemId !== "undefined") {
    return;
  }
  const listener = obj.detail.listener.split("-")[0];
  const event = obj.detail.event;

  if (listener === 'message') {
    renderText(event.renderedText, event.data);

  } else if (listener === 'delete') {
    addEvent('deleteMessage', event.data);
  }
});

window.addEventListener('onWidgetLoad', function (obj) {
  const fieldData 	= obj.detail.fieldData;

  direction 		= fieldData.direction;
  backgroundColor 	= fieldData.backgroundColor;
  contentElement = document.getElementById('niconico-chat');
});

function renderText(text, data) {
  let element = document.createElement('div');
  element.classList.add("event-container");
  element.style.top = `${heightOffset * messages}px`;

  element.innerHTML = `<div data-msgId="${data.msgId}" data-userId="${data.userId}" id="${data.msgId}" class="msg-container">${text}</div>`;
  contentElement.appendChild(element);

  messages += 1;

  window.setTimeout( () => {
    messages = Math.max(0, (messages - 1))
  }, 2000)

  window.setTimeout( () => {
    document.getElementById(data.msgId).parentElement.remove();
  }, 6000 );
}
