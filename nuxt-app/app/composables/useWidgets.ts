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
        'https://logic-design-solutions.com/wp-json/custom/v1/widgets'
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
  const fetchWidgetContent = async (widgetId: string, sidebarId: string = 'nouveau-template-01'): Promise<string> => {
    try {
      const response = await fetch(`/api/widget?id=${widgetId}&sidebar=${sidebarId}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch widget content: ${response.status}`)
      }

      const data = await response.json()

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

      console.log(`Loaded widget ${widgetId}:`, content)

      widgetContent.value[widgetId] = content
      return widgetContent.value[widgetId]
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      console.error(`Error fetching widget ${widgetId}:`, message)
      return ''
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
    getWidget,
    getSidebarWidgets,
    getWidgetContent
  }
}
