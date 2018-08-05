import {inherits} from '../utils.js'
import Geometry from '../geometry/Geometry.js'
import GeometryType from '../geometry/GeometryType.js'
import {createDefaultStyle, renderStyle} from '../style/Style.js'


/**
 * 圆形构造函数
 * @param {Array.<Array.<Number>>} coordinates
 */
function Circle(coordinates) {
  Geometry.call(this)

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

inherits(Circle, Geometry)

/**
 * @param {CanvasRenderingContext2D} ctx
 */
Circle.prototype.render = function(ctx) {
  const
    center = this.getCenter(),
    radius = this.getRadius()

  ctx.beginPath()
  ctx.arc(center[0], center[1], radius, 0, 2 * Math.PI)

  renderStyle(ctx, this.style)

  ctx.closePath()
}

Circle.prototype.getType = function() {
  return GeometryType.CIRCLE
}

Circle.prototype.getCenter = function() {
  return this.getCoordinates()[0]
}

Circle.prototype.setCenter = function(coordinate) {
  this.coordinates[0] = coordinate
}

Circle.prototype.getRadius = function() {
  return this.radius
}

Circle.prototype.setRadius = function(radius) {
  this.radius = radius
}

export default Circle
