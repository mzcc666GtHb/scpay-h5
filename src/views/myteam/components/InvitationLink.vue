<template>
  <div class="invitation-link">
    <h3 class="section-title">
      Invitation link
    </h3>
    <div class="link-container">
      <div class="link-field">
        <span class="link-text">{{ invitationLink }}</span>
        <button class="copy-btn" @click="copyLink">
          <i class="i-material-symbols:content-copy text-gray-500" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from 'vant'

defineOptions({
  name: 'InvitationLink',
})

const invitationLink = ref('89667566gftrbybh342bghg')

async function copyLink() {
  try {
    await navigator.clipboard.writeText(invitationLink.value)
    showToast('链接已复制到剪贴板')
  }
  catch (err) {
    console.error('复制失败:', err)
    showToast('复制失败，请手动复制')
  }
}
</script>

<style lang="less" scoped>
.invitation-link {
  margin: 0 16px 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin: 0 0 16px 0;
}

.link-container {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.link-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 12px 16px;
  border: 1px solid #e9ecef;
}

.link-text {
  flex: 1;
  font-size: 14px;
  color: #333;
  font-family: monospace;
  word-break: break-all;
  margin-right: 12px;
}

.copy-btn {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e9ecef;
  }

  &:active {
    background-color: #dee2e6;
  }
}
</style>
