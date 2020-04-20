import GeometryType from '../geometry/GeometryType.js'
import Point from '../geometry/Point.js'
import { createEditingStyle } from '../style/Style.js'

export function eventsInit(instance): void {
  const // todo
    context = instance.getContext(),
    canvas = instance.getCanvas(),
    mousePoint = new Point()

  function pointerup(): void {
    const draw = instance.getDraw()

    if (!draw || !draw.getFreehandState() || draw.type === GeometryType.POINT)
      return

    draw.finishDrawing()
    instance.render()

    canvas.removeEventListener('pointerup', pointerup, false)
  }

  function dblclick(): void {
    const draw = instance.getDraw()

    if (!draw || draw.isFreehand || !draw.isDrawing) return

    draw.finishDrawing()
    instance.render()

    canvas.removeEventListener('pointerup', pointerup, false)
  }

  canvas.addEventListener(
    'click',
    function (event) {
      const draw = instance.getDraw()

      if (!draw || draw.isFreehand) return

      if (!draw.isDrawing) {
        draw.startDrawing([event.layerX, event.layerY])

        if (draw.type === GeometryType.POINT) {
          draw.finishDrawing()
          instance.render()
        } else {
          draw.addCoordinateDrawing([event.layerX, event.layerY])
        }
      } else {
        if (
          draw.type === GeometryType.CIRCLE ||
          draw.type === GeometryType.CUSTOM
        ) {
          draw.finishDrawing()
          instance.render()
        } else {
          draw.addCoordinateDrawing([event.layerX, event.layerY])
        }
      }

      canvas.addEventListener('dblclick', dblclick, false)
    },
    false
  )

  canvas.addEventListener(
    'pointerdown',
    function (event) {
      const draw = instance.getDraw()

      if (!draw || !draw.isFreehand) return

      if (!draw.isDrawing) {
        draw.startDrawing([event.layerX, event.layerY])

        if (draw.type === GeometryType.POINT) {
          draw.finishDrawing()
          instance.render()
        } else {
          draw.addCoordinateDrawing([event.layerX, event.layerY])
        }
      } else {
        if (draw.type === GeometryType.CIRCLE) {
          draw.finishDrawing()
          instance.render()
        } else {
          draw.addCoordinateDrawing([event.layerX, event.layerY])
        }
      }

      canvas.addEventListener('pointerup', pointerup, false)
    },
    false
  )

  canvas.addEventListener(
    'pointermove',
    function (event) {
      const draw = instance.getDraw()

      instance.render()

      if (!draw) return

      mousePoint.setStyle(createEditingStyle(GeometryType.POINT))
      mousePoint.setCoordinates([[event.layerX, event.layerY]])
      mousePoint.render(context)

      if (!draw.isDrawing) return
      if (
        !draw.isFreehand ||
        (draw.type !== GeometryType.LINE && draw.type !== GeometryType.POLYGON)
      ) {
        draw.modifyDrawing([event.layerX, event.layerY])
        return
      }

      draw.addCoordinateDrawing([event.layerX, event.layerY])
    },
    false
  )
}
