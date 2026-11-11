import { Resend } from "resend";
import { services } from "@/content/site";
import type { InquiryInput } from "@/lib/validators";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function serviceLabel(value: string | undefined) {
  if (!value) return "Not specified";
  return services.find((service) => service.slug === value)?.name ?? value;
}

export async function sendInquiryEmail(input: InquiryInput) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { skipped: true as const };
  }

  const resend = new Resend(apiKey);
  const to = process.env.INQUIRY_TO_EMAIL ?? "ahmadashraf97800@gmail.com";
  const from =
    process.env.INQUIRY_FROM_EMAIL ?? "ALASHRAF-TECHUB <onboarding@resend.dev>";

  const rows: [string, string][] = [
    ["Name", input.name],
    ["Email", input.email],
    ["Phone", input.phone || "Not provided"],
    ["Company", input.company || "Not provided"],
    ["Service", serviceLabel(input.service)],
    ["Budget", input.budget || "Not provided"],
  ];

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;background:#0a0a0b;padding:32px;color:#f5f5f4">
      <div style="max-width:600px;margin:0 auto;background:#121214;border:1px solid #26262a;border-radius:16px;overflow:hidden">
        <div style="padding:22px 26px;border-bottom:1px solid #26262a">
          <p style="margin:0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#f97316">ALASHRAF-TECHUB</p>
          <h1 style="margin:8px 0 0;font-size:20px;line-height:1.3">New project inquiry</h1>
        </div>
        <div style="padding:26px">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            ${rows
              .map(
                ([label, value]) => `
              <tr>
                <td style="padding:6px 0;color:#a1a1aa;width:120px">${escapeHtml(label)}</td>
                <td style="padding:6px 0;color:#f5f5f4">${escapeHtml(value)}</td>
              </tr>`,
              )
              .join("")}
          </table>
          <div style="margin-top:20px;padding-top:20px;border-top:1px solid #26262a">
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#a1a1aa">Message</p>
            <p style="margin:0;font-size:14px;line-height:1.65;white-space:pre-wrap;color:#f5f5f4">${escapeHtml(input.message)}</p>
          </div>
          <div style="margin-top:24px">
            <a href="mailto:${escapeHtml(input.email)}" style="display:inline-block;background:#f97316;color:#0a0a0b;text-decoration:none;font-weight:600;font-size:14px;padding:11px 18px;border-radius:8px">Reply to ${escapeHtml(input.name)}</a>
          </div>
        </div>
      </div>
    </div>
  `;

  const result = await resend.emails.send({
    from,
    to,
    replyTo: input.email,
    subject: `New inquiry — ${input.name}${
      input.service ? ` · ${serviceLabel(input.service)}` : ""
    }`,
    html,
  });

  if (result.error) {
    throw new Error(result.error.message ?? "Resend rejected the email");
  }

  return { skipped: false as const };
}
