// My 模块类型定义（DTO、表单/参数类型）

import type { GenderValue, IndustryValue } from './pickColumns'

// 后端返回的我的资料（根据实际后端返回结构随时调整/扩展）
export interface MyProfileDTO {
  id?: string
  username?: string
  phone?: string
  nickname?: string
  sign?: string
  avatar?: string
  cover?: string
  gender?: GenderValue
  industry?: IndustryValue
}

// 表单/接口参数
export interface UpdateNicknameParams {
  nickname: string
}

export interface UpdateSignParams {
  sign: string
}

export type UpdateProfileParams = Partial<
  Pick<MyProfileDTO, 'nickname' | 'sign' | 'gender' | 'industry' | 'avatar' | 'cover'>
>

// 变更密码在系统 API 已有，这里仅给出本地表单的类型（如果需要）
export interface ChangePasswordParams {
  oldPassword: string
  newPassword: string
  confirmNewPassword?: string
}
