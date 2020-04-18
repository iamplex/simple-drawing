import Geometry from './Geometry.js'
import GeometryType from './GeometryType.js'
import { createDefaultStyle, renderStyle } from '../style/Style.js'
import { Coordinate } from './Coordinate.js'

class Circle extends Geometry {
  private radius: number

  constructor(coordinates?: Array<Coordinate>) {
    super()

    this.radius = 0

    coordinates && this.setCoordinates(coordinates)
    this.setStyle(createDefaultStyle(this.getType()))
  }

  render(ctx: CanvasRenderingContext2D): void {
    const center = this.getCenter()
    const radius = this.getRadius()

    ctx.beginPath()
    ctx.arc(center[0], center[1], radius, 0, 2 * Math.PI)

    renderStyle(ctx, this.style)

    ctx.closePath()
  }

  getType(): GeometryType {
    return GeometryType.CIRCLE
  }

  getCenter(): Coordinate {
    return this.getCoordinates()[0]
  }

  setCenter(coordinate: Coordinate): void {
    this.coordinates[0] = coordinate
  }

  getRadius(): number {
    return this.radius
  }

  setRadius(radius: number): void {
    this.radius = radius
  }
}

export default Circle
