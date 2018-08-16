import Geometry from '../geometry/Geometry.js'
import GeometryType from '../geometry/GeometryType.js'
import {createDefaultStyle, renderStyle} from '../style/Style.js'


class Line extends Geometry {
  constructor(coordinates) {
    super()

    this.setCoordinates(coordinates)

    this.setStyle(createDefaultStyle(this.getType()))
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.beginPath()

    ctx.moveTo(this.coordinates[0][0], this.coordinates[0][1])

    for (let i = 1, len = this.coordinates.length; i < len; i++) {
      ctx.lineTo(this.coordinates[i][0], this.coordinates[i][1])
    }

    renderStyle(ctx, this.style)

    ctx.closePath()
  }

  getType() {
    return GeometryType.LINE
  }
}

export default Line
