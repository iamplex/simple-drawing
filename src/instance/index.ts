import { eventsInit } from './event.js'
import { DEVICE_PIXEL_RATIO } from './default.js'
import Draw from '../interaction/Draw.js'
import Geometry from '../geometry/Geometry.js'
import { Coordinate } from '../geometry/Coordinate.js'

class Sketchpad {
  private container: HTMLElement
  private context: CanvasRenderingContext2D
  private viewport: HTMLElement
  private canvas: HTMLCanvasElement
  private features: Array<Geometry>
  private draw: Draw
  private animationDelay: FrameRequestCallback

  constructor(container) {
    this.container = container

    this.context = document.createElement('canvas').getContext('2d')

    this.viewport = document.createElement('div')
    this.viewport.style.position = 'relative'
    this.viewport.style.overflow = 'hidden'
    this.viewport.style.width = '100%'
    this.viewport.style.height = '100%'
    this.viewport.style.userSelect = 'none'
    this.viewport.style.touchAction = 'none'

    this.canvas = this.context.canvas
    this.canvas.style.width = '100%'
    this.canvas.style.height = '100%'
    this.canvas.style.display = 'block'

    this.viewport.insertBefore(this.canvas, this.viewport.firstChild)
    this.container.appendChild(this.viewport)

    this.features = []

    this.draw = null

    // WHAT THE FUCK: 在不绑定this的情况下, this.resize函数会报错
    this.animationDelay = function (): void {
      this.resize(Date.now)
    }.bind(this)

    this.animationDelay(Date.now())

    this.init(this)

    this.context.scale(DEVICE_PIXEL_RATIO, DEVICE_PIXEL_RATIO)
  }

  private init(instance): void {
    eventsInit(instance)
  }

  public getContainer(): HTMLElement {
    return this.container
  }

  public getContext(): CanvasRenderingContext2D {
    return this.context
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas
  }

  public getEventPixel(event: MouseEvent): Coordinate {
    const viewportPosition: DOMRect = this.viewport.getBoundingClientRect()

    return [
      event.clientX - viewportPosition.left,
      event.clientY - viewportPosition.top,
    ]
  }

  public getFeatures(): Array<Geometry> {
    return this.features.slice()
  }

  public addFeature(geometry: Geometry): void {
    this.features.push(geometry)
  }

  public clearFeature(): void {
    this.features.length = 0
  }

  /**
   * 渲染缓存中的图形到canvas
   */
  render(): void {
    this.clear()

    this.features.forEach(
      function (feature): void {
        feature.render(this.context)
      }.bind(this)
    )
  }

  public getDraw(): Draw {
    return this.draw
  }

  public setDraw(draw: Draw): void {
    this.clearDraw()

    draw.setContext(this.context)
    draw.setFeatures(this.features)

    this.draw = draw
  }

  public clearDraw(): void {
    this.draw = null
  }

  /**
   * 清除canvas
   */
  public clear(): void {
    const canvas = this.getCanvas()
    const context = this.getContext()

    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  /**
   * 强制重新计算画板容器大小
   */
  protected resize(): void {
    const targetElement: HTMLElement = this.getContainer()
    const computedStyle: CSSStyleDeclaration = getComputedStyle(targetElement)
    const canvas: HTMLCanvasElement = this.getCanvas()

    const size: [number, number] = [
      targetElement.offsetWidth -
        parseFloat(computedStyle['borderLeftWidth']) -
        parseFloat(computedStyle['paddingLeft']) -
        parseFloat(computedStyle['paddingRight']) -
        parseFloat(computedStyle['borderRightWidth']),

      targetElement.offsetHeight -
        parseFloat(computedStyle['borderTopWidth']) -
        parseFloat(computedStyle['paddingTop']) -
        parseFloat(computedStyle['paddingBottom']) -
        parseFloat(computedStyle['borderBottomWidth']),
    ]

    const width: number = Math.round(size[0] * DEVICE_PIXEL_RATIO)
    const height: number = Math.round(size[1] * DEVICE_PIXEL_RATIO)

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
    }

    this.triggerResize()
  }

  private triggerResize(): void {
    requestAnimationFrame(this.animationDelay)
  }
}

export default Sketchpad
