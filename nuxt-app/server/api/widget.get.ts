export default defineEventHandler(async (event) => {
  try {
    // Get widget parameters from query
    const query = getQuery(event)
    const widgetId = query.id as string
    const sidebarId = query.sidebar as string || 'nouveau-template-01'

    if (!widgetId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Widget ID is required'
      })
    }

    // Fetch widget data from WordPress API
    const response = await fetch(
      `https://api.logic-design-solutions.com/wp-json/custom/v1/widgets`
    )

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `Failed to fetch widgets: ${response.statusText}`
      })
    }

    let widgetsData
    try {
      widgetsData = await response.json()
    } catch (parseError) {
      console.error('Failed to parse widgets JSON:', parseError)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to parse widgets data from API'
      })
    }

    if (!widgetsData || typeof widgetsData !== 'object') {
      throw createError({
        statusCode: 500,
        statusMessage: 'Invalid widgets data format'
      })
    }
    const sidebarWidgets = widgetsData[sidebarId] || []
    const widget = sidebarWidgets.find((w: any) => w.id === widgetId)

    if (!widget) {
      throw createError({
        statusCode: 404,
        statusMessage: `Widget ${widgetId} not found in sidebar ${sidebarId}`
      })
    }

    // If the widget has a content property, return it; otherwise fetch from widget-content endpoint
    if (widget.content) {
      return widget
    }

    // Try to fetch widget content from a specific endpoint
    const contentResponse = await fetch(
      `https://api.logic-design-solutions.com/wp-json/custom/v1/widget-content/${widgetId}`
    )

    if (contentResponse.ok) {
      const contentData = await contentResponse.json()
      return { ...widget, ...contentData }
    }

    return widget
  } catch (error) {
    const err = error as Error
    console.error('Widget API error:', err)

    if ((error as any).statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: err.message || 'Failed to fetch widget'
    })
  }
})
