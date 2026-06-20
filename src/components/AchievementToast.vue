<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Achievement } from '@/types/game'
import { ACHIEVEMENT_TIER_COLORS } from '@/utils/constants'

interface Props {
  achievement: Achievement | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const isVisible = ref(false)
let hideTimer: ReturnType<typeof setTimeout> | null = null

const show = () => {
  isVisible.value = true
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    hide()
  }, 4000)
}

const hide = () => {
  isVisible.value = false
  setTimeout(() => {
    emit('close')
  }, 300)
}

onMounted(() => {
  if (props.achievement) {
    setTimeout(show, 100)
  }
})

onUnmounted(() => {
  if (hideTimer) clearTimeout(hideTimer)
})
</script>

<template>
  <Transition name="toast">
    <div
      v-if="achievement && isVisible"
      class="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-pop-in"
    >
      <div
        class="glass rounded-2xl px-6 py-4 card-shadow flex items-center gap-4 min-w-[300px] max-w-[400px] border-2"
        :class="`border-${achievement.tier === 'gold' ? 'yellow' : achievement.tier === 'silver' ? 'slate' : achievement.tier === 'legend' ? 'fuchsia' : 'amber'}-400/50`"
      >
        <div
          class="w-14 h-14 rounded-xl flex items-center justify-center text-3xl bg-gradient-to-br shadow-lg"
          :class="ACHIEVEMENT_TIER_COLORS[achievement.tier]"
        >
          {{ achievement.icon }}
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-amber-300 text-xs font-bold uppercase tracking-wider mb-0.5">
            🎉 成就解锁
          </div>
          <div class="text-white font-bold text-lg truncate">
            {{ achievement.name }}
          </div>
          <div class="text-white/60 text-xs truncate">
            {{ achievement.description }}
          </div>
        </div>
        <button
          class="text-white/40 hover:text-white/80 transition-colors ml-2 text-xl"
          @click="hide"
        >
          ✕
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, -30px);
}
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -30px);
}
</style>
