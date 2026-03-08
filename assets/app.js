const TELEGRAM_CHANNEL_URL = "https://t.me/testkanal01020";

function wireTelegramLinks() {
  ["telegram-channel-link", "telegram-channel-link-mini"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = TELEGRAM_CHANNEL_URL;
  });
}

async function loadLiveAlerts() {
  try {
    const res = await fetch("/.netlify/functions/live-alerts", { cache: "no-store" });
    const data = await res.json();
    const containers = [document.getElementById("live-alerts"), document.getElementById("live-alerts-mini")].filter(Boolean);

    containers.forEach((container) => {
      container.innerHTML = "";

      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `<div class="alert-empty">Henüz canlı bildirim yok.</div>`;
        return;
      }

      data.forEach((alert) => {
        const item = document.createElement("div");
        item.className = "alert-item";
        item.innerHTML = `
          <div class="alert-text">${escapeHtml(alert.text || "")}</div>
          <div class="alert-time">${escapeHtml(alert.time || "")}</div>
        `;
        container.appendChild(item);
      });
    });
  } catch (err) {
    console.error("Live alerts error:", err);
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

wireTelegramLinks();
loadLiveAlerts();
setInterval(loadLiveAlerts, 5000);
