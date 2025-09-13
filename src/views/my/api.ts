import type { MyProfileDTO, UpdateNicknameParams, UpdateProfileParams, UpdateSignParams } from './types'
import { http } from '@/utils/http/axios'
import { ContentTypeEnum } from '@/enums/httpEnum'

export { getUserInfo as getMyProfile, changePassword } from '@/api/system/user'

// 更新昵称（示例 URL，请按后端实际替换）
export function updateMyNickname(params: UpdateNicknameParams) {
  return http.request<MyProfileDTO>({
    url: '/user/profile/nickname',
    method: 'POST',
    params,
  })
}

// 更新签名（示例 URL，请按后端实际替换）
export function updateMySign(params: UpdateSignParams) {
  return http.request<MyProfileDTO>({
    url: '/user/profile/sign',
    method: 'POST',
    params,
  })
}

// 更新资料（昵称/签名/性别/行业/头像/封面等，按需传参）
// 示例 URL 与字段名请按后端实际替换
export function updateMyProfile(params: UpdateProfileParams) {
  return http.request<MyProfileDTO>({
    url: '/user/profile',
    method: 'POST',
    params,
  })
}

// 上传头像（返回更新后的资料或头像地址，视后端而定，这里以资料 DTO 为例）
// 如果后端只返回 url，可把返回类型改为 { url: string } 或 string
export function uploadMyAvatar(file: File) {
  const form = new FormData()
  form.append('file', file)
  return http.request<MyProfileDTO>({
    url: '/user/profile/avatar',
    method: 'POST',
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA,
    },
    data: form,
  })
}

// 上传封面
export function uploadMyCover(file: File) {
  const form = new FormData()
  form.append('file', file)
  return http.request<MyProfileDTO>({
    url: '/user/profile/cover',
    method: 'POST',
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA,
    },
    data: form,
  })
}
