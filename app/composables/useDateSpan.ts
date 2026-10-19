/**
 * useDateSpan composable
 *
 * Provides a reusable function to format a date span the way LinkedIn does:
 * "Jan 2020 – Present · 5 yrs 8 mos"
 *
 * Months are counted inclusively (Jan 2020 → Dec 2020 = "1 yr"),
 * matching LinkedIn's behavior. Granularity is months only.
 */
export function useDateSpan() {
  /**
   * Formats the span between two dates as a LinkedIn-style line.
   * @param startDate - start date in "yyyy-mm-dd" format
   * @param endDate - end date in "yyyy-mm-dd" format or "today"
   * @returns a string like "Jan 2020 – Aug 2025 · 5 yrs 8 mos"
   */
  function calculateDateSpan(startDate: string, endDate: string): string {
    const parseDate = (date: string): [number, number] => {
      const [year, month] = date.split('-').map(Number)
      if (!year || !month || month < 1 || month > 12) {
        throw new Error("Invalid date format. Please use 'yyyy-mm-dd'.")
      }
      return [year, month]
    }

    const [sy, sm] = parseDate(startDate)
    const [ey, em]: [number, number] = endDate === 'today'
      ? [new Date().getFullYear(), new Date().getMonth() + 1]
      : parseDate(endDate)

    if (ey < sy || (ey === sy && em < sm)) {
      throw new Error('End date must be after start date.')
    }

    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const fmt = (year: number, month: number) => `${MONTHS[month - 1]} ${year}`
    const range = `${fmt(sy, sm)} – ${endDate === 'today' ? 'Present' : fmt(ey, em)}`

    const total = (ey - sy) * 12 + (em - sm) + 1
    const years = Math.floor(total / 12)
    const months = total % 12

    const parts = []
    if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`)
    if (months) parts.push(`${months} mo${months > 1 ? 's' : ''}`)

    return `${range} · ${parts.join(' ')}`
  }

  return { calculateDateSpan }
}
