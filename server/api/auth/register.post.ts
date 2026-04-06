import bcrypt from 'bcrypt'
import { db, users, eq } from '~/drizzle/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // 验证必填字段
    if (!body.name || !body.username || !body.password || !body.grade || !body.class) {
      throw createError({
        statusCode: 400,
        message: '所有字段都是必填的'
      })
    }

    // 验证用户名格式（只允许字母、数字、下划线）
    if (!/^[a-zA-Z0-9_]+$/.test(body.username)) {
      throw createError({
        statusCode: 400,
        message: '用户名只能包含字母、数字和下划线'
      })
    }

    // 验证用户名长度
    if (body.username.length < 3 || body.username.length > 20) {
      throw createError({
        statusCode: 400,
        message: '用户名长度必须在3-20个字符之间'
      })
    }

    // 验证密码长度
    if (body.password.length < 6) {
      throw createError({
        statusCode: 400,
        message: '密码长度不能少于6个字符'
      })
    }

    // 验证年级
    const validGrades = ['初2028届', '初2027届', '初2026届', '高2028届', '高2027届']
    if (!validGrades.includes(body.grade)) {
      throw createError({
        statusCode: 400,
        message: '请选择有效的年级'
      })
    }

    // 验证班级范围
    const gradeClassLimits: Record<string, number> = {
      '初2028届': 20,
      '初2027届': 22,
      '初2026届': 22,
      '高2028届': 6,
      '高2027届': 5,
    }

    const maxClass = gradeClassLimits[body.grade]
    if (!maxClass || body.class < 1 || body.class > maxClass) {
      throw createError({
        statusCode: 400,
        message: `班级必须在1-${maxClass}之间`
      })
    }

    // 检查用户名是否已存在
    const existingUser = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, body.username))
      .limit(1)

    if (existingUser.length > 0) {
      throw createError({
        statusCode: 409,
        message: '用户名已存在'
      })
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(body.password, 12)

    // 创建用户
    await db.insert(users).values({
      name: body.name,
      username: body.username,
      password: hashedPassword,
      grade: body.grade,
      class: body.class.toString(),
      role: 'USER',
      status: 'active',
      forcePasswordChange: false,
    })

    return {
      success: true,
      message: '注册成功'
    }

  } catch (error: any) {
    console.error('Registration error:', error)

    // 如果是已知的错误，直接抛出
    if (error.statusCode) {
      throw error
    }

    // 其他错误
    throw createError({
      statusCode: 500,
      message: '注册失败，请稍后重试'
    })
  }
})