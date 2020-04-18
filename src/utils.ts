/**
 * 将原型方法从一个构造函数继承到另一个构造函数
 *
 * Usage:
 *
 *     function ParentClass(a, b) { }
 *     ParentClass.prototype.foo = function(a) { }
 *
 *     function ChildClass(a, b, c) {
 *       // Call parent constructor
 *       ParentClass.call(this, a, b)
 *     }
 *     inherits(ChildClass, ParentClass)
 *
 *     var child = new ChildClass('a', 'b', 'see')
 *     child.foo() // This works.
 *
 * @param {Function} childCtor  子构造函数
 * @param {Function} parentCtor 父构造函数
 */
export function inherits(childCtor, parentCtor) {
  childCtor.prototype = Object.create(parentCtor.prototype)
  childCtor.prototype.constructor = childCtor
}
