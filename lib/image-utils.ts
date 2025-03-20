type ImageSizeOptions = {
  width?: number
  height?: number
  quality?: number
}

export function getOptimizedImageUrl(url: string, options: ImageSizeOptions = {}): string {
  // If it's already a placeholder, return as is
  if (url.includes("placeholder.svg")) {
    return url
  }

  // If it's a blob URL, return as is
  if (url.includes("blob.vercel-storage.com")) {
    return url
  }

  // For other URLs, you could add query parameters for optimization
  // This is just a placeholder implementation
  const { width, height, quality = 80 } = options
  let optimizedUrl = url

  if (width) {
    optimizedUrl += `${optimizedUrl.includes("?") ? "&" : "?"}w=${width}`
  }

  if (height) {
    optimizedUrl += `${optimizedUrl.includes("?") ? "&" : "?"}h=${height}`
  }

  if (quality) {
    optimizedUrl += `${optimizedUrl.includes("?") ? "&" : "?"}q=${quality}`
  }

  return optimizedUrl
}

export function getSrcSet(url: string, widths: number[] = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]): string {
  // If it's a placeholder or blob URL, return empty srcset
  if (url.includes("placeholder.svg") || url.includes("blob.vercel-storage.com")) {
    return ""
  }

  return widths.map((width) => `${getOptimizedImageUrl(url, { width })} ${width}w`).join(", ")
}

