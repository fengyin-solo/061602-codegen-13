import type { Weather, WeatherEffect, BerryType, GrowthStage, Personality, Achievement } from '@/types/game'

export const ATTR_MIN = 0
export const ATTR_MAX = 100
export const DEATH_THRESHOLD = 10

export const STAGE_DURATION: Record<Exclude<GrowthStage, 'adult'>, number> = {
  egg: 1,
  chick: 2,
  juvenile: 2,
  subadult: 1,
}

export const STAGE_NAMES: Record<GrowthStage, string> = {
  egg: '🥚 蛋',
  chick: '🐣 雏鸟',
  juvenile: '🐥 幼鸟',
  subadult: '🦜 亚成鸟',
  adult: '🐦 成鸟',
}

export const STAGE_EMOJI: Record<GrowthStage, string> = {
  egg: '🥚',
  chick: '🐣',
  juvenile: '🐥',
  subadult: '🦜',
  adult: '🐦',
}

export const FOOD_NEED_MULTIPLIER: Record<Exclude<GrowthStage, 'egg'>, number> = {
  chick: 1.5,
  juvenile: 1.2,
  subadult: 1.0,
  adult: 0.8,
}

export const HUNGER_DECAY_RATE = 1.5
export const FEAR_DECAY_RATE = 0.8
export const HEALTH_RECOVERY_RATE = 0.5

export const BERRY_SPAWN_INTERVAL = 4000
export const BERRY_MAX_COUNT = 8
export const BERRY_LIFETIME = 20000

export const BERRY_VALUES: Record<BerryType, number> = {
  red: 10,
  blue: 15,
  golden: 25,
}

export const BERRY_COLORS: Record<BerryType, string> = {
  red: '#C41E3A',
  blue: '#4169E1',
  golden: '#FFD700',
}

export const BERRY_EMOJI: Record<BerryType, string> = {
  red: '🍒',
  blue: '🫐',
  golden: '✨',
}

export const WEATHER_CHANGE_INTERVAL = 25000

export const WEATHER_EFFECTS: Record<Weather, WeatherEffect> = {
  sunny: { hungerMod: 1.0, fearMod: 0.8, healthMod: 1.0 },
  rainy: { hungerMod: 1.3, fearMod: 1.5, healthMod: 0.9, awayChance: 0.08 },
  snowy: { hungerMod: 1.5, fearMod: 1.2, healthMod: 0.7, sickChance: 0.12 },
  stormy: { hungerMod: 1.2, fearMod: 2.0, healthMod: 0.6, awayChance: 0.2, sickChance: 0.18 },
}

export const WEATHER_NAMES: Record<Weather, string> = {
  sunny: '☀️ 晴天',
  rainy: '🌧️ 雨天',
  snowy: '❄️ 雪天',
  stormy: '🌪️ 暴风',
}

export const WEATHER_COLORS: Record<Weather, string> = {
  sunny: 'from-amber-300/30 to-yellow-200/20',
  rainy: 'from-blue-400/40 to-gray-500/30',
  snowy: 'from-blue-100/40 to-white/30',
  stormy: 'from-gray-600/50 to-purple-800/40',
}

export const PERSONALITY_NAMES: Record<Personality, string> = {
  bold: '勇敢大胆',
  shy: '胆小害羞',
  gentle: '温柔恬静',
  curious: '好奇活泼',
  stubborn: '倔强独立',
}

export const PERSONALITY_EMOJI: Record<Personality, string> = {
  bold: '💪',
  shy: '🥺',
  gentle: '🌸',
  curious: '🌟',
  stubborn: '😤',
}

export const DAY_DURATION = 60000
export const INITIAL_FOOD = 30
export const MIN_EGGS = 2
export const MAX_EGGS = 4
export const MAX_BREEDING_ROUNDS = 2

