import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'
import { env as cfEnv } from "cloudflare:workers"

export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.url().optional(),
  },

  runtimeEnvStrict: {
    BETTER_AUTH_SECRET: cfEnv.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: cfEnv.BETTER_AUTH_URL,
  },

  emptyStringAsUndefined: true,
})
