import GeometryType from '../geometry/GeometryType.js'

interface Style {
  fill: string
  stroke: string
  lineWidth: number
  lineCap: string
  lineJoin: string
  miterLimit: number
}

const defaultFillStyle = 'rgba(0, 0, 0, 1)'
const defaultStrokeStyle = 'rgba(0, 0, 0, 1)'
const defaultLineWidth = 1
const defaultLineCap = 'round'
const defaultLineJoin = 'round'
const defaultMiterLimit = 10

/**
 * 用于绘制完成后的样式
 */
export function createDefaultStyle(type: GeometryType) {
  const styles = {}

  styles[GeometryType.LINE] = [
    {
      stroke: {
        color: '#39c',
        width: 1.25,
      },
    },
  ]

  styles[GeometryType.POLYGON] = [
    {
      fill: {
        color: 'rgba(255, 255, 255, 0.2)',
      },
    },
  ].concat(styles[GeometryType.LINE])

  styles[GeometryType.CIRCLE] = styles[GeometryType.POLYGON]

  styles[GeometryType.POINT] = styles[GeometryType.CIRCLE]

  return styles[type]
}

/**
 * 用于绘制状态中的样式
 */
export function createEditingStyle(type: GeometryType) {
  const styles = {}

  styles[GeometryType.LINE] = [
    {
      stroke: {
        color: 'rgba(255, 255, 255, 1)',
        width: 5,
      },
    },
    {
      stroke: {
        color: 'rgba(0, 153, 255, 1)',
        width: 3,
      },
    },
  ]

  styles[GeometryType.POLYGON] = [
    {
      fill: {
        color: 'rgba(255, 255, 255, 0.5)',
      },
    },
  ].concat(styles[GeometryType.LINE])

  styles[GeometryType.CIRCLE] = styles[GeometryType.POLYGON]

  styles[GeometryType.POINT] = [
    {
      fill: {
        color: 'rgba(0, 153, 255, 1)',
      },
      stroke: {
        color: 'rgba(255, 255, 255, 1)',
        width: 1.5,
      },
    },
  ]

  return styles[type]
}

export function renderStyle(ctx: CanvasRenderingContext2D, styles): void {
  styles.forEach(function (style) {
    if (style.fill) {
      ctx.fillStyle = style.fill.color || defaultFillStyle
      ctx.fill()
    }

    if (style.stroke) {
      ctx.strokeStyle = style.stroke.color || defaultStrokeStyle
      ctx.lineWidth = style.stroke.width || defaultLineWidth
      ctx.lineCap = style.stroke.lineCap || defaultLineCap
      ctx.lineJoin = style.stroke.lineJoin || defaultLineJoin
      ctx.miterLimit = style.stroke.miterLimit || defaultMiterLimit
      ctx.stroke()
    }
  })
}
