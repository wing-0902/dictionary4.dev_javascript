// uuidライブラリをインポート
import { v4 as uuidv4 } from 'uuid';

// Workerの環境変数（KVのバインディング、シークレットキー）を型定義
export interface Env {
  SURVEY_ANSWERS: any;
  TURNSTILE_SECRET_KEY: string; // シークレットキーを環境変数に追加
}

// アンケートのデータ構造を定義
interface SurveyData {
  host: string;
  username?: string;
  email?: string;
  rate: number;
  comment?: string;
  timestamp: number;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method === 'POST') {
      try {
        // FormDataとしてリクエストをパース
        const formData = await request.formData();
        const token = formData.get('cf-turnstile-response');

        // Turnstileトークンがない場合はエラー
        if (!token) {
          return new Response(JSON.stringify({ error: 'Turnstile認証してから出直してください．' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }

        // Cloudflareの検証エンドポイントにリクエスト
        const verificationResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          body: `secret=${encodeURIComponent(env.TURNSTILE_SECRET_KEY)}&response=${encodeURIComponent(token as string)}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        const verificationResult = await verificationResponse.json();

        // 検証失敗
        if (!verificationResult.success) {
          console.error('Turnstile検証失敗:', verificationResult['error-codes']);
          return new Response(JSON.stringify({ error: 'あなたはロボットです．' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }
        
        // 検証成功。ここからアンケートデータを処理
        const data: SurveyData = {
          host: formData.get('host') as string,
          username: formData.get('username') as string || undefined,
          email: formData.get('email') as string || undefined,
          rate: parseInt(formData.get('rate') as string, 10),
          comment: formData.get('comment') as string || undefined,
          timestamp: Date.now(),
        };

        // 必須項目である host と rate のバリデーション
        if (!data.host || typeof data.rate !== 'number' || data.rate < 1 || data.rate > 5) {
          return new Response(JSON.stringify({ error: 'ちゃんと評価してや〜！' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }

        // ユニークなID（UUID）をキーとして生成
        const key = uuidv4();
        
        // データをJSON文字列に変換してKVに保存
        await env.SURVEY_ANSWERS.put(key, JSON.stringify(data));
        
        return new Response(JSON.stringify({ message: 'たぶんアンケート回答を保存できました．', key: key }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });

      } catch (e) {
        console.error('エラー:', e);
        return new Response(JSON.stringify({ error: 'リクエストの形式が間違うてる気がするかもしれません．' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }
    }

    return new Response(JSON.stringify({ error: 'こんなHTTPメソッドは許可してへんぞ！' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  },
};