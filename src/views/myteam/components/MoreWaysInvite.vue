<template>
  <div class="more-ways-invite">
    <h3 class="section-title">
      More ways invite
    </h3>
    <div class="invite-options">
      <div
        v-for="option in inviteOptions"
        :key="option.key"
        class="invite-option"
        @click="handleInvite(option.key)"
      >
        <div class="option-icon" :class="option.iconClass">
          <i :class="option.icon" />
        </div>
        <span class="option-label">{{ option.label }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from 'vant'

defineOptions({
  name: 'MoreWaysInvite',
})

interface InviteOption {
  key: string
  label: string
  icon: string
  iconClass: string
}

const inviteOptions = ref<InviteOption[]>([
  {
    key: 'telegram',
    label: 'Telegram',
    icon: 'i-material-symbols:send',
    iconClass: 'telegram',
  },
  {
    key: 'whatsapp',
    label: 'Whatsapp',
    icon: 'i-material-symbols:chat',
    iconClass: 'whatsapp',
  },
  {
    key: 'facebook',
    label: 'Facebook',
    icon: 'i-simple-icons:facebook',
    iconClass: 'facebook',
  },
])

function handleInvite(key: string) {
  const option = inviteOptions.value.find(item => item.key === key)
  if (option) {
    showToast(`分享到 ${option.label}`)
    // 这里可以添加具体的分享逻辑
    console.log(`Share to ${option.label}`)
  }
}
</script>

<style lang="less" scoped>
  .more-ways-invite {
  margin: 0 14px 20px;
}

.section-title {
  font-size: 17px;
  font-weight: 700;
  color: #333;
  margin: 0 0 14px 0;
}

.invite-options {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
  border-radius: 10px;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 128px;
}

.invite-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
}

.option-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;

  i {
    font-size: 24px;
    color: white;
  }

  &.telegram {
    background: #0088cc;
  }

  &.whatsapp {
    background: #25d366;
  }

  &.facebook {
    background: #1877f2;
  }
}

.option-label {
  font-size: 12px;
  font-weight: 500;
  color: #666;
  text-align: center;
}
</style>
