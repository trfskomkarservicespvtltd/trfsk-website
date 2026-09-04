import { ContactEmailData } from "./emailTypes";
import { siteConfig } from "@/app/lib/siteConfig";

export function adminTemplate(data: ContactEmailData) {
  return `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>New Website Enquiry</title>

</head>

<body style="
margin:0;
padding:40px;
background:#f1f5f9;
font-family:Arial,Helvetica,sans-serif;
">

<table
align="center"
width="700"
style="
background:#ffffff;
border-radius:18px;
overflow:hidden;
border:1px solid #e2e8f0;
">

<tr>

<td
style="
background:linear-gradient(90deg,#1d4ed8,#0891b2);
padding:35px;
color:white;
">

<h1 style="margin:0;font-size:32px;">
TRFSK OMKAR SERVICES PVT LTD
</h1>

<p style="margin-top:8px;font-size:15px;opacity:.9;">
Professional Website Lead Notification
</p>

</td>

</tr>

<tr>

<td style="padding:35px;">

<h2 style="margin-top:0;color:#0f172a;">
📩 New Website Enquiry
</h2>

<table
width="100%"
cellpadding="12"
style="
border-collapse:collapse;
margin-top:25px;
">

<tr>

<td style="
width:180px;
background:#f8fafc;
font-weight:bold;
">
Name
</td>

<td>
${data.name}
</td>

</tr>

<tr>

<td style="background:#f8fafc;font-weight:bold;">
Email
</td>

<td>
${data.email}
</td>

</tr>

<tr>

<td style="background:#f8fafc;font-weight:bold;">
Phone
</td>

<td>
${data.phone || "-"}
</td>

</tr>

<tr>

<td style="background:#f8fafc;font-weight:bold;">
Company
</td>

<td>
${data.company || "-"}
</td>

</tr>

<tr>

<td style="background:#f8fafc;font-weight:bold;">
Subject
</td>

<td>
${data.subject || "General Enquiry"}
</td>

</tr>

</table>

<div style="
margin-top:35px;
background:#f8fafc;
padding:25px;
border-left:5px solid #2563eb;
border-radius:10px;
">

<h3 style="margin-top:0;color:#0f172a;">
Customer Message
</h3>

<p style="
line-height:30px;
font-size:15px;
color:#334155;
white-space:pre-line;
">

${data.message}

</p>

</div>

<div style="
margin-top:35px;
padding:20px;
background:#ecfeff;
border-radius:10px;
border:1px solid #a5f3fc;
">

<strong>Reply directly to this email.</strong>

<p style="margin-bottom:0;">
The Reply button will automatically send your response to

<strong>${data.email}</strong>

because Reply-To has already been configured.
</p>

</div>

</td>

</tr>

<tr>

<td style="
background:#0f172a;
padding:25px;
color:#cbd5e1;
font-size:13px;
text-align:center;
">

Generated automatically by

<strong>TRFSK Website Automation System</strong>

<br><br>

Website:
${siteConfig.url}

<br>

Customer Care:
care@trfskomkar.com

<br>

Partners:
partners@trfskomkar.com

</td>

</tr>

</table>

</body>

</html>

`;
}