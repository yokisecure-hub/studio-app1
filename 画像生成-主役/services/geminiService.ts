/**
 * Local Japanese-to-English translation for image generation prompts.
 * No API key required - runs entirely client-side.
 */

// Comprehensive Japanese-to-English dictionary for prompt building
// Ordered from longer phrases to shorter to avoid partial matches
const TRANSLATION_DICT: [RegExp, string][] = [
  // Nature - compound first
  [/桜の木/g, 'cherry blossom tree'],
  [/桜並木/g, 'cherry blossom lined avenue'],
  [/桜/g, 'cherry blossoms'],
  [/紅葉/g, 'autumn leaves, red maple foliage'],
  [/満月/g, 'full moon'],
  [/三日月/g, 'crescent moon'],
  [/月明かり/g, 'moonlight'],
  [/月/g, 'moon'],
  [/星空/g, 'starry sky'],
  [/天の川/g, 'milky way galaxy'],
  [/虹/g, 'rainbow'],
  [/夕焼け/g, 'sunset glow'],
  [/朝焼け/g, 'sunrise glow'],
  [/日の出/g, 'sunrise'],
  [/日の入り/g, 'sunset'],
  [/雷/g, 'lightning, thunderstorm'],
  [/台風/g, 'typhoon'],
  [/霧/g, 'fog, mist'],
  [/雲海/g, 'sea of clouds'],
  [/雲/g, 'clouds'],
  [/雨上がり/g, 'after rain'],
  [/雨/g, 'rain'],
  [/雪景色/g, 'snowy landscape'],
  [/吹雪/g, 'blizzard'],
  [/雪/g, 'snow'],
  [/嵐/g, 'storm'],
  [/花畑/g, 'flower field'],
  [/花/g, 'flowers'],
  [/海辺/g, 'seaside, beach'],
  [/海/g, 'ocean, sea'],
  [/湖/g, 'lake'],
  [/滝/g, 'waterfall'],
  [/川/g, 'river'],
  [/山脈/g, 'mountain range'],
  [/火山/g, 'volcano'],
  [/山/g, 'mountain'],
  [/森林/g, 'deep forest'],
  [/森/g, 'forest'],
  [/竹林/g, 'bamboo grove'],
  [/草原/g, 'grassland, meadow'],
  [/砂漠/g, 'desert'],
  [/洞窟/g, 'cave'],
  [/空/g, 'sky'],

  // People - compound first
  [/宇宙飛行士/g, 'astronaut'],
  [/女の子/g, 'girl'],
  [/男の子/g, 'boy'],
  [/少女/g, 'young girl'],
  [/少年/g, 'young boy'],
  [/女性/g, 'woman'],
  [/男性/g, 'man'],
  [/老人/g, 'elderly person'],
  [/子供たち/g, 'children'],
  [/子供/g, 'child'],
  [/赤ちゃん/g, 'baby'],
  [/家族/g, 'family'],
  [/恋人/g, 'lovers'],
  [/武士/g, 'samurai warrior'],
  [/侍/g, 'samurai'],
  [/忍者/g, 'ninja'],
  [/芸者/g, 'geisha'],
  [/巫女/g, 'shrine maiden'],
  [/魔法使い/g, 'wizard, sorcerer'],
  [/戦士/g, 'warrior'],
  [/騎士/g, 'knight'],
  [/王女/g, 'princess'],
  [/王子/g, 'prince'],
  [/天使/g, 'angel'],
  [/悪魔/g, 'demon'],
  [/妖精/g, 'fairy'],
  [/人魚/g, 'mermaid'],

  // Animals
  [/猫/g, 'cat'],
  [/犬/g, 'dog'],
  [/狼/g, 'wolf'],
  [/狐/g, 'fox'],
  [/鹿/g, 'deer'],
  [/馬/g, 'horse'],
  [/鳥/g, 'bird'],
  [/鷹/g, 'hawk, eagle'],
  [/蝶/g, 'butterfly'],
  [/蛍/g, 'firefly'],
  [/魚/g, 'fish'],
  [/鯨/g, 'whale'],
  [/龍/g, 'dragon'],
  [/ドラゴン/g, 'dragon'],
  [/フェニックス/g, 'phoenix'],
  [/ユニコーン/g, 'unicorn'],

  // Places - Japan (compound first)
  [/東京タワー/g, 'Tokyo Tower'],
  [/スカイツリー/g, 'Tokyo Skytree'],
  [/秋葉原/g, 'Akihabara'],
  [/新宿/g, 'Shinjuku'],
  [/渋谷/g, 'Shibuya'],
  [/浅草/g, 'Asakusa'],
  [/銀座/g, 'Ginza'],
  [/原宿/g, 'Harajuku'],
  [/東京/g, 'Tokyo'],
  [/京都/g, 'Kyoto'],
  [/大阪/g, 'Osaka'],
  [/富士山/g, 'Mount Fuji'],
  [/日本庭園/g, 'Japanese garden'],
  [/温泉/g, 'hot spring, onsen'],
  [/鳥居/g, 'torii gate'],
  [/神社/g, 'Shinto shrine'],
  [/寺/g, 'Buddhist temple'],
  [/城/g, 'Japanese castle'],

  // Locations - General
  [/街並み/g, 'cityscape, street view'],
  [/路地裏/g, 'back alley'],
  [/街角/g, 'street corner'],
  [/街/g, 'city street'],
  [/都市/g, 'metropolis, city'],
  [/廃墟/g, 'ruins, abandoned place'],
  [/工場/g, 'factory'],
  [/研究所/g, 'laboratory'],
  [/図書館/g, 'library'],
  [/学校/g, 'school'],
  [/教室/g, 'classroom'],
  [/カフェ/g, 'cafe'],
  [/レストラン/g, 'restaurant'],
  [/宇宙ステーション/g, 'space station'],
  [/宇宙/g, 'outer space, cosmos'],

  // Aesthetics & Genres
  [/サイバーパンク/g, 'cyberpunk'],
  [/スチームパンク/g, 'steampunk'],
  [/ファンタジー/g, 'fantasy'],
  [/SF/g, 'science fiction'],
  [/ホラー/g, 'horror'],
  [/ゴシック/g, 'gothic'],
  [/レトロ/g, 'retro'],
  [/未来的/g, 'futuristic'],
  [/未来/g, 'future'],
  [/古代/g, 'ancient'],
  [/中世/g, 'medieval'],
  [/幻想的/g, 'fantastical, dreamlike'],
  [/神秘的/g, 'mysterious, mystical'],
  [/壮大/g, 'grand, epic'],
  [/美しい/g, 'beautiful'],
  [/可愛い/g, 'cute, kawaii'],
  [/かわいい/g, 'cute, kawaii'],
  [/かっこいい/g, 'cool, stylish'],
  [/怖い/g, 'scary, eerie'],
  [/暗い/g, 'dark'],
  [/明るい/g, 'bright'],
  [/静かな/g, 'quiet, serene'],
  [/賑やかな/g, 'lively, bustling'],
  [/ロボット/g, 'robot'],

  // Time of day
  [/夜明け/g, 'dawn'],
  [/早朝/g, 'early morning'],
  [/朝/g, 'morning'],
  [/昼/g, 'midday'],
  [/夕暮れ/g, 'dusk, twilight'],
  [/夜景/g, 'night view, city lights at night'],
  [/真夜中/g, 'midnight'],
  [/夜/g, 'night'],

  // Modifiers / particles
  [/の中で/g, ' surrounded by'],
  [/の中の/g, ' inside'],
  [/の上の/g, ' above'],
  [/の下の/g, ' below'],
  [/に佇む/g, ' standing in'],
  [/を見つめる/g, ' gazing at'],
  [/が飛ぶ/g, ' flying'],
  [/が歩く/g, ' walking'],
  [/が走る/g, ' running'],
  [/と/g, ' and '],
  [/で/g, ' in '],
  [/な/g, ' '],
  [/の/g, ' '],
];

export const translateSubject = async (japaneseText: string): Promise<string> => {
  if (!japaneseText.trim()) return "";

  let result = japaneseText.trim();

  // Apply dictionary translations (longer phrases first - already ordered)
  for (const [pattern, replacement] of TRANSLATION_DICT) {
    result = result.replace(pattern, replacement);
  }

  // Clean up extra spaces
  result = result.replace(/\s+/g, ' ').trim();

  // If still contains Japanese characters, keep both
  const hasJapanese = /[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/.test(result);
  if (hasJapanese && result !== japaneseText) {
    return result;
  } else if (hasJapanese) {
    return japaneseText;
  }

  return result;
};
