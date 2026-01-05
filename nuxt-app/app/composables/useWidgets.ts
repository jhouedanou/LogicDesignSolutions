import { ref } from 'vue'

interface Widget {
  id: string
  name: string
  description: string
  content?: string
  [key: string]: any
}

interface WidgetData {
  id: string
  name: string
  description: string
  content?: string
  [key: string]: any
}

export const useWidgets = () => {
  const widgets = ref<Record<string, Widget[]>>({})
  const widgetContent = ref<Record<string, string>>({})
  const loading = ref(true)
  const error = ref<string | null>(null)

  const fetchWidgets = async () => {
    try {
      loading.value = true
      error.value = null

      // Fetch widgets from WordPress API
      const widgetsResponse = await fetch(
        'https://api.logic-design-solutions.com/wp-json/custom/v1/widgets'
      )

      if (!widgetsResponse.ok) {
        throw new Error(`Failed to fetch widgets: ${widgetsResponse.status}`)
      }

      const widgetsData = await widgetsResponse.json()
      widgets.value = widgetsData
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      console.error('Error fetching widgets:', error.value)
    } finally {
      loading.value = false
    }
  }

  // Fetch a specific widget's content
  const fetchWidgetContent = async (widgetId: string, sidebarId: string = 'nouveau-template-01'): Promise<string | any> => {
    try {
      // Check cache first
      const cacheKey = `${sidebarId}:${widgetId}`
      if (widgetContent.value[cacheKey]) {
        return widgetContent.value[cacheKey]
      }

      // Add timeout to prevent hanging requests
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 second timeout

      const response = await fetch(`/api/widget?id=${widgetId}&sidebar=${sidebarId}`, {
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`Failed to fetch widget content: ${response.status}`)
      }

      const data = await response.json()

      // For image widgets (media_image), return the full content object with URL
      if (data.name === 'Image' || widgetId.startsWith('media_image')) {
        widgetContent.value[cacheKey] = data.content
        return data.content // Return the full content object with url, width, height, etc.
      }

      // For text widgets with title, return the full content object
      if (data.name === 'Text' && data.content && typeof data.content === 'object' && data.content.title) {
        widgetContent.value[cacheKey] = data.content
        return data.content // Return the full content object with title, text, etc.
      }

      // Extract the content HTML from the widget structure
      let content = ''

      // If widget.content is an object, try different property names
      if (data.content && typeof data.content === 'object') {
        // Try 'content' property first (Custom HTML widgets)
        if (data.content.content) {
          content = data.content.content
        }
        // Try 'text' property (Text widgets)
        else if (data.content.text) {
          content = data.content.text
        }
      } else if (typeof data.content === 'string') {
        // If content is already a string, use it directly
        content = data.content
      } else if (data.rendered) {
        content = data.rendered
      }

      widgetContent.value[cacheKey] = content
      return content
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      console.error(`Error fetching widget ${widgetId}:`, message)
      
      // Cache empty result to prevent repeated failed requests
      const cacheKey = `${sidebarId}:${widgetId}`
      widgetContent.value[cacheKey] = ''
      
      return ''
    }
  }

  // Batch fetch multiple widgets from the same sidebar (optimized)
  const fetchMultipleWidgets = async (widgetIds: string[], sidebarId: string = 'nouveau-template-01'): Promise<Record<string, any>> => {
    try {
      // Fetch all widgets in parallel
      const results = await Promise.all(
        widgetIds.map(id => fetchWidgetContent(id, sidebarId))
      )

      // Create a map of widgetId => content
      const widgetMap: Record<string, any> = {}
      widgetIds.forEach((id, index) => {
        widgetMap[id] = results[index]
      })

      return widgetMap
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      console.error('Error fetching multiple widgets:', message)
      return {}
    }
  }

  // Get a specific widget by ID from a specific sidebar
  const getWidget = (sidebarId: string, widgetId: string): Widget | null => {
    const sidebar = widgets.value[sidebarId]
    if (!sidebar) return null
    return sidebar.find(w => w.id === widgetId) || null
  }

  // Get all widgets from a specific sidebar
  const getSidebarWidgets = (sidebarId: string): Widget[] => {
    return widgets.value[sidebarId] || []
  }

  // Get cached widget content
  const getWidgetContent = (widgetId: string): string => {
    return widgetContent.value[widgetId] || ''
  }

  return {
    widgets,
    widgetContent,
    loading,
    error,
    fetchWidgets,
    fetchWidgetContent,
    fetchMultipleWidgets,
    getWidget,
    getSidebarWidgets,
    getWidgetContent
  }
}
