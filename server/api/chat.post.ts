interface AIResponse {
  id: string
  created: number
  model: string
  object: string
  choices: Array<{
    finish_reason: string
    index: number
    message: {
      content: string
      role: string
    }
  }>
  usage: {
    completion_tokens: number
    prompt_tokens: number
    total_tokens: number
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  
  try {
    const res = await $fetch<AIResponse>(config.public.apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: body
    })
    
    // Retourne uniquement le message
    return {
      message: res.choices[0].message.content
    }
    
  } catch (e: any) {
    throw createError({
      statusCode: e?.response?.status || 500,
      statusMessage: e?.message || "Erreur lors de la requête à l'API",
    })
  }
})