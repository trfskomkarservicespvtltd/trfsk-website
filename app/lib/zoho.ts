/**
 * ============================================================
 * TRFSK OMKAR SERVICES PVT LTD
 * Zoho CRM Service
 * ============================================================
 */

export interface ZohoOAuthToken {
  access_token: string;
  refresh_token?: string;
  api_domain: string;
  token_type: string;
  expires_in: number;
}

export interface ZohoLead {
  Last_Name: string;
  First_Name?: string;
  Company?: string;
  Email?: string;
  Phone?: string;
  Mobile?: string;
  Description?: string;
  Lead_Source?: string;
}

const CLIENT_ID = process.env.ZOHO_CLIENT_ID!;
const CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN!;
const API_DOMAIN =
  process.env.ZOHO_API_DOMAIN || "https://www.zohoapis.in";

let accessToken = "";
let tokenExpires = 0;

function tokenExpired() {
  return Date.now() >= tokenExpires;
}

async function refreshAccessToken(): Promise<string> {
  const response = await fetch(
    "https://accounts.zoho.in/oauth/v2/token",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        refresh_token: REFRESH_TOKEN,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "refresh_token",
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Unable to refresh Zoho access token."
    );
  }

  const token: ZohoOAuthToken =
    await response.json();

  accessToken = token.access_token;

  tokenExpires =
    Date.now() + (token.expires_in - 60) * 1000;

  return accessToken;
}

async function getAccessToken() {
  if (!accessToken || tokenExpired()) {
    await refreshAccessToken();
  }

  return accessToken;
}

async function zohoRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = await getAccessToken();

  const response = await fetch(
    `${API_DOMAIN}${endpoint}`,
    {
      ...options,
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();

    throw new Error(error);
  }

  return response.json();
}/**
 * ============================================================
 * Connection Test
 * ============================================================
 */

export async function testConnection() {
  return zohoRequest("/crm/v8/settings/modules");
}

/**
 * ============================================================
 * Current Logged User
 * ============================================================
 */

export async function getCurrentUser() {
  const result = await zohoRequest(
    "/crm/v8/users?type=CurrentUser"
  );

  return result;
}

/**
 * ============================================================
 * CRM Modules
 * ============================================================
 */

export async function getModules() {
  return zohoRequest("/crm/v8/settings/modules");
}

/**
 * ============================================================
 * Search Lead
 * ============================================================
 */

export async function searchLeadByEmail(
  email: string
) {
  return zohoRequest(
    `/crm/v8/Leads/search?email=${encodeURIComponent(
      email
    )}`
  );
}

/**
 * ============================================================
 * Search Lead By Phone
 * ============================================================
 */

export async function searchLeadByPhone(
  phone: string
) {
  return zohoRequest(
    `/crm/v8/Leads/search?phone=${encodeURIComponent(
      phone
    )}`
  );
}

/**
 * ============================================================
 * Search Lead By Mobile
 * ============================================================
 */

export async function searchLeadByMobile(
  mobile: string
) {
  return zohoRequest(
    `/crm/v8/Leads/search?mobile=${encodeURIComponent(
      mobile
    )}`
  );
}
/**
 * ============================================================
 * Create Lead in Zoho CRM
 * ============================================================
 */

export async function createLead(
  lead: ZohoLead
) {
  const payload = {
    data: [lead],
    trigger: [
      "workflow",
      "approval",
      "blueprint",
    ],
  };

  return zohoRequest(
    "/crm/v8/Leads",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
}

/**
 * ============================================================
 * Update Lead
 * ============================================================
 */

export async function updateLead(
  id: string,
  lead: Partial<ZohoLead>
) {
  return zohoRequest(
    `/crm/v8/Leads/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        data: [lead],
      }),
    }
  );
}

/**
 * ============================================================
 * Get Lead
 * ============================================================
 */

export async function getLead(
  id: string
) {
  return zohoRequest(
    `/crm/v8/Leads/${id}`
  );
}

/**
 * ============================================================
 * Delete Lead
 * ============================================================
 */

export async function deleteLead(
  id: string
) {
  return zohoRequest(
    `/crm/v8/Leads/${id}`,
    {
      method: "DELETE",
    }
  );
}/**
 * ============================================================
 * Convert Website Lead
 * ============================================================
 */

export async function createWebsiteLead(data: {

  name?: string;

  email: string;

  phone?: string;

  company?: string;

  subject?: string;

  message?: string;

  source?: string;

}) {

  const names =
    (data.name || "").trim().split(" ");

  const firstName =
    names.length > 1
      ? names.slice(0, -1).join(" ")
      : "";

  const lastName =
    names.length > 1
      ? names[names.length - 1]
      : names[0] || "Website Lead";

  return createLead({

    First_Name: firstName,

    Last_Name: lastName,

    Email: data.email,

    Phone: data.phone,

    Company:
      data.company ||
      "Website Enquiry",

    Lead_Source:
      data.source ||
      "Website",

    Description:
      `Subject : ${data.subject || "-"}

Message :

${data.message || "-"}`,

  });

}/**
 * ============================================================
 * Check Duplicate Lead
 * ============================================================
 */

export async function leadExists(
  email: string
) {

  try {

    const result =
      await searchLeadByEmail(
        email
      );

    return (
      result &&
      result.data &&
      result.data.length > 0
    );

  } catch {

    return false;

  }

}/**
 * ============================================================
 * Save Only If New
 * ============================================================
 */

export async function saveWebsiteLead(data: {

  name?: string;

  email: string;

  phone?: string;

  company?: string;

  subject?: string;

  message?: string;

  source?: string;

}) {

  const exists =
    await leadExists(
      data.email
    );

  if (exists) {

    return {

      success: true,

      duplicate: true,

    };

  }

  const result =
    await createWebsiteLead(
      data
    );

  return {

    success: true,

    duplicate: false,

    result,

  };

}