import Geometry from '../geometry/Geometry.js'
import GeometryType from '../geometry/GeometryType.js'
import {createDefaultStyle, renderStyle} from '../style/Style.js'


class Point extends Geometry {
  constructor(coordinates) {
    super()

    this.radius = 6

    this.setCoordinates(coordinates)

    this.setStyle(createDefaultStyle(this.getType()))
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.beginPath()

    ctx.arc(this.coordinates[0][0], this.coordinates[0][1], this.radius, 0, 2 * Math.PI)

    renderStyle(ctx, this.style)

    ctx.closePath()
  }

  getType() {
    return GeometryType.POINT
  }

  setRadius(radius) {
    this.radius = radius
  }
}

export default Point
