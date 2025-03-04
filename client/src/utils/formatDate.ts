export function formatDate(dateString: string): string {
    const date = new Date(dateString)
  
    // Format: "22nd January 2024"
    const day = date.getDate()
    const month = date.toLocaleString("default", { month: "long" })
    const year = date.getFullYear()
  
    // Add ordinal suffix to day
    const suffix = getOrdinalSuffix(day)
  
    return `${day}${suffix} ${month} ${year}`
  }
  
  function getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return "th"
  
    switch (day % 10) {
      case 1:
        return "st"
      case 2:
        return "nd"
      case 3:
        return "rd"
      default:
        return "th"
    }
  }
  
  