export const verificationEmailTemplate = (verificationCode, userEmail, userFullname) => {
  return `
        <!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8" />
    <title>Verify your email • notesXchange</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- Preheader text (hidden preview in inbox) -->
    <meta name="x-preheader" content="Your notesXchange verification code is {{VERIFICATION_CODE}}." />
  </head>
  <body style="margin:0; padding:0; background-color:#f5f7fb; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">
    <!-- Hidden preheader (works in most clients) -->
    <div style="display:none; overflow:hidden; line-height:1px; opacity:0; max-height:0; max-width:0;">
      Your notesXchange verification code is 
      ${verificationCode}.
    </div>

    <!-- Full width wrapper -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse; background-color:#f5f7fb;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <!-- Container -->
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; width:100%; border-collapse:collapse; background-color:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 6px 24px rgba(24,39,75,0.06);">
            <!-- Header / Brand -->
            <tr>
              <td align="center" style="padding:28px 24px; background:#1f2937;">
                <!-- Logo (optional) -->
                <a href="https://notesxchange.example.com" target="_blank" style="text-decoration:none;">
                  <span style="display:inline-block; font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif; font-size:22px; font-weight:800; letter-spacing:0.2px; color:#ffffff;">
                    <span style="color:#ffffff;">notes</span><span style="color:#a78bfa;">X</span><span style="color:#ffffff;">change</span>
                  </span>
                </a>
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td style="padding:28px 28px 0 28px;">
                <h1 style="margin:0; font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif; font-size:22px; line-height:28px; color:#111827; font-weight:700;">
                  Verify your email
                </h1>
              </td>
            </tr>

            <!-- Greeting + Copy -->
            <tr>
              <td style="padding:12px 28px 0 28px;">
                <p style="margin:0; font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:22px; color:#4b5563;">
                  Hi ${userFullname},<br />
                  Use the verification code below to finish setting up your notesXchange account.
                </p>
              </td>
            </tr>

            <!-- Code block -->
            <tr>
              <td align="center" style="padding:22px 28px 0 28px;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate; border-spacing:0;">
                  <tr>
                    <td style="
                      padding:16px 24px;
                      border:2px dashed #a78bfa;
                      border-radius:10px;
                      background:#fafaff;
                    ">
                      <span style="display:inline-block; font-family:SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace;
                                   font-size:32px; line-height:36px; letter-spacing:6px; font-weight:800; color:#4c1d95;">
                        ${verificationCode}
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Expiry + CTA (optional) -->
            <tr>
              <td style="padding:16px 28px 0 28px;">
                <p style="margin:0; font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif; font-size:14px; line-height:21px; color:#6b7280;">
                  This code will expire in <strong style="color:#111827;">10 minutes</strong>. If the button below is available, you can also verify directly:
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:16px 28px 0 28px;">
                <!-- Bulletproof button -->
                <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:separate;">
                  <tr>
                    <td align="center" bgcolor="#7c3aed" style="border-radius:999px;">
                      <a href="${process.env.FRONTEND_URL}/verify-user"
                         target="_blank"
                         style="display:inline-block; padding:12px 22px; font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif; font-size:14px; font-weight:700; color:#ffffff; text-decoration:none; border-radius:999px;">
                        Verify Email
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Help text -->
            <tr>
              <td style="padding:20px 28px 0 28px;">
                <p style="margin:0; font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif; font-size:13px; line-height:20px; color:#6b7280;">
                  Didn’t request this? You can safely ignore this email. For security, don’t share this code with anyone.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:28px;">
                <hr style="border:none; border-top:1px solid #e5e7eb; margin:0 0 16px 0;" />
                <p style="margin:0; font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif; font-size:12px; line-height:18px; color:#9ca3af;">
                  Sent by notesXchange • <a href="https://notesxchange.vercel.app" target="_blank" style="color:#7c3aed; text-decoration:none;">notesxchange.vercel.app</a><br />
                  If you’re having trouble with the button, paste this link into your browser:<br />
                  <span style="word-break:break-all; color:#6b7280;">${process.env.FRONTEND_URL}/verify-user</span>
                </p>
              </td>
            </tr>
          </table>

          <!-- Legal line -->
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; width:100%; border-collapse:collapse;">
            <tr>
              <td align="center" style="padding:16px 8px;">
                <p style="margin:0; font-family:Segoe UI, Roboto, Helvetica, Arial, sans-serif; font-size:11px; line-height:18px; color:#9aa0a6;">
                  © ${new Date().getFullYear()} notesXchange. All rights reserved.
                </p>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  </body>
</html>

        `;
};
