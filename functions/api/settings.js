export async function onRequestGet(context) {
  const { env } = context;
  try {
    // Check if the binding exists (it won't in local sandbox without wrangler)
    if (!env.VPSAI) {
       return new Response(JSON.stringify({ error: "R2 binding not found" }), { status: 500 });
    }

    const object = await env.VPSAI.get("apikey");

    if (object === null) {
      return new Response(JSON.stringify({ apikey: "" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const apikey = await object.text();
    return new Response(JSON.stringify({ apikey }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestPut(context) {
  const { request, env } = context;
  try {
    if (!env.VPSAI) {
       return new Response(JSON.stringify({ error: "R2 binding not found" }), { status: 500 });
    }

    const { apikey } = await request.json();

    if (!apikey) {
        return new Response(JSON.stringify({ error: "API Key is required" }), { status: 400 });
    }

    await env.VPSAI.put("apikey", apikey);

    return new Response(JSON.stringify({ success: true, message: "Saved to R2" }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
    });
  }
}
