import { OptionItem } from './types';

export const QUALITY_PREFIX = "Generate a high-quality image using Nano Banana Pro. Masterpiece, award-winning photography, highly detailed, ";
export const QUALITY_SUFFIX = ", 8k resolution, insane details, trending on ArtStation, no artifacts, perfect anatomy, distinct facial features.";

export const ASPECT_RATIOS: OptionItem[] = [
  { label: "16:9 (映画・横長)", value: "--ar 16:9" },
  { label: "9:16 (スマホ・縦長)", value: "--ar 9:16" },
  { label: "1:1 (正方形)", value: "--ar 1:1" },
  { label: "2.35:1 (シネマスコープ)", value: "--ar 2.35:1" },
  { label: "4:3 (クラシック)", value: "--ar 4:3" },
];

export const CAMERA_GEAR: OptionItem[] = [
  { label: "85mm ポートレート (f/1.2)", value: "85mm prime lens, f/1.2 aperture, creamy bokeh, shallow depth of field" },
  { label: "35mm ストリート (f/8)", value: "35mm wide-angle lens, f/8 aperture, deep depth of field, sharp focus" },
  { label: "100mm マクロ (超接写)", value: "100mm macro lens, extreme close-up, microscopic details, 1:1 magnification" },
  { label: "ティルトシフト (ミニチュア風)", value: "Tilt-shift lens, miniature effect, selective focus" },
  { label: "魚眼レンズ (ダイナミック)", value: "Fisheye lens, ultra-wide distortion, dynamic perspective" },
  { label: "ドローン空撮 (俯瞰)", value: "Drone photography, aerial view, high altitude shot" },
];

export const FILM_TEXTURE: OptionItem[] = [
  { label: "最新デジタル8K (超クリア)", value: "Shot on Sony A7R V, 8k resolution, uncompressed RAW, hyper-realistic" },
  { label: "Kodak Portra 400 (温かい粒子感)", value: "Kodak Portra 400 film stock, fine film grain, warm tones, analog aesthetic" },
  { label: "Fujifilm Velvia (鮮烈な色彩)", value: "Fujifilm Velvia 50, high saturation, vivid colors, high contrast" },
  { label: "モノクロ・ノワール (白黒映画)", value: "Film noir style, high contrast black and white, moody shadows, dramatic" },
  { label: "VHSグリッチ (90年代レトロ)", value: "VHS glitch effect, tracking lines, low fidelity, retro 90s aesthetic" },
];

export const LIGHTING_ATMOSPHERE: OptionItem[] = [
  { label: "ボリュメトリック (神の光)", value: "Volumetric lighting, god rays, dust particles, atmospheric haze" },
  { label: "レンブラント (芸術的な陰影)", value: "Rembrandt lighting, chiaroscuro, studio lighting, dramatic shadows" },
  { label: "サイバーパンク (ネオン)", value: "Neon rim lighting, cyan and magenta hues, glowing ambiance, futuristic" },
  { label: "ゴールデンアワー (夕暮れ)", value: "Golden hour lighting, warm soft glow, long shadows, magical atmosphere" },
  { label: "コースティクス (水の揺らめき)", value: "Water caustics, shimmering light refraction, underwater feel" },
];

export const TIME_MOTION: OptionItem[] = [
  { label: "瞬間冷凍 (高速シャッター)", value: "High shutter speed (1/4000s), frozen action, water droplets suspended, sharp details" },
  { label: "長時間露光 (光の軌跡)", value: "Long exposure photography, silky smooth motion, light trails, ethereal feel" },
  { label: "流し撮り (スピード感)", value: "Panning shot, subject in focus, directional motion blur background, sense of speed" },
  { label: "指定なし (標準)", value: "Standard shutter speed" },
];

export const COMPOSITION: OptionItem[] = [
  { label: "リーディングライン (奥行き)", value: "Strong leading lines, converging perspective, guiding the eye" },
  { label: "三分割法 (安定感)", value: "Rule of thirds composition, balanced framing" },
  { label: "ネガティブスペース (余白)", value: "Minimalism, heavy negative space, isolation, clean background" },
  { label: "フレーム・イン・フレーム (没入感)", value: "Frame within a frame, looking through an opening, layered depth" },
  { label: "ダッチアングル (緊迫感)", value: "Dutch angle, tilted horizon, dynamic tension" },
];

export const MATERIAL_RENDER: OptionItem[] = [
  { label: "サブサーフェス (肌の透明感)", value: "Subsurface scattering (SSS), translucent skin texture, soft light penetration" },
  { label: "オクタンレンダー (3D超絶技巧)", value: "Rendered in Octane, Unreal Engine 5, ray tracing, global illumination" },
  { label: "インパスト (油絵の厚塗り)", value: "Impasto oil painting, thick brushstrokes, textured canvas, palette knife details" },
  { label: "指定なし (実写)", value: "Photorealistic texture" },
];

export const DIRECTOR_STYLE: OptionItem[] = [
  { label: "ソーラーパンク (自然調和・ユートピア)", value: "Solarpunk aesthetic, Art Nouveau architecture, lush vertical gardens, bright sunlight, sustainable technology, utopian atmosphere, organic curves, hopeful future" },
  { label: "コテージコア (牧歌的・スローライフ)", value: "Cottagecore aesthetic, rustic wooden cabin, field of wildflowers, warm sunlight, vintage texture, peaceful, pastoral, Studio Ghibli vibe" },
  { label: "サイバーパンク (電脳・ディストピア)", value: "Cyberpunk aesthetic, high-tech low-life, neon lights, rain-slicked streets, futuristic dystopia, mechanical details, dark atmosphere" },
  { label: "スチームパンク (蒸気機関・真鍮)", value: "Steampunk aesthetic, brass gears, Victorian fashion, steam-powered machinery, copper tones, retro-futurism" },
  { label: "ウェス・アンダーソン (対称・パステル)", value: "Wes Anderson style, perfect symmetry, pastel color palette, whimsical, flat lay aesthetic" },
  { label: "クリストファー・ノーラン (重厚・IMAX)", value: "Christopher Nolan style, IMAX quality, cinematic realism, muted tones, epic scale, sharp focus" },
  { label: "新海誠 (高精細アニメ背景)", value: "Makoto Shinkai style, hyper-detailed anime background, lens flares, vibrant clouds, emotional atmosphere, comet in sky" },
  { label: "指定なし", value: "" },
];