import { BaseChannel, ChannelConfig, SendMessageOptions } from "./base"

interface TelegramMessage {
  chat_id: string
  text: string
  parse_mode?: "HTML" | "Markdown" | "MarkdownV2"
  disable_web_page_preview?: boolean
  disable_notification?: boolean
  message_thread_id?: string // 话题ID
}

export class TelegramChannel extends BaseChannel {
  readonly config: ChannelConfig = {
    type: "telegram",
    label: "Telegram 机器人",
    templates: [
      {
        type: "HTML",
        name: "文本消息",
        description: "文本消息，支持 HTML 标签",
        fields: [
          { key: "text", description: "HTML内容", required: true, component: 'textarea' },
          { key: "disable_notification", description: "静默发送", component: 'checkbox' },
          { key: "parse_mode", component: 'hidden', defaultValue: "HTML" },
        ],
      },
      {
        type: "MarkdownV2",
        name: "Markdown消息",
        description: "支持 MarkdownV2 格式的富文本消息",
        fields: [
          {
            key: "text",
            description: "Markdown 消息内容",
            required: true,
            component: 'textarea'
          },
          {
            key: "disable_notification",
            description: "静默发送",
            component: 'checkbox'
          },
          {
            key: "parse_mode",
            component: 'hidden',
            defaultValue: "MarkdownV2"
          },
        ],
      },
    ]
  }

  async sendMessage(
    message: TelegramMessage,
    options: SendMessageOptions
  ): Promise<Response> {
    const { botToken, chatId, threadId } = options
    
    if (!botToken || !chatId) {
      throw new Error("缺少 Bot Token 或 Chat ID")
    }
    
    console.log('sendTelegramMessage message:', message)

    const payload: TelegramMessage = {
      ...message,
      chat_id: chatId,
    };

    if (threadId) {
      payload.message_thread_id = threadId;
    }

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    )

    if (!response.ok) {
      const data = await response.json() as { description: string }
      throw new Error(`Telegram 消息推送失败: ${data.description}`)
    }

    return response
  }
}
