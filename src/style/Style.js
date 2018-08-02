import GeometryType from '../geometry/GeometryType.js'

const

  /**
   * @type {String}
   */
  defaultFillStyle = 'rgba(0, 0, 0, 1)',


  /**
   * @type {String}
   */
  defaultStrokeStyle = 'rgba(0, 0, 0, 1)',


  /**
   * @type {Number}
   */
  defaultLineWidth = 1,


  /**
   * @type {String}
   */
  defaultLineCap = 'round',


  /**
   * @type {String}
   */
  defaultLineJoin = 'round',


  /**
   * @type {Number}
   */
  defaultMiterLimit = 10


/**
 * 用于绘制完成后的样式
 *
 * @param  {module:geometry/GeometryType} type GeometryType
 * @return {Array.<Object>} styles
 */
export function createDefaultStyle(type) {
  const styles = {}

  styles[GeometryType.LINE] = [{
    stroke: {
      color: '#39c',
      width: 1.25
    }
  }]

  styles[GeometryType.POLYGON] = [{
    fill: {
      color: 'rgba(255, 255, 255, 0.2)'
    }
  }].concat(styles[GeometryType.LINE])

  styles[GeometryType.CIRCLE] = styles[GeometryType.POLYGON]

  styles[GeometryType.POINT] = styles[GeometryType.CIRCLE]

  return styles[type]
}


/**
 * 用于绘制状态中的样式
 *
 * @param {module:geometry/GeometryType} type GeometryType
 * @return {Array.<Object>} styles
 */
export function createEditingStyle(type) {
  const styles = {}

  styles[GeometryType.LINE] = [{
    stroke: {
      color: 'rgba(255, 255, 255, 1)',
      width: 5
    }
  }, {
    stroke: {
      color: 'rgba(0, 153, 255, 1)',
      width: 3
    }
  }]

  styles[GeometryType.POLYGON] = [{
    fill: {
      color: 'rgba(255, 255, 255, 0.5)',
    }
  }].concat(styles[GeometryType.LINE])

  styles[GeometryType.CIRCLE] = styles[GeometryType.POLYGON]

  styles[GeometryType.POINT] = [{
    fill: {
      color: 'rgba(0, 153, 255, 1)'
    },
    stroke: {
      color: 'rgba(255, 255, 255, 1)',
      width: 1.5
    }
  }]

  return styles[type]
}


/**
 * @param {CanvasRenderingContext2D} ctx Canvas context
 * @param {Array.<Object>} styles
 */
export function renderStyle(ctx, styles) {
  styles.forEach(function(style) {
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
