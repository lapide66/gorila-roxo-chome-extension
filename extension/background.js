function injectGorilla(tabId) {
  chrome.scripting.executeScript({
    target: { tabId },
    func: showPurpleGorilla,
    args: [chrome.runtime.getURL('funny-meme.gif')]
  });
}

function showPurpleGorilla(imageUrl) {
  const existing = document.getElementById('codex-purple-gorilla');
  if (existing) {
    existing.remove();
  }

  const host = document.createElement('div');
  host.id = 'codex-purple-gorilla';
  host.style.position = 'fixed';
  host.style.left = `${Math.max(120, Math.random() * (window.innerWidth - 120))}px`;
  host.style.top = `${Math.max(120, Math.random() * (window.innerHeight - 120))}px`;
  host.style.transform = 'translate(-50%, -50%)';
  host.style.zIndex = '2147483647';
  host.style.pointerEvents = 'none';
  host.style.filter = 'drop-shadow(0 12px 20px rgba(0, 0, 0, 0.35))';

  const image = document.createElement('img');
  image.src = imageUrl;
  image.alt = 'Gorila roxo';
  image.style.width = '240px';
  image.style.height = 'auto';
  image.style.display = 'block';
  image.style.userSelect = 'none';
  image.style.webkitUserDrag = 'none';

  host.appendChild(image);
  document.body.appendChild(host);

  window.setTimeout(() => {
    host.remove();
  }, 10000);
}

chrome.action.onClicked.addListener((tab) => {
  if (!tab.id) {
    return;
  }

  injectGorilla(tab.id);
});
