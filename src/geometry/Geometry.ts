import GeometryType from './GeometryType'
import { Coordinate } from './Coordinate'

abstract class Geometry {
  protected coordinates: Array<Coordinate>
  protected style: Array<Object>

  constructor() {
    this.coordinates = []
    this.style = []
  }

  protected abstract render(ctx: CanvasRenderingContext2D): void

  public abstract getType(): GeometryType

  public getCoordinates(): Array<Coordinate> {
    return this.coordinates && this.coordinates.slice()
  }

  public setCoordinates(coordinates: Array<Coordinate>) {
    this.coordinates = coordinates
  }

  public setStyle(style: Array<Object>) {
    this.style = style
  }
}

export default Geometry
