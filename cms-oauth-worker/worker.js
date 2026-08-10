// Minimal GitHub OAuth relay for Decap CMS, deployed as a Cloudflare Worker.
// Implements the two endpoints Decap's "github" backend expects:
//   GET  /auth       - redirects the CMS user to GitHub to authorize
//   GET  /callback   - exchanges the returned code for a token and posts
//                      it back to the admin/index.html popup window
//
// Required Worker secrets/vars (set via `wrangler secret put` / dashboard):
//   GITHUB_CLIENT_ID
//   GITHUB_CLIENT_SECRET
// See README.md in this folder for setup steps.

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      return handleAuth(url, env);
    }

    if (url.pathname === "/callback") {
      return handleCallback(request, url, env);
    }

    return new Response("Not found", { status: 404 });
  },
};

function handleAuth(url, env) {
  const state = crypto.randomUUID();
  const redirectUri = `${url.origin}/callback`;

  const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL);
  authorizeUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", "repo,user");
  authorizeUrl.searchParams.set("state", state);

  const headers = new Headers({ Location: authorizeUrl.toString() });
  headers.append(
    "Set-Cookie",
    `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`
  );

  return new Response(null, { status: 302, headers });
}

async function handleCallback(request, url, env) {
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = (request.headers.get("Cookie") || "").match(/oauth_state=([^;]+)/)?.[1];

  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  if (!state || state !== cookieState) {
    return new Response("Invalid state", { status: 400 });
  }

  const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/callback`,
      state,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return new Response(`OAuth error: ${tokenData.error_description || tokenData.error}`, {
      status: 400,
    });
  }

  const payload = JSON.stringify({ token: tokenData.access_token, provider: "github" });

  // Decap CMS's popup handshake: the admin page listens for this message
  // and closes the popup once it receives it.
  const script = `
    <script>
      (function() {
        function receiveMessage(message) {
          window.opener.postMessage(
            'authorization:github:success:${payload}',
            '*'
          );
          window.removeEventListener('message', receiveMessage, false);
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
  `;

  return new Response(script, {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  });
}
