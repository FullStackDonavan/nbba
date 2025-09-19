// composables/useCompany.ts
import type { CompanyInfo } from '~/composables/useAuth'

export async function useCompany(userId: string): Promise<CompanyInfo | null> {
  try {
    const { data } = await useFetch<CompanyInfo>('/api/company/getByUser', {
      params: { userId },
    })
    return data.value || null
  } catch (error) {
    console.error("Error fetching company:", error)
    return null
  }
}
