<script setup lang="ts">
import { computed, ref } from 'vue'
import { ACHIEVEMENTS, ACHIEVEMENT_CATEGORY_NAMES, ACHIEVEMENT_TIER_COLORS, ACHIEVEMENT_TIER_NAMES, ACHIEVEMENT_CATEGORIES } from '@/utils/constants'
import { useGameState } from '@/composables/useGameState'
import type { AchievementCategory } from '@/types/game'

const { getAchievementProgress, unlockedAchievements } = useGameState()

const activeCategory = ref<AchievementCategory>('feeding')

const achievementsByCategory = computed(() => {
  const result: Record<string, typeof ACHIEVEMENTS> = {}
  ACHIEVEMENT_CATEGORIES.forEach(cat => {
    result[cat] = ACHIEVEMENTS.filter(a => a.category === cat)
  })
  return result
})

const totalUnlocked = computed(() => unlockedAchievements.value.length)
const totalAchievements = ACHIEVEMENTS.length

const getProgress = (achievementId: string) => {
  return getAchievementProgress(achievementId)
}

const formatProgress = (achievement: typeof ACHIEVEMENTS[0], current: number) => {
  if (achievement.category === 'health') {
    return `${Math.round(current)}%`
  }
  return `${current}/${achievement.target}`
}
</script>

<template>
  <div class="w-full">
    <div class="flex items-center justify-between mb-5">
      <h2 class="font-display text-2xl text-amber-300 flex items-center gap-2">
        <span>📖</span> 照料成就册
      </h2>
      <div class="text-white/80 text-sm">
        已解锁 <span class="text-amber-300 font-bold text-lg">{{ totalUnlocked }}</span>
        <span class="text-white/40"> / {{ totalAchievements }}</span>
      </div>
    </div>

    <div class="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
      <button
        v-for="cat in ACHIEVEMENT_CATEGORIES"
        :key="cat"
        class="px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
        :class="activeCategory === cat
          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
          : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'"
        @click="activeCategory = cat"
      >
        {{ ACHIEVEMENT_CATEGORY_NAMES[cat] }}
      </button>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      <div
        v-for="achievement in achievementsByCategory[activeCategory]"
        :key="achievement.id"
        class="relative rounded-2xl p-4 border transition-all"
        :class="getProgress(achievement.id).unlocked
          ? 'bg-white/10 border-white/20 hover:bg-white/15'
          : 'bg-white/5 border-white/10 opacity-75'"
      >
        <div
          class="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center text-4xl bg-gradient-to-br shadow-lg relative overflow-hidden"
          :class="getProgress(achievement.id).unlocked
            ? ACHIEVEMENT_TIER_COLORS[achievement.tier]
            : 'from-gray-600 to-gray-700 grayscale'"
        >
          <span v-if="getProgress(achievement.id).unlocked" class="animate-float">
            {{ achievement.icon }}
          </span>
          <span v-else class="opacity-50">
            {{ achievement.icon }}
          </span>
          <div
            v-if="!getProgress(achievement.id).unlocked"
            class="absolute inset-0 flex items-center justify-center bg-black/40"
          >
            <span class="text-2xl">🔒</span>
          </div>
        </div>

        <div class="text-center">
          <div class="text-white font-bold text-sm mb-1 truncate">
            {{ achievement.name }}
          </div>
          <div
            class="text-xs mb-2 inline-block px-2 py-0.5 rounded-full"
            :class="getProgress(achievement.id).unlocked
              ? `bg-gradient-to-r ${ACHIEVEMENT_TIER_COLORS[achievement.tier]} text-white`
              : 'bg-white/10 text-white/50'"
          >
            {{ ACHIEVEMENT_TIER_NAMES[achievement.tier] }}
          </div>
          <div class="text-white/50 text-xs leading-relaxed min-h-[32px]">
            {{ achievement.description }}
          </div>

          <div v-if="!getProgress(achievement.id).unlocked" class="mt-3">
            <div class="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all"
                :style="{ width: `${Math.min(100, (getProgress(achievement.id).current / achievement.target) * 100)}%` }"
              />
            </div>
            <div class="text-white/40 text-xs mt-1">
              {{ formatProgress(achievement, getProgress(achievement.id).current) }}
            </div>
          </div>

          <div v-else class="mt-3 text-amber-300 text-xs font-bold flex items-center justify-center gap-1">
            <span>✓</span> 已达成
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