export const BIRD_NAMES = [
  '毛毛', '豆豆', '啾啾', '喳喳', '花花', '点点', '果果', '泡泡',
  '糖糖', '圆圆', '小米', '小麦', '云朵', '星星', '月亮', '太阳',
  '小橘', '小蓝', '小绿', '小红', '阿黄', '阿白', '阿黑', '阿灰',
]

export const ACHIEVEMENT_CATEGORY_NAMES: Record<string, string> = {
  feeding: '🍽️ 勤喂标兵',
  survival: '🛡️ 守护天使',
  health: '💚 健康达人',
}

export const ACHIEVEMENT_TIER_NAMES: Record<string, string> = {
  bronze: '铜牌',
  silver: '银牌',
  gold: '金牌',
  legend: '传说',
}

export const ACHIEVEMENT_TIER_COLORS: Record<string, string> = {
  bronze: 'from-amber-600 to-amber-800',
  silver: 'from-slate-300 to-slate-500',
  gold: 'from-yellow-300 to-amber-500',
  legend: 'from-rose-400 via-fuchsia-500 to-indigo-500',
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'feeding_bronze',
    category: 'feeding',
    tier: 'bronze',
    name: '喂食新手',
    description: '连续喂食 5 次不中断',
    icon: '🍽️',
    target: 5,
    color: '#cd7f32',
  },
  {
    id: 'feeding_silver',
    category: 'feeding',
    tier: 'silver',
    name: '勤劳饲养员',
    description: '连续喂食 15 次不中断',
    icon: '🥣',
    target: 15,
    color: '#c0c0c0',
  },
  {
    id: 'feeding_gold',
    category: 'feeding',
    tier: 'gold',
    name: '喂食达人',
    description: '连续喂食 30 次不中断',
    icon: '🍱',
    target: 30,
    color: '#ffd700',
  },
  {
    id: 'feeding_legend',
    category: 'feeding',
    tier: 'legend',
    name: '永不饥饿之巢',
    description: '单局累计喂食 100 次',
    icon: '👑',
    target: 100,
    color: '#ff1493',
  },
  {
    id: 'survival_bronze',
    category: 'survival',
    tier: 'bronze',
    name: '新手守护者',
    description: '单局孵化 5 只且零死亡',
    icon: '🛡️',
    target: 5,
    color: '#cd7f32',
  },
  {
    id: 'survival_silver',
    category: 'survival',
    tier: 'silver',
    name: '生命守护',
    description: '单局孵化 8 只且零死亡',
    icon: '💫',
    target: 8,
    color: '#c0c0c0',
  },
  {
    id: 'survival_gold',
    category: 'survival',
    tier: 'gold',
    name: '鸟巢守护神',
    description: '单局孵化 12 只且零死亡',
    icon: '🏆',
    target: 12,
    color: '#ffd700',
  },
  {
    id: 'survival_legend',
    category: 'survival',
    tier: 'legend',
    name: '不朽伊甸园',
    description: '通关全程零死亡',
    icon: '🌟',
    target: 999,
    color: '#ff1493',
  },
  {
    id: 'health_bronze',
    category: 'health',
    tier: 'bronze',
    name: '健康小卫士',
    description: '所有小鸟平均健康值 ≥ 70',
    icon: '💚',
    target: 70,
    color: '#cd7f32',
  },
  {
    id: 'health_silver',
    category: 'health',
    tier: 'silver',
    name: '健康管家',
    description: '所有小鸟平均健康值 ≥ 85',
    icon: '💖',
    target: 85,
    color: '#c0c0c0',
  },
  {
    id: 'health_gold',
    category: 'health',
    tier: 'gold',
    name: '养生大师',
    description: '所有小鸟平均健康值 ≥ 95',
    icon: '✨',
    target: 95,
    color: '#ffd700',
  },
  {
    id: 'health_legend',
    category: 'health',
    tier: 'legend',
    name: '生命之光',
    description: '所有小鸟健康值全程保持 100',
    icon: '🌈',
    target: 100,
    color: '#ff1493',
  },
]

export const ACHIEVEMENT_CATEGORIES = ['feeding', 'survival', 'health'] as const
