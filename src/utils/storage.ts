import type { GameState, AchievementProgress } from '@/types/game'

const STORAGE_KEY = 'virtual-bird-nest-save'
const ACHIEVEMENT_STORAGE_KEY = 'virtual-bird-nest-achievements'

export const saveGame = (state: GameState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('保存游戏失败', e)
  }
}

export const loadGame = (): GameState | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : null
  } catch (e) {
    console.warn('读取存档失败', e)
    return null
  }
}

export const clearSave = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (e) {
    console.warn('清除存档失败', e)
  }
}

export const saveAchievements = (unlocked: Record<string, AchievementProgress>): void => {
  try {
    localStorage.setItem(ACHIEVEMENT_STORAGE_KEY, JSON.stringify(unlocked))
  } catch (e) {
    console.warn('保存成就失败', e)
  }
}

export const loadAchievements = (): Record<string, AchievementProgress> => {
  try {
    const data = localStorage.getItem(ACHIEVEMENT_STORAGE_KEY)
    return data ? JSON.parse(data) : {}
  } catch (e) {
    console.warn('读取成就失败', e)
    return {}
  }
}

export const clearAchievements = (): void => {
  try {
    localStorage.removeItem(ACHIEVEMENT_STORAGE_KEY)
  } catch (e) {
    console.warn('清除成就失败', e)
  }
}
