import GeometryType from './GeometryType'
import { Coordinate } from './Coordinate'

abstract class Geometry {
  protected coordinates: Array<Coordinate>
  protected style: Array<object>

  constructor() {
    this.coordinates = []
    this.style = []
  }

  protected abstract render(ctx: CanvasRenderingContext2D): void

  public abstract getType(): GeometryType

  public getCoordinates() {
    return this.coordinates.slice()
  }

  public setCoordinates(coordinates: Array<Coordinate>) {
    this.coordinates = coordinates
  }

  public setStyle(style) {
    this.style = style
  }
}

export default Geometry
