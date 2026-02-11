# Ultimate Prompt Builder - 運用ガイド

## プロジェクト概要
日本語で選択するだけでAI画像生成用の英語プロンプトを生成するReact/TypeScriptアプリ。
APIキー不要。完全クライアントサイド動作。

## 起動方法
```bash
cd 画像生成-主役
npm install
npm run dev
# → http://localhost:3000 でアクセス
```

## ビルド
```bash
npm run build    # dist/ に出力
npm run preview  # ビルド結果をプレビュー
```

## ディレクトリ構成
```
画像生成-主役/
├── index.html              # エントリHTML
├── index.tsx               # React マウントポイント
├── index.css               # カスタムアニメーション
├── App.tsx                 # レイアウト
├── types.ts                # 型定義
├── constants.ts            # 選択肢データ（カメラ, フィルム, 照明等）
├── components/
│   ├── PromptGenerator.tsx # メインUI + ロジック
│   └── Accordion.tsx       # アコーディオンUI
├── services/
│   └── geminiService.ts    # 日英辞書翻訳（ローカル）
├── spec.md                 # 要件定義書
├── vite.config.ts          # Vite設定
├── tsconfig.json           # TypeScript設定
└── package.json            # 依存関係
```

## 修正ルール

### 選択肢を追加・変更する場合
`constants.ts` の各配列に `{ label: "日本語表示名", value: "英語プロンプト値" }` を追加。

### 翻訳辞書を拡張する場合
`services/geminiService.ts` の `TRANSLATION_DICT` 配列に `[/日本語パターン/g, '英訳']` を追加。
長い語句を先に配置すること（部分一致防止）。

### 新しいカテゴリを追加する場合
1. `types.ts` の `PromptState` に新フィールドを追加
2. `constants.ts` に選択肢配列を追加
3. `PromptGenerator.tsx` に Accordion セクションを追加

## テクノロジースタック
- React 19 + TypeScript
- Vite 6 (dev server & bundler)
- Tailwind CSS (CDN)
- Lucide React (icons)
