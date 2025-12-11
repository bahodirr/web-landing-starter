import { Plugin } from "@opencode-ai/plugin"
import { SurgentDeployPlugin } from "./tools"

const PROVIDERS = ["anthropic", "openai", "google", "vercel", "xai", "zai-org", "moonshotai"]

export const SurgentPlugin: Plugin = async (ctx) => {
  const deployPlugin = await SurgentDeployPlugin(ctx)

  return {
    async config(config) {
      const baseUrl = process.env.SURGENT_AI_BASE_URL
      const apiKey = process.env.SURGENT_API_KEY

      // Configure providers with Surgent proxy
      config.provider ??= {}
      for (const id of PROVIDERS) {
        config.provider[id] = {
          ...config.provider[id],
          options: {
            ...config.provider[id]?.options,
            ...(apiKey ? { apiKey } : {}),
            ...(baseUrl ? { baseURL: `${baseUrl}/${id}` } : {}),
          },
        }
      }

      // Set default model from env if provided
      const model = process.env.SURGENT_MODEL
      if (model) {
        config.model = model
      }

      // Set small model from env if provided
      const smallModel = process.env.SURGENT_SMALL_MODEL
      if (smallModel) {
        config.small_model = smallModel
      }
    },
    tool: deployPlugin.tool
  }
}
