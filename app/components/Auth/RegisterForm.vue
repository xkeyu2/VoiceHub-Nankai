<template>
  <div class="register-form">
    <div class="form-header">
      <h2>创建账号</h2>
      <p>欢迎加入广播站系统</p>
    </div>

    <form :class="['auth-form', { 'has-error': !!error }]" @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="name">姓名</label>
        <div class="input-wrapper">
          <svg
            class="input-icon"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <input
            id="name"
            v-model="name"
            :class="{ 'input-error': error }"
            placeholder="请输入您的姓名"
            required
            type="text"
            @input="error = ''"
          >
        </div>
      </div>

      <div class="form-group">
        <label for="username">用户名</label>
        <div class="input-wrapper">
          <svg
            class="input-icon"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <input
            id="username"
            v-model="username"
            :class="{ 'input-error': error }"
            placeholder="请输入用户名"
            required
            type="text"
            @input="error = ''"
          >
        </div>
      </div>

      <div class="form-group">
        <label for="password">密码</label>
        <div class="input-wrapper">
          <svg
            class="input-icon"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
            <circle cx="12" cy="16" r="1" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <input
            id="password"
            v-model="password"
            :class="{ 'input-error': error }"
            :type="showPassword ? 'text' : 'password'"
            placeholder="请输入密码"
            required
            @input="error = ''"
          >
          <button class="password-toggle" type="button" @click="showPassword = !showPassword">
            <svg
              v-if="showPassword"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
              />
              <line x1="1" x2="23" y1="1" y2="23" />
            </svg>
            <svg v-else fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="grade">年级</label>
          <div class="select-wrapper">
            <select
              id="grade"
              v-model="grade"
              :class="{ 'input-error': error }"
              required
              @change="handleGradeChange"
            >
              <option value="">请选择年级</option>
              <option value="初2028届">初2028届</option>
              <option value="初2027届">初2027届</option>
              <option value="初2026届">初2026届</option>
              <option value="高2028届">高2028届</option>
              <option value="高2027届">高2027届</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="class">班级</label>
          <div class="select-wrapper">
            <select
              id="class"
              v-model="userClass"
              :class="{ 'input-error': error }"
              required
              :disabled="!grade"
            >
              <option value="">请选择班级</option>
              <option
                v-for="classNum in classOptions"
                :key="classNum"
                :value="classNum"
              >
                {{ classNum }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="error" class="error-container">
        <svg
          class="error-icon"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
        <span class="error-message">{{ error }}</span>
      </div>

      <button :disabled="loading" class="submit-btn" type="submit">
        <svg v-if="loading" class="loading-spinner" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            fill="none"
            r="10"
            stroke="currentColor"
            stroke-dasharray="31.416"
            stroke-dashoffset="31.416"
            stroke-linecap="round"
            stroke-width="2"
          >
            <animate
              attributeName="stroke-dasharray"
              dur="2s"
              repeatCount="indefinite"
              values="0 31.416;15.708 15.708;0 31.416"
            />
            <animate
              attributeName="stroke-dashoffset"
              dur="2s"
              repeatCount="indefinite"
              values="0;-15.708;-31.416"
            />
          </circle>
        </svg>
        <span v-if="loading">注册中...</span>
        <span v-else>注册</span>
      </button>
    </form>

    <div class="form-footer">
      <p class="help-text">
        已有账号？
        <NuxtLink to="/login" class="login-link">立即登录</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const name = ref('')
const username = ref('')
const password = ref('')
const grade = ref('')
const userClass = ref('')
const error = ref('')
const loading = ref(false)
const showPassword = ref(false)

const classOptions = computed(() => {
  if (!grade.value) return []

  const gradeClassMap: Record<string, number[]> = {
    '初2028届': Array.from({ length: 23 }, (_, i) => i + 1),
    '初2027届': Array.from({ length: 21 }, (_, i) => i + 1),
    '初2026届': Array.from({ length: 19 }, (_, i) => i + 1),
    '高2028届': Array.from({ length: 6 }, (_, i) => i + 1),
    '高2027届': Array.from({ length: 5 }, (_, i) => i + 1),
  }

  return gradeClassMap[grade.value] || []
})

const handleGradeChange = () => {
  userClass.value = ''
  error.value = ''
}

const handleRegister = async () => {
  if (!name.value || !username.value || !password.value || !grade.value || !userClass.value) {
    error.value = '请填写完整的注册信息'
    return
  }

  error.value = ''
  loading.value = true

  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        name: name.value,
        username: username.value,
        password: password.value,
        grade: grade.value,
        class: userClass.value
      }
    })

    // 注册成功，跳转到登录页
    await navigateTo('/login?message=RegistrationSuccess')
  } catch (err: any) {
    error.value = err.data?.message || err.message || '注册失败，请重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-form {
  width: 100%;
  max-width: 400px;
  animation: fadeInUp 0.4s ease both;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-header {
  text-align: center;
  margin-bottom: 32px;
}

.form-header h2 {
  font-size: 28px;
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.form-header p {
  font-size: 16px;
  color: var(--text-tertiary);
  margin: 0;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-row .form-group {
  flex: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: var(--font-medium);
  color: var(--text-secondary);
}

.input-wrapper, .select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper::after, .select-wrapper::after {
  content: '';
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 8px;
  height: 2px;
  background: var(--primary);
  border-radius: 2px;
  opacity: 0;
  transform: scaleX(0.2);
  transition:
    transform var(--transition-normal),
    opacity var(--transition-normal);
}

.input-wrapper:focus-within::after, .select-wrapper:focus-within::after {
  opacity: 0.35;
  transform: scaleX(1);
}

.input-icon {
  position: absolute;
  left: 16px;
  width: 20px;
  height: 20px;
  color: var(--text-quaternary);
  z-index: 1;
}

.input-wrapper input, .select-wrapper select {
  width: 100%;
  padding: 16px 16px 16px 48px;
  background: var(--input-bg);
  border: 1px solid var(--input-border);
  border-radius: var(--radius-lg);
  color: var(--input-text);
  font-size: 16px;
  transition:
    border-color var(--transition-normal),
    box-shadow var(--transition-normal);
}

.select-wrapper select {
  padding: 16px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
}

.input-wrapper input::placeholder {
  color: var(--input-placeholder);
}

.input-wrapper input:focus, .select-wrapper select:focus {
  outline: none;
  border-color: var(--input-border-focus);
  box-shadow: var(--input-shadow-focus);
}

.input-wrapper input:focus + .input-icon,
.input-wrapper input:not(:placeholder-shown) + .input-icon {
  color: var(--primary);
}

.input-wrapper input:hover, .select-wrapper select:hover {
  filter: brightness(1.03);
}

.input-wrapper input.input-error, .select-wrapper select.input-error {
  border-color: var(--error);
  box-shadow: 0 0 0 3px var(--error-light);
}

.password-toggle {
  position: absolute;
  right: 16px;
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  color: var(--text-quaternary);
  cursor: pointer;
  transition:
    color 0.2s ease,
    transform var(--transition-fast);
  z-index: 1;
}

.password-toggle:hover {
  color: var(--text-primary);
}

.password-toggle:active {
  transform: scale(0.95);
}

.password-toggle svg {
  width: 100%;
  height: 100%;
}

.error-container {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--error-light);
  border: 1px solid var(--error-border);
  border-radius: var(--radius-lg);
  color: var(--error);
}

.auth-form.has-error {
  animation: shake 0.4s ease;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  15% {
    transform: translateX(-6px);
  }
  30% {
    transform: translateX(6px);
  }
  45% {
    transform: translateX(-4px);
  }
  60% {
    transform: translateX(4px);
  }
  75% {
    transform: translateX(-2px);
  }
  90% {
    transform: translateX(2px);
  }
  100% {
    transform: translateX(0);
  }
}

.error-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.error-message {
  font-size: 14px;
  font-weight: var(--font-medium);
}

.submit-btn {
  width: 100%;
  padding: 16px;
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  border: 1px solid var(--btn-primary-border);
  border-radius: var(--radius-lg);
  font-size: 16px;
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition:
    background var(--transition-normal),
    box-shadow var(--transition-normal),
    transform var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
}

.submit-btn::before {
  content: none;
}

.submit-btn:hover:not(:disabled) {
  background: var(--btn-primary-hover);
  box-shadow: var(--shadow-lg);
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.loading-spinner {
  width: 20px;
  height: 20px;
}

.form-footer {
  margin-top: 24px;
  text-align: center;
}

.help-text {
  font-size: 12px;
  color: var(--text-quaternary);
  margin: 0;
  line-height: 1.5;
}

.login-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: var(--font-medium);
  transition: color var(--transition-fast);
}

.login-link:hover {
  color: var(--primary-hover);
  text-decoration: underline;
}
</style>