import {eventsInit} from '../instance/event.js'
import {DEVICE_PIXEL_RATIO} from '../instance/default.js'

function Sketchpad(container) {

  /**
   * @type {HTMLElement}
   */
  this.container = container


  /**
   * @type {CanvasRenderingContext2D}
   */
  this.context = document.createElement('canvas').getContext('2d')


  /**
   * @type {HTMLElement}
   */
  this.viewport = document.createElement('div')
  this.viewport.style.position = 'relative'
  this.viewport.style.overflow = 'hidden'
  this.viewport.style.width = '100%'
  this.viewport.style.height = '100%'
  this.viewport.style.userSelect = 'none'
  this.viewport.style.touchAction = 'none'


  /**
   * @type {HTMLCanvasElement}
   */
  this.canvas = this.context.canvas
  this.canvas.style.width = '100%'
  this.canvas.style.height = '100%'
  this.canvas.style.display = 'block'

  this.viewport.insertBefore(this.canvas, this.viewport.firstChild)
  this.container.appendChild(this.viewport)


  /**
   * 用于缓存绘制完成的图形
   * @type {Array.<module:geometry/Geometry>}
   */
  this.features = []


  /**
   * @type {module:interaction/Draw}
   */
  this.draw = null


  // ??: 在不绑定this的情况下, this.resize函数会报错
  this._animationDelay = function() {
    this.resize(Date.now)
  }.bind(this)

  this._animationDelay()

  this._init(this)
}

Sketchpad.prototype._init = function(instance) {
  eventsInit(instance)
}

/**
 * @return {HTMLElement}
 */
Sketchpad.prototype.getContainer = function() {
  return this.container
}

/**
 * @return {CanvasRenderingContext2D}
 */
Sketchpad.prototype.getContext = function() {
  return this.context
}

/**
 * @return {HTMLCanvasElement}
 */
Sketchpad.prototype.getCanvas = function() {
  return this.canvas
}

/**
 * @return {Array.<module:geometry/Geometry>}
 */
Sketchpad.prototype.getFeatures = function() {
  return this.features.slice()
}

/**
 * 添加一个图形到缓存中
 * @param {Array.<module:geometry/Geometry>} geometry
 */
Sketchpad.prototype.addFeature = function(geometry) {
  this.features.push(geometry)
}

/**
 * 清除缓存中的图形
 */
Sketchpad.prototype.clearFeature = function() {
  this.features.length = 0
}

/**
 * 渲染缓存中的图形到canvas
 */
Sketchpad.prototype.render = function() {
  this.clear()

  this.features.forEach(function(feature) {
    feature.render(this.context)
  }.bind(this))
}

/**
 * @return {module:interaction/Draw}
 */
Sketchpad.prototype.getDraw = function() {
  return this.draw
}

/**
 * 设置绘制交互
 * @param {module:interaction/Draw} draw
 */
Sketchpad.prototype.setDraw = function(draw) {
  this.clearDraw()

  draw.setContext(this.context)
  draw.setFeatures(this.features)

  this.draw = draw
}

/**
 * 清除当前的绘制交互
 * @return {[type]} [description]
 */
Sketchpad.prototype.clearDraw = function() {
  this.draw = null
}

/**
 * 清除canvas
 */
Sketchpad.prototype.clear = function() {
  const
    canvas = this.getCanvas(),
    context = this.getContext()

  context.clearRect(0, 0, canvas.width, canvas.height)
}

/**
 * 强制重新计算画板容器大小
 */
Sketchpad.prototype.resize = function() {
  const
    targetElement = this.getContainer(),

    computedStyle = getComputedStyle(targetElement),

    canvas = this.getCanvas(),

    size = [
      targetElement.offsetWidth -
        parseFloat(computedStyle['borderLeftWidth']) -
        parseFloat(computedStyle['paddingLeft']) -
        parseFloat(computedStyle['paddingRight']) -
        parseFloat(computedStyle['borderRightWidth']),

      targetElement.offsetHeight -
        parseFloat(computedStyle['borderTopWidth']) -
        parseFloat(computedStyle['paddingTop']) -
        parseFloat(computedStyle['paddingBottom']) -
        parseFloat(computedStyle['borderBottomWidth'])
    ],

    width = Math.round(size[0] * DEVICE_PIXEL_RATIO),
    height = Math.round(size[1] * DEVICE_PIXEL_RATIO)

  if (canvas.width != width || canvas.height != height) {
    canvas.width = width
    canvas.height = height
  }

  this.triggerResize()
}

Sketchpad.prototype.triggerResize = function() {
  requestAnimationFrame(this._animationDelay)
}

export default Sketchpad
