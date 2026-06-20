<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import type { Achievement } from '@/types/game'
import { ACHIEVEMENT_TIER_COLORS, ACHIEVEMENT_TIER_NAMES } from '@/utils/constants'

interface Props {
  achievement: Achievement | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const isVisible = ref(false)
const showContent = ref(false)
let hideTimer: ReturnType<typeof setTimeout> | null = null

const show = async () => {
  isVisible.value = true
  await nextTick()
  setTimeout(() => {
    showContent.value = true
  }, 50)
}

const hide = () => {
  showContent.value = false
  setTimeout(() => {
    isVisible.value = false
    setTimeout(() => {
      emit('close')
    }, 200)
  }, 200)
}

const startAutoHide = () => {
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    hide()
  }, 4500)
}

watch(
  () => props.achievement,
  (newVal) => {
    if (newVal) {
      show()
      startAutoHide()
    }
  }
)

onMounted(() => {
  if (props.achievement) {
    show()
    startAutoHide()
  }
})

onUnmounted(() => {
  if (hideTimer) clearTimeout(hideTimer)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="toast-fade">
      <div
        v-if="achievement && isVisible"
        class="fixed top-8 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto"
      >
        <div
          class="relative overflow-hidden rounded-3xl shadow-2xl border-2 min-w-[340px] max-w-[420px]"
          :class="`border-${achievement.tier === 'gold' ? 'yellow' : achievement.tier === 'silver' ? 'slate' : achievement.tier === 'legend' ? 'fuchsia' : 'amber'}-400/60`"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br opacity-90"
            :class="ACHIEVEMENT_TIER_COLORS[achievement.tier]"
          />
          <div class="absolute inset-0 bg-black/30" />

          <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.3),transparent_60%)]"
          />

          <div
            v-if="showContent"
            class="relative p-5 flex items-center gap-4 animate-achievement-pop"
          >
            <div class="relative flex-shrink-0">
              <div
                class="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-lg bg-white/20 backdrop-blur-sm border border-white/30"
              >
                <span class="animate-achievement-bounce">{{ achievement.icon }}</span>
              </div>
              <div class="absolute -top-1 -right-1 text-lg animate-pulse">✨</div>
              <div class="absolute -bottom-1 -left-1 text-sm animate-pulse" style="animation-delay: 0.5s">✨</div>
            </div>

            <div class="flex-1 min-w-0">
              <div class="text-white/90 text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <span class="text-lg">🎉</span>
                <span>成就解锁</span>
                <span class="text-lg">🎉</span>
              </div>
              <div class="text-white font-bold text-xl mb-1 drop-shadow-lg truncate">
                {{ achievement.name }}
              </div>
              <div class="text-white/80 text-sm mb-2 truncate">
                {{ achievement.description }}
              </div>
              <div
                class="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/25 text-white border border-white/30"
              >
                {{ ACHIEVEMENT_TIER_NAMES[achievement.tier] }}成就
              </div>
            </div>

            <button
              class="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white/80 hover:text-white transition-all flex items-center justify-center text-lg backdrop-blur-sm border border-white/20"
              @click="hide"
            >
              ✕
            </button>
          </div>

          <div class="h-1 bg-white/20">
            <div
              v-if="showContent"
              class="h-full bg-white/60 rounded-r-full animate-progress-shrink"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-fade-enter-from {
  opacity: 0;
  transform: translate(-50%, -40px) scale(0.8);
}
.toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px) scale(0.9);
}

@keyframes achievementPop {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(20px);
  }
  50% {
    transform: scale(1.05) translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-achievement-pop {
  animation: achievementPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes achievementBounce {
  0%, 100% {
    transform: translateY(0) rotate(-3deg);
  }
  25% {
    transform: translateY(-6px) rotate(3deg);
  }
  50% {
    transform: translateY(-2px) rotate(-2deg);
  }
  75% {
    transform: translateY(-8px) rotate(4deg);
  }
}

.animate-achievement-bounce {
  animation: achievementBounce 1.5s ease-in-out infinite;
}

@keyframes progressShrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.animate-progress-shrink {
  animation: progressShrink 4.5s linear forwards;
}
</style>
