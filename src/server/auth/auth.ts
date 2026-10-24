import { betterAuth } from "better-auth"
import { twoFactor, emailOTP } from "better-auth/plugins"
import { tanstackStartCookies } from "better-auth/tanstack-start"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import {db} from "#/server/db";
import {env} from "#/server/env.server.ts";
import { env as cfEnv } from "cloudflare:workers"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendOnSignUp: false,
  },

  plugins: [
    twoFactor(),
    emailOTP({
      overrideDefaultEmailVerification: true,

      async sendVerificationOTP({ email, otp, type }) {
        if (
            type !== "email-verification" &&
            type !== "forget-password"
        ) {
          return
        }

        const subject =
            type === "email-verification"
                ? "验证您的邮箱"
                : "重置密码验证码"

        const description =
            type === "email-verification"
                ? "请使用以下验证码完成邮箱验证："
                : "请使用以下验证码重置您的密码："

        try {
          await cfEnv.EMAIL.send({
            from: "no-reply@evorsio.app",
            to: email,
            subject,
            text: `${description} ${otp}`,
            html: `
              <h2>${subject}</h2>
              <p>${description}</p>
              <p style="font-size: 32px; font-weight: 700;">
                ${otp}
              </p>
              <p>如果这不是您的操作，请忽略此邮件。</p>
            `,
          })
        } catch (err) {
          console.error("OTP 邮件发送失败", {
            email,
            type,
            err,
          })

          throw err
        }
      },
    }),
    tanstackStartCookies(),
  ],
})