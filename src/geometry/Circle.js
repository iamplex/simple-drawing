import Geometry from '../geometry/Geometry.js'
import GeometryType from '../geometry/GeometryType.js'
import {createDefaultStyle, renderStyle} from '../style/Style.js'


/**
 * 圆形构造函数
 * @param {Array.<Array.<Number>>} coordinates
 */
class Circle extends Geometry {
  constructor(coordinates) {
    super()

    /**
     * 半径
     * @type {Number}
     */
    this.radius = 0

    if (coordinates) {
      this.setCoordinates(coordinates)
    }

    this.setStyle(createDefaultStyle(this.getType()))
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    const
      center = this.getCenter(),
      radius = this.getRadius()

    ctx.beginPath()
    ctx.arc(center[0], center[1], radius, 0, 2 * Math.PI)

    renderStyle(ctx, this.style)

    ctx.closePath()
  }

  getType() {
    return GeometryType.CIRCLE
  }

  getCenter() {
    return this.getCoordinates()[0]
  }

  setCenter(coordinate) {
    this.coordinates[0] = coordinate
  }

  getRadius() {
    return this.radius
  }

  setRadius(radius) {
    this.radius = radius
  }
}

export default Circle
