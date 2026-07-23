import { ContactEmailData } from "./emailTypes";

export function adminTemplate(data: ContactEmailData) {
  return `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

</head>

<body style="margin:0;padding:40px;background:#0f172a;font-family:Arial,sans-serif;">

<table
width="700"
align="center"
style="
background:#111827;
border-radius:18px;
overflow:hidden;
border:1px solid #1e293b;
">

<tr>

<td
style="
padding:30px;
background:linear-gradient(90deg,#2563eb,#0891b2);
color:white;
"
>

<h1 style="margin:0;font-size:32px;">

TRFSK

</h1>

<p style="margin-top:8px;font-size:14px;opacity:.9;">

Business Education • Financial Awareness • Professional Networking

</p>

</td>

</tr>

<tr>

<td style="padding:40px;">

<h2 style="color:white;">

New Website Inquiry

</h2>

<table width="100%" cellpadding="12">

<tr>

<td style="color:#94a3b8;width:180px;">Name</td>

<td style="color:white;">${data.name}</td>

</tr>

<tr>

<td style="color:#94a3b8;">Email</td>

<td style="color:white;">${data.email}</td>

</tr>

<tr>

<td style="color:#94a3b8;">Phone</td>

<td style="color:white;">${data.phone || "-"}</td>

</tr>

<tr>

<td style="color:#94a3b8;">Company</td>

<td style="color:white;">${data.company || "-"}</td>

</tr>

<tr>

<td style="color:#94a3b8;">Subject</td>

<td style="color:white;">${data.subject || "General Inquiry"}</td>

</tr>

</table>

<div
style="
margin-top:30px;
padding:25px;
background:#0f172a;
border-radius:12px;
border-left:4px solid #2563eb;
color:#e2e8f0;
line-height:30px;
"
>

${data.message}

</div>

</td>

</tr>

<tr>

<td
style="
padding:25px;
background:#020617;
color:#64748b;
font-size:12px;
text-align:center;
"
>

Generated automatically from TRFSK Website.

</td>

</tr>

</table>

</body>

</html>

`;
}