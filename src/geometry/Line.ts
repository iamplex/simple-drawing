import Geometry from './Geometry.js'
import GeometryType from './GeometryType.js'
import { createDefaultStyle, renderStyle } from '../style/Style.js'
import { Coordinate } from './Coordinate.js'

class Line extends Geometry {
  constructor(coordinates?: Array<Coordinate>) {
    super()

    this.setCoordinates(coordinates)
    this.setStyle(createDefaultStyle(this.getType()))
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath()

    ctx.moveTo(this.coordinates[0][0], this.coordinates[0][1])

    for (let i = 1, len = this.coordinates.length; i < len; i++) {
      ctx.lineTo(this.coordinates[i][0], this.coordinates[i][1])
    }

    renderStyle(ctx, this.style)

    ctx.closePath()
  }

  getType(): GeometryType {
    return GeometryType.LINE
  }
}

export default Line
