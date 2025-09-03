export interface FormColumns {
  text: string
  value: number
}

// 新增：更精准的取值范围
export type GenderValue = 0 | 1
export type IndustryValue =
  | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17

// 新增：具体列项类型（结构上兼容 FormColumns）
export type GenderColumn = Omit<FormColumns, 'value'> & { value: GenderValue }
export type IndustryColumn = Omit<FormColumns, 'value'> & { value: IndustryValue }

export const genderColumns: GenderColumn[] = [
  { text: '男', value: 0 },
  { text: '女', value: 1 },
]

export const industryColumns: IndustryColumn[] = [
  { text: '不展示', value: 0 },
  { text: '学生', value: 1 },
  { text: '自由职业', value: 2 },
  { text: 'IT/互联网/通信', value: 3 },
  { text: '金融', value: 4 },
  { text: '健康/医疗', value: 5 },
  { text: '工业/制造业', value: 6 },
  { text: '零售', value: 7 },
  { text: '贸易', value: 8 },
  { text: '教育/科研', value: 9 },
  { text: '培训', value: 10 },
  { text: '房地产/建筑', value: 11 },
  { text: '文化/艺术', value: 12 },
  { text: '影视/娱乐', value: 13 },
  { text: '法律/会计/咨询', value: 14 },
  { text: '媒体/广告/公关', value: 15 },
  { text: '体育/健身', value: 16 },
  { text: '企事业单位', value: 17 },
]
