export function reportWebVitals(metric: any) {
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(metric)
  }

  // In production, you could send to an analytics service
  if (process.env.NODE_ENV === "production") {
    // Example: send to Google Analytics
    // window.gtag('event', name, {
    //   event_category: 'Web Vitals',
    //   event_label: id,
    //   value: Math.round(name === 'CLS' ? value * 1000 : value),
    //   non_interaction: true,
    // });
  }
}

export function measurePerformance(name: string, fn: () => void) {
  if (process.env.NODE_ENV !== "development") {
    fn()
    return
  }

  console.time(name)
  fn()
  console.timeEnd(name)
}

