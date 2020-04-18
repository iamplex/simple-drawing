import Geometry from './Geometry.js'
import GeometryType from './GeometryType.js'
import { createDefaultStyle, renderStyle } from '../style/Style.js'
import { Coordinate } from './Coordinate.js'

class Point extends Geometry {
  private radius: number = 6

  constructor(coordinates?: Array<Coordinate>) {
    super()

    this.radius = 6

    this.setCoordinates(coordinates)
    this.setStyle(createDefaultStyle(this.getType()))
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath()

    ctx.arc(
      this.coordinates[0][0],
      this.coordinates[0][1],
      this.radius,
      0,
      2 * Math.PI
    )

    renderStyle(ctx, this.style)

    ctx.closePath()
  }

  getType(): GeometryType {
    return GeometryType.POINT
  }

  setRadius(radius: number): void {
    this.radius = radius
  }
}

export default Point
