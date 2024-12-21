import crypto from "crypto";

// Based on article: https://knowledge.here.com/csm_kb?id=public_kb_csm_details&number=KB0022486
// Here.com seems to have a non-standard OAuth implementation, we tried to use standard library like "openid-client" but it didn't work
// So we had to implement it manually

function generateOAuthSignature(
  url: string,
  method: string,
  params: Record<string, string>,
  accessSecret: string,
) {
  const parameterString = Object.keys(params)
    .sort()
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
    )
    .join("&");
  return encodeURIComponent(
    crypto
      .createHmac("sha256", `${accessSecret}&`)
      .update(
        `${method}&${encodeURIComponent(url)}&${encodeURIComponent(
          parameterString,
        )}`,
      )
      .digest("base64"),
  );
}

export async function getHereOauthToken(
  clientId: string,
  clientSecret: string,
  url = "https://account.api.here.com/oauth2/token",
): Promise<string> {
  const params = {
    oauth_consumer_key: clientId,
    oauth_nonce: Date.now().toString(),
    oauth_signature_method: "HMAC-SHA256",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_version: "1.0",
    grant_type: "client_credentials",
  };
  const encodedSignature = generateOAuthSignature(
    url,
    "POST",
    params,
    clientSecret,
  );
  const authHeader = `OAuth oauth_consumer_key="${params.oauth_consumer_key}",oauth_nonce="${params.oauth_nonce}",oauth_signature="${encodedSignature}",oauth_signature_method="${params.oauth_signature_method}",oauth_timestamp="${params.oauth_timestamp}",oauth_version="${params.oauth_version}"`;

  const response = await fetch(url, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }).toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: authHeader,
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to obtain OAuth token: ${response.status} ${response.statusText}`,
    );
  }
  const responseData = (await response.json()) as {
    access_token: string;
  };
  return responseData.access_token;
}
