import GeometryType from '../geometry/GeometryType.js'
import Point from '../geometry/Point.js'
import {createEditingStyle} from '../style/Style.js'

export function eventsInit(instance) {
  const
    context = instance.getContext(),
    canvas = instance.getCanvas(),

    mousePoint = new Point()

  canvas.addEventListener('click', function(event) {
    const draw = instance.getDraw()

    if (!draw) {
      return
    }

    if (draw.isFreehand) {
      return
    }

    if (!draw.isDrawing) {
      draw.startDrawing([event.layerX, event.layerY])

      if (draw.type === GeometryType.POINT) {
        draw.finishDrawing(context)
        instance.render()
      } else {
        draw.addCoordinateDrawing([event.layerX, event.layerY])
      }
    } else {
      if (draw.type === GeometryType.CIRCLE || draw.type === GeometryType.CUSTOM) {
        draw.finishDrawing(context)
        instance.render()
      } else {
        draw.addCoordinateDrawing([event.layerX, event.layerY])
      }
    }
  }, false)

  canvas.addEventListener('dblclick', function(event) {
    const draw = instance.getDraw()

    if (!draw) {
      return
    }

    if (draw.isFreehand) {
      return
    }

    if (draw.isDrawing) {
      draw.finishDrawing(context)
      instance.render()
    }
  }, false)

  canvas.addEventListener('mousedown', function(event) {
    const draw = instance.getDraw()

    if (!draw) {
      return
    }

    if (!draw.isFreehand) {
      return
    }

    if (!draw.isDrawing) {
      draw.startDrawing([event.layerX, event.layerY])

      if (draw.type === GeometryType.POINT) {
        draw.finishDrawing(context)
        instance.render()
      } else {
        draw.addCoordinateDrawing([event.layerX, event.layerY])
      }
    } else {
      if (draw.type === GeometryType.CIRCLE) {
        draw.finishDrawing(context)
        instance.render()
      } else {
        draw.addCoordinateDrawing([event.layerX, event.layerY])
      }
    }
  }, false)

  canvas.addEventListener('mousemove', function(event) {
    const draw = instance.getDraw()

    instance.render()

    if (!draw) {
      return
    }

    if (draw.isDrawing) {
      if (draw.isFreehand) {
        if (draw.type === GeometryType.LINE || draw.type === GeometryType.POLYGON) {
          draw.addCoordinateDrawing([event.layerX, event.layerY])
        } else {
          draw.modifyDrawing([event.layerX, event.layerY])
        }
      } else {
        draw.modifyDrawing([event.layerX, event.layerY])
      }
    }

    mousePoint.setStyle(createEditingStyle(GeometryType.POINT))
    mousePoint.setCoordinates([[event.layerX, event.layerY]])
    mousePoint.render(context)
  }, false)

  canvas.addEventListener('mouseup', function(event) {
    const draw = instance.getDraw()

    if (!draw) {
      return
    }

    if (!draw.isFreehand) {
      return
    }

    draw.finishDrawing(context)
    instance.render()
  }, false)

  // canvas.addEventListener('mouseout', function(event) {

  // }, false)
}
