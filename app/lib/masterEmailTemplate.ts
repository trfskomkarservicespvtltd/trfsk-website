export interface MasterEmailOptions {
  title: string;
  heading: string;
  intro: string;
  body: string;

  buttonText?: string;
  buttonLink?: string;

  footerNote?: string;
}

export function masterEmailTemplate(
  options: MasterEmailOptions
): string {
  return `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta
name="viewport"
content="width=device-width, initial-scale=1.0"
/>

<title>${options.title}</title>

</head>

<body
style="
margin:0;
padding:40px;
background:#f3f4f6;
font-family:Arial,Helvetica,sans-serif;
"
>

<table
align="center"
width="700"
style="
background:white;
border-radius:18px;
overflow:hidden;
border:1px solid #e5e7eb;
box-shadow:0 10px 30px rgba(0,0,0,.08);
"
>

<tr>

<td
style="
padding:35px;
background:linear-gradient(90deg,#1d4ed8,#0891b2);
color:white;
"
>

<h1
style="
margin:0;
font-size:32px;
font-weight:bold;
"
>
TRFSK OMKAR SERVICES PVT LTD
</h1>

<p
style="
margin-top:10px;
font-size:15px;
opacity:.95;
"
>

Financial Awareness • Business Education • Professional Networking

</p>

</td>

</tr>

<tr>

<td style="padding:40px;">

<h2
style="
margin-top:0;
color:#1d4ed8;
font-size:28px;
"
>

${options.heading}

</h2>

<p
style="
font-size:16px;
color:#374151;
line-height:30px;
"
>

${options.intro}

</p>

<div
style="
margin-top:30px;
padding:25px;
background:#f8fafc;
border-left:5px solid #2563eb;
border-radius:10px;
line-height:30px;
font-size:15px;
color:#374151;
"
>

${options.body}

</div>

${
options.buttonText && options.buttonLink
? `
<div style="margin-top:35px;text-align:center;">

<a
href="${options.buttonLink}"
style="
display:inline-block;
padding:16px 34px;
background:#2563eb;
color:white;
text-decoration:none;
border-radius:10px;
font-weight:bold;
font-size:16px;
"
>

${options.buttonText}

</a>

</div>
`
: ""
}

<hr
style="
margin:40px 0;
border:none;
border-top:1px solid #e5e7eb;
"
/>

<h3
style="
color:#111827;
"
>

Need Assistance?

</h3>

<p
style="
line-height:30px;
color:#374151;
"
>

📧 care@trfskomkar.com<br>

📧 partners@trfskomkar.com<br>

📞 +91 81693 02861<br>

🌐 https://www.trfskomkar.com

</p>

</td>

</tr>

<tr>

<td
style="
background:#0f172a;
padding:30px;
color:#cbd5e1;
font-size:13px;
text-align:center;
line-height:24px;
"
>

<strong>
TRFSK OMKAR SERVICES PVT LTD
</strong>

<br><br>

Financial Awareness

•

Business Education

•

Professional Networking

<br><br>

${options.footerNote ?? "Thank you for being part of our journey."}

<br><br>

© ${new Date().getFullYear()} TRFSK OMKAR SERVICES PVT LTD

<br>

All Rights Reserved

</td>

</tr>

</table>

</body>

</html>

`;
}