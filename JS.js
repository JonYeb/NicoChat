const heightOffset = 25;

let	direction = "ltr",
  backgroundColor = "rgba(36, 6, 73, 0.15)",
  messages = 0;

let contentElement;

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
