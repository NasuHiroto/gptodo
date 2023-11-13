import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/';
const MODEL = 'gpt-3.5-turbo';
const API_KEY = 'あなたのchatGPTのAPIキーを入れてください';

export const chat = async (message, maxTokens = 100) => {
  try {
    // 質問文に単語を含める
    const fullMessage = `${message} の取り組む順序を単語の箇条書き５０文字以内で教えてください`;

    const response = await axios.post(`${API_URL}chat/completions`, {
      // モデル ID の指定
      model: MODEL,
      // 質問内容とシステムメッセージ
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that provides information.'
        },
        {
          role: 'user',
          content: fullMessage, // 質問文を変更
        },
      ],
      max_tokens: maxTokens, // トークン数の制限を設定
    }, {
      // 送信する HTTP ヘッダー(認証情報)
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    // 回答の取得
    return response.data.choices[0].message.content;

  } catch (error) {
    console.error(error);
    return null;
  }
}
