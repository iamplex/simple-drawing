import { createDefaultStyle, createEditingStyle } from '../style/Style.js'
import Geometry from '../geometry/Geometry.js'
import GeometryType from '../geometry/GeometryType.js'
import Point from '../geometry/Point.js'
import Circle from '../geometry/Circle.js'
import Line from '../geometry/Line.js'
import Polygon from '../geometry/Polygon.js'
import { Coordinate } from '../geometry/Coordinate.js'

interface CustomGeometryCoordinates {
  (start: Coordinate, end: Coordinate): Array<Coordinate>
}

class Draw {
  /**
   * 当前绘制的图形类型
   */
  type: GeometryType

  /**
   * 是否手绘模式
   */
  isFreehand: boolean

  /**
   * 是否正在绘制
   */
  isDrawing: boolean

  /**
   * 图形的坐标集合
   */
  private sketchCoords: Array<Coordinate>

  /**
   * 当前正在绘制的图形实例
   */
  private sketchFeature: any

  /**
   * 所有图形的集合
   */
  private features: Array<Geometry>

  private context: CanvasRenderingContext2D

  /**
   * 构造函数, 根据绘图类型获取相应的图形构造函数, 如果绘图类型为 'Custom', 使用Polygon构造函数
   */
  private geometryConstructor:
    | typeof Point
    | typeof Circle
    | typeof Line
    | typeof Polygon

  /**
   * 自定义图形函数
   */
  private createGeometryCoordinates: CustomGeometryCoordinates

  constructor(options) {
    this.type = typeof options === 'string' ? options : options.type
    this.isFreehand = options.freehand !== undefined ? options.freehand : false
    this.isDrawing = false
    this.sketchCoords = []
    this.sketchFeature
    this.context
    this.features = []

    this.type === GeometryType.POINT && (this.geometryConstructor = Point)
    this.type === GeometryType.CIRCLE && (this.geometryConstructor = Circle)
    this.type === GeometryType.LINE && (this.geometryConstructor = Line)
    this.type === GeometryType.POLYGON && (this.geometryConstructor = Polygon)
    this.type === GeometryType.CUSTOM && (this.geometryConstructor = Polygon)

    this.createGeometryCoordinates = options.createGeometryCoordinates
  }

  setContext(context: CanvasRenderingContext2D): void {
    this.context = context
  }

  setFeatures(features: Array<Geometry>): void {
    this.features = features
  }

  /**
   * 开始绘制图形
   */
  startDrawing(coordinate: Coordinate): void {
    this.isDrawing = true

    this.sketchCoords = [coordinate]

    this.sketchFeature = new this.geometryConstructor()
    this.sketchFeature.setStyle(
      createEditingStyle(this.sketchFeature.getType())
    )
    this.sketchFeature.setCoordinates(this.sketchCoords)
  }

  /**
   * 更新图形的最后一个坐标
   */
  modifyDrawing(coordinate: Coordinate): void {
    const drawType = this.type,
      geomType = this.sketchFeature.getType()

    this.sketchCoords[this.sketchCoords.length - 1] = coordinate

    if (geomType === GeometryType.CIRCLE) {
      const center = this.sketchFeature.getCenter()
      const dx = center[0] - coordinate[0]
      const dy = center[1] - coordinate[1]

      this.sketchFeature.setRadius(Math.sqrt(dx * dx + dy * dy))
    }

    if (geomType === GeometryType.POLYGON) {
      if (drawType === GeometryType.POLYGON) {
        this.sketchFeature.setCoordinates(this.sketchCoords)
      } else {
        const coordinates = this.createGeometryCoordinates(
          this.sketchCoords[0],
          this.sketchCoords[1]
        )
        this.sketchFeature.setCoordinates(coordinates)
      }
    }

    this.sketchFeature.render(this.context)
  }

  /**
   * 添加新坐标到草图元素
   */
  addCoordinateDrawing(coordinate: Coordinate): void {
    this.sketchCoords.push(coordinate)
    this.sketchFeature.setCoordinates(this.sketchCoords)

    if (this.isFreehand) {
      this.sketchFeature.render(this.context)
    }
  }

  /**
   * 图形绘制完成
   */
  finishDrawing(): void {
    this.isDrawing = false

    const drawType = this.type
    const geomType = this.sketchFeature.getType()

    if (drawType === GeometryType.POINT) {
      this.sketchFeature.setRadius(5)
    } else if (drawType === GeometryType.POLYGON) {
      this.sketchCoords.push(this.sketchCoords[0])
      this.sketchFeature.setCoordinates(this.sketchCoords)
    }

    this.sketchFeature.setStyle(createDefaultStyle(geomType))
    this.features.push(this.sketchFeature)
    this.sketchFeature = null
  }
}

export default Draw

/**
 * 创建一个函数, 它将返回一个正四边形的坐标(与坐标轴平行), 需要将Draw类的type设置为'Polygon'
 */
export function createBox(): CustomGeometryCoordinates {
  return function (start: Coordinate, end: Coordinate): Array<Coordinate> {
    const coordinates: Array<Coordinate> = [
      [start[0], start[1]],
      [end[0], start[1]],
      [end[0], end[1]],
      [start[0], end[1]],
      [start[0], start[1]],
    ]

    return coordinates
  }
}

/**
 * 创建一个函数, 它将返回一个正多边形的坐标, 需要将Draw类的type设置为'Polygon'
 */
export function createRegularPolygon(sides: number): CustomGeometryCoordinates {
  return function (start: Coordinate, end: Coordinate): Array<Coordinate> {
    const coordinates: Array<Coordinate> = []
    const dx = end[0] - start[0]
    const dy = end[1] - start[1]
    const radius = Math.sqrt(dx * dx + dy * dy)
    const startAngle = Math.atan(dy / dx) - (dx < 0 ? Math.PI : 0)

    for (let i = 0; i < sides; i++) {
      const avgAngle = (2 * Math.PI) / sides
      const angle = startAngle + avgAngle * i

      coordinates[i] = [
        start[0] + radius * Math.cos(angle),
        start[1] + radius * Math.sin(angle),
      ]
    }

    coordinates[sides] = coordinates[0]

    return coordinates
  }
}
