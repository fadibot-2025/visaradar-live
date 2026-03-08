exports.handler = async (event) => {
  try {
    console.log("Webhook hit");
    console.log("Method:", event.httpMethod);
    console.log("Body:", event.body);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ok: true,
        received: true
      })
    };
  } catch (error) {
    console.log("Webhook error:", error);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ok: false,
        message: "caught error"
      })
    };
  }
};