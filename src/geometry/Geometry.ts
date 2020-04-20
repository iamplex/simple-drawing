import GeometryType from './GeometryType'
import { Coordinate } from './Coordinate'

abstract class Geometry {
  protected coordinates: Array<Coordinate>
  protected style: Record<string, object>

  constructor() {
    this.coordinates = []
    this.style = {}
  }

  protected abstract render(ctx: CanvasRenderingContext2D): void

  public abstract getType(): GeometryType

  public getCoordinates(): Array<Coordinate> {
    return this.coordinates && this.coordinates.slice()
  }

  public setCoordinates(coordinates: Array<Coordinate>): void {
    this.coordinates = coordinates
  }

  public setStyle(style: Record<string, object>): void {
    this.style = style
  }
}

export default Geometry
