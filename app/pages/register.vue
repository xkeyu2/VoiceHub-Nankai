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
import { computed, ref } from 'vue'
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
  // 初始化站点配置
  await initSiteConfig()

  // 设置页面标题
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow-x: hidden;
}

.auth-layout::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="10" cy="50" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="90" cy="30" r="0.5" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
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
  max-width: 420px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.logo-row {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.school-logo {
  max-width: 120px;
  max-height: 60px;
  width: auto;
  height: auto;
  object-fit: contain;
}

@media (max-width: 640px) {
  .auth-container {
    padding: 1rem;
  }

  .form-section {
    padding: 2rem 1.5rem;
    border-radius: 20px;
  }
}
</style>

<style scoped>
.auth-layout {
  min-height: 100vh;
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  /* 响应式尺寸变量 */
  --brand-logo-size: clamp(48px, 8vw, 96px);
  --school-logo-size: clamp(96px, 16vw, 160px);
  --logo-gap: clamp(12px, 2vw, 24px);
  --divider-height: clamp(32px, 10vw, 96px);
  --content-footer-gap: clamp(16px, 4vh, 40px);
}

.auth-container {
  width: 100%;
  max-width: 480px;
  background: var(--bg-secondary);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--border-primary);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  margin: auto 0; /* 在纵向布局中居中 */
  margin-bottom: var(--content-footer-gap); /* 与底部footer保持最小距离 */
}

.form-section {
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
  gap: var(--logo-gap);
  margin-bottom: 16px;
}

.school-logo {
  width: var(--school-logo-size);
  height: var(--school-logo-size);
  object-fit: contain;
  transition:
    transform var(--transition-slow),
    filter var(--transition-slow);
}

.school-logo:hover {
  transform: translateY(-3px) scale(1.02);
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.25));
}
</style>