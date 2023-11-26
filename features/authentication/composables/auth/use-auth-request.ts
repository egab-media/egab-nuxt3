export const useAuthRequest = (protectedRoute: string, method = 'GET' as any, body: any) => {
  const { data, error, pending } = useCsrfFetch(protectedRoute, {
    method: method,
    headers: useRequestHeaders(['cookie']),
    body: body
  })

  return {
    data,
    error,
    pending
  }
}
