import type { CreatePoolPayload, DrawStrawsPayload } from '@/interfaces/api'

export function isUUIDWithType(value: string): boolean {
  const [uuid, type] = value.split('$')
  return uuid.length == 36 && +type >= 0 && +type <= 4
}

export function validateDrawStrawsForm(
  formData: Omit<DrawStrawsPayload, 'type'>
): DrawStrawsPayload | string {
  const [uuid, type] = formData.uuid.split('$')

  switch (true) {
    case !isUUIDWithType(formData.uuid):
      return '口令错误'
    case !formData.name || formData.name.length > 50:
      return '请输入合法昵称'
    case !formData.role && type == '3':
      return '请输入角色名'
  }

  return {
    uuid,
    type: +type,
    name: formData.name,
    role: formData.role
  }
}

export function validateCreatePoolForm(formData: {
  title: string
  total: number
  type: string[]
  switch: boolean
  setup: { tag: string; limit: number }[]
}): CreatePoolPayload | string {
  const type = +formData.type[0]

  switch (true) {
    case !formData.title:
      return '标题不能为空'
    case formData.title.length > 50:
      return '标题过长'
    case type == 0 &&
      !formData.switch &&
      formData.total > formData.setup.reduce((total, { limit }) => limit + total, 0):
      return '签数设置不能小于总签数'
    case (type != 2 || formData.switch) && type != 4 && formData.setup.some(({ tag }) => !tag):
      return '标签不能为空'
  }

  return {
    title: formData.title,
    total: formData.total,
    type: type + (type != 4 ? +formData.switch : 0),
    setup:
      type == 2 && !formData.switch
        ? [{ limit: formData.setup[0].limit, tag: 'null' }]
        : formData.setup.map(({ tag, limit }) => ({ tag, limit }))
  }
}
