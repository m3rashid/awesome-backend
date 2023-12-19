/// <reference types="vite/client" />

declare module 'to-emoji' {
  declare function emojify(str: string): string;
  declare function deemojify(str: string): string;
  declare function emoticonToEmoji(str: string): string;
  declare function emojiToEmoticon(str: string): string;
}
