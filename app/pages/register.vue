<template>
  <div class="auth-layout">
    <div class="auth-container">
      <div class="form-section">
        <div class="logo-row">
          <img
            v-if="schoolLogoHomeUrl && schoolLogoHomeUrl.trim()"
            :src="schoolLogoHomeUrl"
            alt="学校Logo"
            class="school-logo"
          >
        </div>
        <ClientOnly>
          <RegisterForm />
        </ClientOnly>
      </div>
    </div>
    <!-- 页脚信息显示 -->
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import RegisterForm from '~/components/Auth/RegisterForm.vue'
import { useSiteConfig } from '~/composables/useSiteConfig'

// 使用站点配置
const { siteTitle, initSiteConfig, logoUrl, schoolLogoHomeUrl, icp: icpNumber } = useSiteConfig()

// 主品牌Logo优先使用SVG，其次使用站点配置中非ICO的地址
const brandLogoSrc = computed(() => {
  const url = logoUrl.value
  if (url && !url.endsWith('.ico')) return url
  return '/images/logo.svg'
})

// 在组件挂载后初始化站点配置
onMounted(async () => {
  await initSiteConfig()

  if (typeof document !== 'undefined' && siteTitle.value) {
    document.title = `注册 | ${siteTitle.value}`
  }
})
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  position: relative;
  overflow-x: hidden;
}

.auth-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  position: relative;
  z-index: 1;
}

.form-section {
  width: 100%;
  max-width: 480px;
  background: var(--bg-secondary);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--border-primary);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.logo-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(12px, 2vw, 24px);
  margin-bottom: 16px;
}

.school-logo {
  width: clamp(96px, 16vw, 160px);
  height: clamp(96px, 16vw, 160px);
  object-fit: contain;
  transition: transform var(--transition-slow), filter var(--transition-slow);
}

.school-logo:hover {
  transform: translateY(-3px) scale(1.02);
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15));
}

@media (max-width: 640px) {
  .auth-container {
    padding: 1rem;
  }

  .form-section {
    padding: 30px 24px;
    border-radius: 20px;
  }
}
</style>