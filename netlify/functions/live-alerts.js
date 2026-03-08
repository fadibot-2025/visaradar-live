const { getStore } = require("@netlify/blobs");

exports.handler = async () => {
  try {
    const store = getStore("visaradar-live", {
      siteID: process.env.NETLIFY_BLOBS_SITE_ID,
      token: process.env.NETLIFY_BLOBS_TOKEN,
    });

    const alerts = (await store.get("alerts", { type: "json" })) || [];

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      body: JSON.stringify(alerts),
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
