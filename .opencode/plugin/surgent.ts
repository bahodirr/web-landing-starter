import { type Plugin, tool } from "@opencode-ai/plugin"
import { ApifyClient } from "apify-client"

const PROVIDERS = ["anthropic", "openai", "google", "vercel", "xai", "zai-org", "moonshotai"]

type SurgentConfig = {
  name?: string
  scripts?: {
    dev?: string | string[]
    lint?: string
  }
}

export const SurgentPlugin: Plugin = async (ctx) => {
  const { $, directory } = ctx
  $.cwd(directory)

  const baseUrl = process.env.SURGENT_AI_BASE_URL
  const apiKey = process.env.SURGENT_API_KEY

  async function readConfig(): Promise<SurgentConfig> {
    try {
      return await $`cat ${directory}/surgent.json`.json()
    } catch {
      return {}
    }
  }

  async function pm2List(): Promise<any[]> {
    try {
      return await $`pm2 jlist`.json()
    } catch {
      return []
    }
  }

  async function isPm2Online(name: string): Promise<boolean> {
    const list = await pm2List()
    const proc = list.find((p: any) => p?.name === name)
    return proc?.pm2_env?.status === "online"
  }

  async function startPm2(name: string, command: string): Promise<string> {
    if (await isPm2Online(name)) {
      return `already online: ${name}`
    }
    await $`${{ raw: `pm2 start "${command}" --name ${name}` }}`
    return `started: ${name}`
  }

  return {
    async config(config) {
      if (!baseUrl) return

      config.provider ??= {}

      for (const id of PROVIDERS) {
        config.provider[id] = {
          ...config.provider[id],
          options: {
            ...config.provider[id]?.options,
            apiKey,
            baseURL: `${baseUrl}/${id}`,
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

    tool: {
      dev: tool({
        description: "Start the dev server if not already running",
        args: {},
        async execute(): Promise<string> {
          try {
            const cfg = await readConfig()
            const name = cfg.name?.trim()
            const dev = cfg.scripts?.dev
            if (!name) throw new Error('Missing "name" in surgent.json')
            if (!dev) throw new Error('Missing "scripts.dev" in surgent.json')

            const results: string[] = []

            // Run lint if configured
            const lint = cfg.scripts?.lint
            if (lint) {
              await $`${{ raw: lint }}`
              results.push("Ran lint")
            }

            const commands = Array.isArray(dev) ? dev : [dev]
            for (let i = 0; i < commands.length; i++) {
              const procName = commands.length > 1 ? `${name}:${i + 1}` : name
              results.push(await startPm2(procName, commands[i]))
            }

            return results.join("\n")
          } catch (error) {
            return `Failed: ${(error as Error).message}`
          }
        },
      }),

      devLogs: tool({
        description: "Show last N lines of dev server logs",
        args: { lines: tool.schema.number().optional() },
        async execute(args): Promise<string> {
          try {
            const cfg = await readConfig()
            const name = cfg.name?.trim()
            if (!name) throw new Error('Missing "name" in surgent.json')
            const lines = args.lines ?? 20
            return await $`pm2 logs ${name} --lines ${lines} --nostream`.text()
          } catch (error) {
            return `Failed: ${(error as Error).message}`
          }
        },
      }),

      linkedin: tool({
        description: "Fetch a LinkedIn profile via Apify. Args: linkedinUrl (required).",
        args: {
          linkedinUrl: tool.schema.string()
        },
        async execute(args): Promise<string> {
          try {
            const linkedinUrl = (args.linkedinUrl ?? "").trim()
            if (!linkedinUrl) {
              return `Missing linkedinUrl`
            }
            const token = process.env.APIFY_TOKEN
            const client = new ApifyClient({ token })
            const run = await client.actor('2SyF0bVxmgGr8IVCZ').call({
              profileUrls: [linkedinUrl],
            })
            const { items } = await client.dataset(run.defaultDatasetId).listItems()
            const first = items?.[0]
            if (!first) {
              return `No result found`
            }
            return JSON.stringify({ success: true, data: first })
          } catch (error) {
            const err = error as Error
            return `Apify request failed: ${err.message}`
          }
        },
      }),

      downloadToRepo: tool({
        description: "Download a file from a URL and save it to the project. targetPath is relative to project root (e.g. 'public/logo.png').",
        args: {
          sourceUrl: tool.schema.string(),
          targetPath: tool.schema.string(),
        },
        async execute(args): Promise<string> {
          try {
            const sourceUrl = args.sourceUrl?.trim()
            const targetPath = args.targetPath?.trim()

            if (!sourceUrl) return "Missing sourceUrl"
            if (!targetPath) return "Missing targetPath"

            const fullPath = `${directory}/${targetPath}`
            await $`curl -L --create-dirs -o ${fullPath} ${sourceUrl}`

            return `Downloaded ${sourceUrl} to ${targetPath}`
          } catch (error) {
            const err = error as Error
            return `Download failed: ${err.message}`
          }
        },
      }),
    },
  }
}
