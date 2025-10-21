export async function useSendMessageToAi(body: any): Promise<string> {
  try {
    const res = await $fetch<{ message: string }>('/api/chat', {
      method: 'POST',
      body: body
    })
    
    return res.message
    
  } catch (e: any) {
    throw createError({
      statusCode: e?.response?.status || 500,
      statusMessage: e?.message || "Erreur lors de la requête à l'API",
      fatal: false,
    })
  }
}