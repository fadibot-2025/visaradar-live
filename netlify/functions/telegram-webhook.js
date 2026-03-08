const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ok: true, message: "Ready" }),
      };
    }

    const body = JSON.parse(event.body || "{}");
    const channelPost = body.channel_post;

    if (!channelPost) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ok: true, message: "No channel_post" }),
      };
    }

    const text = channelPost.text || "";
    const date = channelPost.date || Math.floor(Date.now() / 1000);

    const store = getStore("visaradar-live", {
      siteID: process.env.NETLIFY_BLOBS_SITE_ID,
      token: process.env.NETLIFY_BLOBS_TOKEN,
    });

    const existing = (await store.get("alerts", { type: "json" })) || [];

    const alerts = [
      {
        text,
        date,
        time: new Date(date * 1000).toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      ...existing,
    ].slice(0, 10);

    await store.setJSON("alerts", alerts);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ok: true,
        saved: true,
        latest: text,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ok: false,
        error: error.message,
      }),
    };
  }
};
