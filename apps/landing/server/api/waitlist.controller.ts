import { db } from "../db/setup";
import { insertEmailSchema, email } from "../db/schema";
import { Resend } from 'resend';

const resend = new Resend('re_KRVKQqLm_HdEL2Y5eh9mChoun8BWhJowV');

/**
 * @param address
 * @returns response
 */
export const addWaitlist = async (address: string) => {
    const data = {
        address: address,
    };
    const validatedData = insertEmailSchema.parse(data);

    if (!validatedData) {
        console.error("Invalid data format! Please check and retry.");
        return "error"
    }
    try {
        await db.insert(email)
            .values(validatedData)
            .returning();
        sendWelcome(address)
        return "success";
    } catch (error) {
        return "negligible"
    }
}

const sendWelcome = (address: string) => {
    const welcome = `
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to ZERO!</title>
    </head>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap");

        body {
            background-color: #fff;
            color: #000;
            font-family: "Space Grotesk", sans-serif;
            margin: 0;
            padding: 20px;
        }

        h1,
        h2 {
            margin: 10px 0;
        }

        h1 {
            font-size: 24px;
        }

        h2 {
            font-size: 20px;
        }

        p {
            line-height: 1.5;
        }

        a {
            color: #809fff;
            text-decoration: none;
        }

        a:hover {
            color: #809fff;
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        li {
            margin-bottom: 10px;
        }

        a img {
            width: 32px;
            height: 32px;
        }

        .contact {
            min-width: 512px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    </style>
    <body>
        <div class="contact">
            <div>
                <h3>Hey there,</h3>
                <p>
                    Thanks for joining the ZERO waitlist! We're thrilled you're interested in
                    revolutionizing the way you manage your digital identity and interact
                    online.
                </p>
                <p>
                    ZERO Labs is building a groundbreaking Decentralized Identity (DID)
                    solution that empowers you with:
                </p>
            <img src="https://cdn.0xzero.org/zeroheronegative.jpg" alt="" style="max-width: calc(100% - 25px);">
                <ul>
                    <li>
                        <b>Secure and User-Controlled Identities:</b> Own and manage your data
                        seamlessly across different blockchains with your omID (your digital
                        passport).
                    </li>
                    <li>
                        <b>Frictionless Verification:</b> Prove your identity without revealing
                        sensitive information using Zero-Knowledge Proofs (ZKPs). Imagine
                        proving you're over 18 without showing your ID!
                    </li>
                    <li>
                        <b>Streamlined Onchain Interactions:</b> All your wallets share one
                        seamless identity through omPassports to empower your onchain
                        activities.
                    </li>
                    <li>
                        <b>Empowering the Future of Web3:</b> Unlock a world of possibilities in
                        DeFi, NFTs, and the Metaverse with a secure and verifiable digital
                        identity.
                    </li>
                </ul>

                <h2>Stay in the Loop:</h2>
                <p>
                    We're actively developing the ZERO Protocol and will be sharing exclusive
                    updates, sneak peeks, and valuable resources with our waitlist community.
                </p>

                <p>
                    In the meantime, you can learn more about ZERO Protocol by visiting our
                    docs: <a href="https://docs.zero.org">https://docs.zero.org</a> as well as
                    joining our discord:
                    <a href="https://discord.gg/bqscx4Mg5j">https://discord.gg/bqscx4Mg5j</a>
                </p>

                <p>We're excited to have you on board!</p>
                <p>The ZERO Team</p>
            </div>

            <h3>Follow us on social media for the latest news and announcements: <a href="https://x.com/0xZeroOrg">@0xZeroOrg</a></h3>
                
        </div>
    </body>
    </html>
    `
    resend.emails.send({
        from: 'ZΞRO Labs <team@0xzero.org>',
        to: address,
        subject: 'Welcome to the Future of Identity with ZERO Labs',
        html: welcome
    });
}

