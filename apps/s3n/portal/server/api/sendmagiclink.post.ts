import { Resend } from "resend";

const resend = new Resend(process.env.RESEND);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await sendMagicLink(body.email, body.magicLink);
  return {
    response: response,
  };
});

const sendMagicLink = (address: string, magicLink: string) => {
  const magicLinkEmail = `
    <!doctype html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Continue to S3N</title>
            <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;700&display=swap" rel="stylesheet">
        </head>
        <body style="background-color: #fff; color: #000; font-family: 'Sora', sans-serif; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <img
                    src="https://github.com/0xZeroLabs/zero-mono/raw/main/apps/s3n/portal/assets/img/s3n.svg"
                    alt="S3N Logo"
                    style="max-width: 150px; margin-bottom: 20px; margin-left: auto; margin-right: auto; display: block;"
                />

                <h2>Continue to S3N</h2>

                <p>Hello,</p>

                <p>
                    Click the button below to sign in to your account. This link
                    will expire in 10 minutes.
                </p>

                <a href="${magicLink}"
                   style="background-color: #dea584; color: white; padding: 12px 24px; text-decoration: none; border-radius: 0.75rem; display: inline-block; margin: 20px 0; transition: background-color 0.2s ease;"
                   onmouseover="this.style.backgroundColor='#c68b6a'"
                   onmouseout="this.style.backgroundColor='#dea584'">
                    Sign in to S3N
                </a>

                <p>
                    If the button doesn't work, copy and paste this link into your
                    browser:
                </p>
                <p style="color: #dea584; word-break: break-all;">${magicLink}</p>

                <p>If you didn't request this email, you can safely ignore it.</p>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
                    <p>
                        This is an automated message from ZERO Labs. Please do not
                        reply to this email.
                    </p>
                    <p>
                        For security reasons, this link will expire in 10 minutes.
                    </p>
                </div>
            </div>
        </body>
    </html>
    `;

  return resend.emails.send({
    from: "no-reply <no-reply@0xzero.org>",
    to: address,
    subject: "Continue to S3N",
    html: magicLinkEmail,
  });
};
