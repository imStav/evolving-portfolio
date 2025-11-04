/**
 * useDateSpan composable
 *
 * Provides a reusable function to calculate human-readable
 * time spans between two dates (in "yyyy-mm-dd" format).
 *
 * Example result: "2 years, 5 months, 2 days"
 */
export function useDateSpan() {
  /**
   * Calculates the span between two dates.
   * @param startDate - start date in "yyyy-mm-dd" format
   * @param endDate - end date in "yyyy-mm-dd" format
   * @returns a human-readable string like "3 years, 5 months, 14 days"
   */
  function calculateDateSpan(startDate: string, endDate: string): string {
    // Convert the date strings to Date objects
    const start = new Date(startDate)
    let end: Date

    if (endDate === 'today') {
      end = new Date()
    } else {
      end = new Date(endDate)
    }

    // Check if the provided dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid date format. Please use 'yyyy-mm-dd'.")
    }

    if (end < start) {
      throw new Error('End date must be after start date.')
    }

    // Extract components
    const startYear = start.getFullYear()
    const startMonth = start.getMonth()
    const startDay = start.getDate()

    const endYear = end.getFullYear()
    const endMonth = end.getMonth()
    const endDay = end.getDate()

    // Calculate differences
    let years = endYear - startYear
    let months = endMonth - startMonth
    let days = endDay - startDay

    // Adjust days if needed
    if (days < 0) {
      months -= 1
      // Get number of days in the previous month of `end`
      const prevMonth = new Date(endYear, endMonth, 0)
      days += prevMonth.getDate()
    }

    // Adjust months if needed
    if (months < 0) {
      years -= 1
      months += 12
    }

    // Build human-readable string
    const parts: string[] = []
    if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`)
    if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`)
    if (days > 0 || parts.length === 0) parts.push(`${days} day${days > 1 ? 's' : ''}`)

    return parts.join(', ')
  }

  return { calculateDateSpan }
}
