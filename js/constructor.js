class abc {
    constructor() {

        this.acc = 123;
        this.edf = 234;
        this.sum = function () {
            this.acc + this.edf;
        };
        return {};

    }
}
var gg = new abc()
//1. 在abc中创建一个新对象  ,2.给这个对象一个_pro_ 连接原对象的-prototype 3.这个对象成为this的上下文
//4 没有返回对象 返回this
// console.log(gg)
//constructor 可以理解为创建者 gg是构造函数内置对象的实例


//构造函数 学习
/**
 * 构造一个对文本框的验证  验证失败 文字消息提示在p元素中
 * 所以构造器对象属性有 文本框 当前p元素,构造方法可以放在原型上面
 * @param {string} nameid 
 * @param {function} rule 
 */
class FieldValidator {
    constructor(nameid, rule) {
        this.input = document.querySelector('#' + nameid);
        this.p = this.input;
        this.validator = function () { this.p.innerText = rule(this.input.value); };
        console.log(this.input);
        this.input.onblur = function () {
            console.log(this);
            this.nextElementSibling.innerText = rule(this.value);
        };

    }
}
