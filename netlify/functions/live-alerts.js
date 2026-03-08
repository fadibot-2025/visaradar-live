const { getStore } = require("@netlify/blobs");

exports.handler = async () => {
  try {
    const store = getStore("visaradar-live");
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
      body: JSON.stringify({
        ok: false,
        error: error.message,
      }),
    };
  }
};