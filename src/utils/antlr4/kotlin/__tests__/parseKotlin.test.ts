import {assert, describe, expect, it} from 'vitest';
import {parseKotlin} from '../parseKotlin.js';

describe('parseKotlin', () => {
    it('parse class - 解析普通类', () => {
        const classCode = `
import java.util.List
import java.util.ArrayList

/**
 * 测试类说明
 */
class TestClass<T : Comparable<T>, U>(
    val x: Int = 10,
    var name: String?
) {
    /**
     * 方法注释
     */
    fun function1() {
        val x = 10
    }

    // function2 方法注释
    private fun <K, V : Number> function2(
        aParam: Int,
        b: List<String>
    ): String? {
        return "hello"
    }
}
        `;

        const result = parseKotlin(classCode);

        expect(result.imports.length).toBe(2);
        assert(result.imports[0]);
        expect(result.imports[0].path).toBe('java.util.List');
        assert(result.imports[1]);
        expect(result.imports[1].path).toBe('java.util.ArrayList');
        expect(result.classes.length).toBe(1);
        const cls = result.classes[0];
        assert(cls);
        expect(cls.name).toBe('TestClass');
        expect(cls.properties.length).toBe(2);
        expect(cls.functions.length).toBe(2);

        // 验证函数
        assert(cls.functions[0]);
        expect(cls.functions[0].name).toBe('function1');
        assert(cls.functions[1]);
        expect(cls.functions[1].name).toBe('function2');

        // 验证类泛型参数
        expect(cls.typeParameters).toBeDefined();
        assert(cls.typeParameters);
        expect(cls.typeParameters.length).toBe(2);
        assert(cls.typeParameters[0]);
        expect(cls.typeParameters[0].name).toBe('T');
        assert(cls.typeParameters[0].bound);
        expect(cls.typeParameters[0].bound.raw).toBe('Comparable<T>');
        expect(cls.typeParameters[0].bound.name).toBe('Comparable');
        assert(cls.typeParameters[1]);
        expect(cls.typeParameters[1].name).toBe('U');

        // 验证属性的详细信息
        assert(cls.properties[0]);
        expect(cls.properties[0].name).toBe('x');
        expect(cls.properties[0].isVal).toBe(true);
        expect(cls.properties[0].isVar).toBe(false);
        expect(cls.properties[0].type.raw).toBe('Int');
        expect(cls.properties[0].type.name).toBe('Int');
        expect(cls.properties[0].initializer).toBe('10');

        assert(cls.properties[1]);
        expect(cls.properties[1].name).toBe('name');
        expect(cls.properties[1].isVar).toBe(true);
        expect(cls.properties[1].isVal).toBe(false);
        expect(cls.properties[1].type.raw).toBe('String?');
        expect(cls.properties[1].type.name).toBe('String');
        expect(cls.properties[1].type.isNullable).toBe(true);
        expect(cls.properties[1].initializer).toBeUndefined();

        // 验证第一个函数的基本属性
        const function1 = cls.functions[0];
        assert(function1);
        expect(function1.name).toBe('function1');
        expect(function1.modifiers.length).toBe(0);
        expect(function1.parameters.length).toBe(0);
        expect(function1.returnType).toBeUndefined();
        expect(function1.typeParameters.length).toBe(0);

        const function2 = cls.functions[1];
        assert(function2);
        expect(function2.modifiers.length).toBe(1);
        expect(function2.modifiers).toContain('private');

        // 验证函数参数
        expect(function2.parameters.length).toBe(2);
        assert(function2.parameters[0]);
        expect(function2.parameters[0].name).toBe('aParam');
        expect(function2.parameters[0].type.raw).toBe('Int');
        expect(function2.parameters[0].type.name).toBe('Int');
        assert(function2.parameters[1]);
        expect(function2.parameters[1].name).toBe('b');
        expect(function2.parameters[1].type.raw).toBe('List<String>');
        expect(function2.parameters[1].type.name).toBe('List');

        // 验证函数返回值
        expect(function2.returnType).toBeDefined();
        assert(function2.returnType);
        expect(function2.returnType.raw).toBe('String?');
        expect(function2.returnType.name).toBe('String');
        expect(function2.returnType.isNullable).toBe(true);

        // 验证函数泛型参数
        assert(function2.typeParameters);
        expect(function2.typeParameters.length).toBe(2);
        assert(function2.typeParameters[0]);
        expect(function2.typeParameters[0].name).toBe('K');
        assert(function2.typeParameters[1]);
        expect(function2.typeParameters[1].name).toBe('V');
        assert(function2.typeParameters[1].bound);
        expect(function2.typeParameters[1].bound.raw).toBe('Number');
        expect(function2.typeParameters[1].bound.name).toBe('Number');
    });

    it('parse interface - 解析接口', () => {
        const interfaceCode = `
package com.example

import java.io.Serializable

interface MyInterface<T : Serializable> : Serializable, Cloneable {
    val CONSTANT: Int get() = 10
    var NAME: String

    fun doSomething()

    fun <U> getData(clazz: Class<U>): U

    fun defaultFunction() {
        println("default")
    }
}
        `;

        const result = parseKotlin(interfaceCode);

        expect(result.packageName).toBe('com.example');
        expect(result.imports.length).toBe(1);
        expect(result.classes.length).toBe(1);

        const interface0 = result.classes[0];
        assert(interface0);
        expect(interface0.name).toBe('MyInterface');
        expect(interface0.isInterface).toBe(true);
        expect(interface0.delegationSpecifiers.map((d) => d.raw)).toContain('Serializable');
        expect(interface0.delegationSpecifiers.map((d) => d.raw)).toContain('Cloneable');

        // 验证接口注解
        expect(interface0.annotations.length).toBe(0);

        // 验证接口泛型参数
        expect(interface0.typeParameters).toBeDefined();
        assert(interface0.typeParameters);
        expect(interface0.typeParameters.length).toBe(1);
        assert(interface0.typeParameters[0]);
        expect(interface0.typeParameters[0].name).toBe('T');
        assert(interface0.typeParameters[0].bound);
        expect(interface0.typeParameters[0].bound.raw).toBe('Serializable');
        expect(interface0.typeParameters[0].bound.name).toBe('Serializable');

        // 验证属性
        expect(interface0.properties.length).toBe(2);
        assert(interface0.properties[0]);
        expect(interface0.properties[0].name).toBe('CONSTANT');
        expect(interface0.properties[0].type.raw).toBe('Int');
        expect(interface0.properties[0].type.name).toBe('Int');
        assert(interface0.properties[1]);
        expect(interface0.properties[1].name).toBe('NAME');
        expect(interface0.properties[1].type.raw).toBe('String');
        expect(interface0.properties[1].type.name).toBe('String');
        expect(interface0.properties[1].isVar).toBe(true);

        // 验证函数
        expect(interface0.functions.length).toBe(3);
        assert(interface0.functions.find((f) => f.name === 'doSomething'));
        assert(interface0.functions.find((f) => f.name === 'getData'));
        assert(interface0.functions.find((f) => f.name === 'defaultFunction'));
    });

    it('parse enum with body declarations - 解析枚举体声明', () => {
        const enumCode = `
import java.util.Arrays

/**
 * 星期枚举
 */
enum class DayOfWeek(
    /**
     * 中文名称
     */
    val chineseName: String
) {
    /**
     * 周一
     */
    MONDAY("周一"),

    /**
     * 周二
     */
    TUESDAY("周二"),

    /**
     * 周三
     */
    WEDNESDAY("周三");

    /**
     * 获取中文名称
     */
    fun getChineseName(): String {
        return chineseName
    }

    // 判断是否是周末
    open fun isWeekend(): Boolean {
        return this == SATURDAY || this == SUNDAY
    }

    companion object {
        /**
         * 从值创建枚举
         */
        fun fromValue(value: Int): DayOfWeek {
            return values()[value - 1]
        }
    }
}
        `;

        const result = parseKotlin(enumCode);

        expect(result.imports.length).toBe(1);
        expect(result.enums.length).toBe(1);

        const enumType = result.enums[0];
        assert(enumType);
        expect(enumType.name).toBe('DayOfWeek');

        // 验证枚举项
        expect(enumType.enumEntries.length).toBe(3);
        assert(enumType.enumEntries[0]);
        expect(enumType.enumEntries[0].name).toBe('MONDAY');
        expect(enumType.enumEntries[0].arguments.length).toBe(1);
        expect(enumType.enumEntries[0].arguments[0]).toBe('"周一"');
        expect(enumType.enumEntries[0].comments.length).toBe(0);
        assert(enumType.enumEntries[1]);
        expect(enumType.enumEntries[1].name).toBe('TUESDAY');
        assert(enumType.enumEntries[2]);
        expect(enumType.enumEntries[2].name).toBe('WEDNESDAY');

        // 验证属性
        expect(enumType.properties.length).toBe(1);
        assert(enumType.properties.find((p) => p.name === 'chineseName'));

        // 验证函数
        expect(enumType.functions.length).toBe(2);
        assert(enumType.functions.find((f) => f.name === 'getChineseName'));
        assert(enumType.functions.find((f) => f.name === 'isWeekend'));

        // 验证伴生对象
        expect(enumType.inner.objects.length).toBe(1);
        const companionObject = enumType.inner.objects[0];
        assert(companionObject);
        expect(companionObject.isCompanion).toBe(true);
        expect(companionObject.functions.length).toBe(1);
        assert(companionObject.functions[0]);
        expect(companionObject.functions[0].name).toBe('fromValue');
    });

    it('parse data class - 解析数据类', () => {
        const dataClassCode = `
/**
 * 人员数据类
 */
data class Person(
    /**
     * 姓名
     */
    val name: String,

    /**
     * 年龄
     */
    var age: Int,

    // 爱好
    val hobbies: List<String> = emptyList()
) : Serializable, Comparable<Person> {

    // 问候方法
    fun greeting(): String {
        return "Hello, I'm \$name"
    }
}
        `;

        const result = parseKotlin(dataClassCode);

        expect(result.classes.length).toBe(1);

        const dataClass = result.classes[0];
        assert(dataClass);
        expect(dataClass.name).toBe('Person');
        expect(dataClass.isData).toBe(true);
        expect(dataClass.delegationSpecifiers.map((d) => d.raw)).toContain('Serializable');
        expect(dataClass.delegationSpecifiers.map((d) => d.raw)).toContain('Comparable<Person>');

        // 验证主构造函数参数
        expect(dataClass.primaryConstructor).toBeDefined();
        const primaryConstructor = dataClass.primaryConstructor;
        assert(primaryConstructor);
        expect(primaryConstructor.parameters.length).toBe(3);
        assert(primaryConstructor.parameters[0]);
        expect(primaryConstructor.parameters[0].name).toBe('name');
        expect(primaryConstructor.parameters[0].type.raw).toBe('String');
        expect(primaryConstructor.parameters[0].type.name).toBe('String');
        assert(primaryConstructor.parameters[1]);
        expect(primaryConstructor.parameters[1].name).toBe('age');
        expect(primaryConstructor.parameters[1].type.raw).toBe('Int');
        expect(primaryConstructor.parameters[1].type.name).toBe('Int');
        assert(primaryConstructor.parameters[2]);
        expect(primaryConstructor.parameters[2].type.raw).toBe('List<String>');
        expect(primaryConstructor.parameters[2].type.name).toBe('List');
        expect(primaryConstructor.parameters[2].defaultValue).toBeDefined();

        // 验证属性
        expect(dataClass.properties.length).toBe(3);
        assert(dataClass.properties.find((p) => p.name === 'name'));
        assert(dataClass.properties.find((p) => p.name === 'age'));
        assert(dataClass.properties.find((p) => p.name === 'hobbies'));

        // 验证函数
        expect(dataClass.functions.length).toBe(1);
        assert(dataClass.functions[0]);
        expect(dataClass.functions[0].name).toBe('greeting');
    });

    it('parse sealed class - 解析密封类', () => {
        const sealedClassCode = `
/**
 * 结果密封类
 */
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String, val cause: Throwable? = null) : Result<Nothing>()
}
        `;

        const result = parseKotlin(sealedClassCode);

        expect(result.classes.length).toBe(1);

        const sealedClass = result.classes[0];
        assert(sealedClass);
        expect(sealedClass.name).toBe('Result');
        expect(sealedClass.isSealed).toBe(true);

        // 验证内部类
        expect(sealedClass.inner.classes.length).toBe(2);
        const successClass = sealedClass.inner.classes[0];
        assert(successClass);
        expect(successClass.name).toBe('Success');
        expect(successClass.isData).toBe(true);
        const errorClass = sealedClass.inner.classes[1];
        assert(errorClass);
        expect(errorClass.name).toBe('Error');
        expect(errorClass.isData).toBe(true);
    });

    it('parse object declaration - 解析对象声明', () => {
        const objectCode = `
/**
 * 单例对象
 */
object Singleton {
    val instance: String = "singleton"

    fun doSomething() {
        println("doing something")
    }
}
        `;

        const result = parseKotlin(objectCode);

        expect(result.objects.length).toBe(1);

        const singleton = result.objects[0];
        assert(singleton);
        expect(singleton.name).toBe('Singleton');
        expect(singleton.modifiers.length).toBe(0);
        expect(singleton.properties.length).toBe(1);
        assert(singleton.properties[0]);
        expect(singleton.properties[0].name).toBe('instance');
        expect(singleton.properties[0].type.raw).toBe('String');
        expect(singleton.properties[0].type.name).toBe('String');
        expect(singleton.functions.length).toBe(1);
        assert(singleton.functions[0]);
        expect(singleton.functions[0].name).toBe('doSomething');
    });

    it('parse type alias - 解析类型别名', () => {
        const typeAliasCode = `
/**
 * 字符串映射类型别名
 */
typealias StringMap<T> = Map<String, T>

/**
 * 操作类型别名
 */
typealias Operation = (Int, Int) -> Int
        `;

        const result = parseKotlin(typeAliasCode);

        expect(result.typeAliases.length).toBe(2);

        const stringMap = result.typeAliases[0];
        assert(stringMap);
        expect(stringMap.name).toBe('StringMap');
        expect(stringMap.typeParameters.length).toBe(1);
        assert(stringMap.underlyingType);
        expect(stringMap.underlyingType.raw).toBe('Map<String, T>');
        expect(stringMap.underlyingType.name).toBe('Map');

        const operation = result.typeAliases[1];
        assert(operation);
        expect(operation.name).toBe('Operation');
        expect(operation.underlyingType.raw).toBe('(Int, Int) -> Int');
        expect(operation.underlyingType.isFunctionType).toBe(true);
    });

    it('parse complex nullable and generic types - 解析复杂可空和泛型类型', () => {
        const complexCode = `
import java.util.*

class ComplexExample<T : Comparable<T>> {
    private var data: List<Map<String, out Number>>?
    private var cache: MutableMap<Int, MutableList<T>>

    fun <R : Any> convert(mapper: (T) -> R): R? {
        return null
    }

    fun process(input: List<T>, config: Map<String, *>?) {
    }

    fun findFirst(predicate: (T) -> Boolean): Optional<T> {
        return Optional.empty()
    }
}
        `;

        const result = parseKotlin(complexCode);

        expect(result.classes.length).toBe(1);
        const cls = result.classes[0];
        assert(cls);

        // 验证类泛型边界中的型变
        expect(cls.typeParameters.length).toBe(1);
        assert(cls.typeParameters?.[0]);
        expect(cls.typeParameters[0].name).toBe('T');
        assert(cls.typeParameters[0].bound);
        expect(cls.typeParameters[0].bound.raw).toBe('Comparable<T>');
        expect(cls.typeParameters[0].bound.name).toBe('Comparable');

        // 验证属性复杂类型
        expect(cls.properties.length).toBe(2);
        const dataProp = cls.properties[0];
        assert(dataProp);
        expect(dataProp.name).toBe('data');
        expect(dataProp.type.raw).toBe('List<Map<String, out Number>>?');
        expect(dataProp.type.name).toBe('List');
        expect(dataProp.type.isNullable).toBe(true);

        // 验证函数泛型和参数
        const convertFunc = cls.functions.find((f) => f.name === 'convert');
        assert(convertFunc);
        expect(convertFunc.name).toBe('convert');
        expect(convertFunc.returnType).toBeDefined();
        assert(convertFunc.returnType);
        expect(convertFunc.returnType.raw).toBe('R?');
        expect(convertFunc.returnType.name).toBe('R');
        expect(convertFunc.typeParameters.length).toBe(1);
        assert(convertFunc.typeParameters[0]);
        expect(convertFunc.typeParameters[0].name).toBe('R');
        assert(convertFunc.typeParameters[0].bound);
        expect(convertFunc.typeParameters[0].bound.raw).toBe('Any');
        expect(convertFunc.typeParameters[0].bound.name).toBe('Any');

        // 验证通配符参数
        const processFunc = cls.functions.find((f) => f.name === 'process');
        assert(processFunc);
        expect(processFunc.name).toBe('process');
        expect(processFunc.parameters.length).toBe(2);
    });

    it('parse nested classes and objects - 解析嵌套类和对象', () => {
        const nestedCode = `
class OuterClass {
    private val outerField: Int = 0

    /**
     * 静态嵌套类
     */
    class StaticNestedClass {
        fun nestedFunction() {}
    }

    /**
     * 成员内部类
     */
    inner class InnerClass {
        private val innerField: String = ""

        /**
         * 深层内部类
         */
        inner class DeepInnerClass {
            fun deepFunction() {}
        }
    }

    interface NestedInterface {
        fun interfaceFunction()
    }

    object NestedObject {
        fun objectFunction() {}
    }
}
        `;

        const result = parseKotlin(nestedCode);

        expect(result.classes.length).toBe(1);
        const outerClass = result.classes[0];
        assert(outerClass);
        expect(outerClass.name).toBe('OuterClass');

        // 验证内部类
        expect(outerClass.inner.classes.length).toBe(3); // 包含 interface
        expect(outerClass.inner.objects.length).toBe(1);

        const staticNested = outerClass.inner.classes[0];
        assert(staticNested);
        expect(staticNested.name).toBe('StaticNestedClass');

        const innerClass = outerClass.inner.classes[1];
        assert(innerClass);
        expect(innerClass.name).toBe('InnerClass');

        // 验证深层内部类
        expect(innerClass.inner.classes.length).toBe(1);
        const deepInner = innerClass.inner.classes[0];
        assert(deepInner);
        expect(deepInner.name).toBe('DeepInnerClass');

        const nestedInterface = outerClass.inner.classes.find((c) => c.name === 'NestedInterface');
        assert(nestedInterface);
        expect(nestedInterface.name).toBe('NestedInterface');
        expect(nestedInterface.isInterface).toBe(true);

        const nestedObject = outerClass.inner.objects[0];
        assert(nestedObject);
        expect(nestedObject.name).toBe('NestedObject');
    });

    it('parse extension functions - 解析扩展函数', () => {
        const extensionCode = `
/**
 * 字符串扩展函数
 */
fun String.addPrefix(prefix: String): String {
    return prefix + this
}

/**
 * 可空字符串扩展函数
 */
fun String?.isNullOrEmptyCustom(): Boolean {
    return this == null || this.isEmpty()
}
        `;

        const result = parseKotlin(extensionCode);

        expect(result.functions.length).toBe(2);

        const addPrefixFunc = result.functions[0];
        assert(addPrefixFunc);
        expect(addPrefixFunc.name).toBe('addPrefix');
        expect(addPrefixFunc.receiverType).toBeDefined();
        assert(addPrefixFunc.receiverType);
        expect(addPrefixFunc.receiverType.raw).toBe('String');
        expect(addPrefixFunc.receiverType.name).toBe('String');
        expect(addPrefixFunc.returnType).toBeDefined();
        assert(addPrefixFunc.returnType);
        expect(addPrefixFunc.returnType.raw).toBe('String');
        expect(addPrefixFunc.returnType.name).toBe('String');
        expect(addPrefixFunc.parameters.length).toBe(1);
        assert(addPrefixFunc.parameters[0]);
        expect(addPrefixFunc.parameters[0].name).toBe('prefix');
        expect(addPrefixFunc.parameters[0].type.raw).toBe('String');
        expect(addPrefixFunc.parameters[0].type.name).toBe('String');

        const nullSafeFunc = result.functions[1];
        assert(nullSafeFunc);
        expect(nullSafeFunc.name).toBe('isNullOrEmptyCustom');
        expect(nullSafeFunc.receiverType).toBeDefined();
        assert(nullSafeFunc.receiverType);
        expect(nullSafeFunc.receiverType.raw).toBe('String?');
        expect(nullSafeFunc.receiverType.name).toBe('String');
        expect(nullSafeFunc.receiverType.isNullable).toBe(true);
        expect(nullSafeFunc.returnType).toBeDefined();
        assert(nullSafeFunc.returnType);
        expect(nullSafeFunc.returnType.raw).toBe('Boolean');
        expect(nullSafeFunc.returnType.name).toBe('Boolean');
    });

    it('parse lambda parameters - 解析 Lambda 参数', () => {
        const lambdaCode = `
fun higherOrderFunction(
    action: (Int, String) -> Unit,
    predicate: (item: Int) -> Boolean,
    transform: (value: Int) -> String = { it.toString() }
) {
    action(1, "test")
}
        `;

        const result = parseKotlin(lambdaCode);

        expect(result.functions.length).toBe(1);

        const func = result.functions[0];
        assert(func);
        expect(func.name).toBe('higherOrderFunction');
        expect(func.parameters.length).toBe(3);

        assert(func.parameters[0]);
        expect(func.parameters[0].type.raw).toBe('(Int, String) -> Unit');
        expect(func.parameters[0].type.name).toBe('(Int, String) -> Unit');
        expect(func.parameters[0].type.isFunctionType).toBe(true);
        assert(func.parameters[1]);
        expect(func.parameters[1].type.raw).toBe('(item: Int) -> Boolean');
        expect(func.parameters[1].type.name).toBe('(item: Int) -> Boolean');
        expect(func.parameters[1].type.isFunctionType).toBe(true);
        assert(func.parameters[2]);
        expect(func.parameters[2].type.raw).toBe('(value: Int) -> String');
        expect(func.parameters[2].type.name).toBe('(value: Int) -> String');
        expect(func.parameters[2].type.isFunctionType).toBe(true);
        expect(func.parameters[2].defaultValue).toBe('{ it.toString() }');
    });

    it('parse annotations with parameters - 解析带参数的注解', () => {
        const annotationCode = `
import org.springframework.stereotype.Service

@Service("userService")
class AnnotatedClass {
    @Deprecated(message = "Use newProperty instead")
    @get:Length(max = 255, message = "名称长度不能超过 255")
    var oldProperty: String? = null

    @Suppress("UNCHECKED_CAST")
    fun oldFunction(@NotNull param: String) {
    }
}
        `;

        const result = parseKotlin(annotationCode);

        expect(result.classes.length).toBe(1);
        const cls = result.classes[0];
        assert(cls);

        // 验证类注解
        expect(cls.annotations.length).toBe(1);
        assert(cls.annotations[0]);
        expect(cls.annotations[0].raw).toBe('@Service("userService")');
        expect(cls.annotations[0].name).toBe('Service');
        expect(cls.annotations[0].parameters.length).toBe(1);
        assert(cls.annotations[0].parameters[0]);
        expect(cls.annotations[0].parameters[0].name).toBeUndefined();
        expect(cls.annotations[0].parameters[0].value).toBe('"userService"');

        // 验证属性注解
        expect(cls.properties.length).toBe(1);
        assert(cls.properties[0]);
        expect(cls.properties[0].name).toBe('oldProperty');
        expect(cls.properties[0].type.raw).toBe('String?');
        expect(cls.properties[0].type.name).toBe('String');
        expect(cls.properties[0].annotations.length).toBe(2);
        assert(cls.properties[0].annotations[0]);
        expect(cls.properties[0].annotations[0].raw).toBe(
            '@Deprecated(message = "Use newProperty instead")',
        );
        expect(cls.properties[0].annotations[0].name).toBe('Deprecated');
        assert(cls.properties[0].annotations[1]);
        expect(cls.properties[0].annotations[1].raw).toBe(
            '@get:Length(max = 255, message = "名称长度不能超过 255")',
        );
        expect(cls.properties[0].annotations[1].target).toBe('@get');
        expect(cls.properties[0].annotations[1].name).toBe('Length');
        expect(cls.properties[0].annotations[1].parameters.length).toBe(2);
        assert(cls.properties[0].annotations[1].parameters[0]);
        expect(cls.properties[0].annotations[1].parameters[0].name).toBe('max');
        expect(cls.properties[0].annotations[1].parameters[0].value).toBe('255');
        assert(cls.properties[0].annotations[1].parameters[1]);
        expect(cls.properties[0].annotations[1].parameters[1].name).toBe('message');
        expect(cls.properties[0].annotations[1].parameters[1].value).toBe('"名称长度不能超过 255"');

        // 验证函数注解
        expect(cls.functions.length).toBe(1);
        const oldFunction = cls.functions[0];
        assert(oldFunction);
        expect(oldFunction.name).toBe('oldFunction');
        expect(oldFunction.annotations.length).toBe(1);
        assert(oldFunction.annotations[0]);
        expect(oldFunction.annotations[0].raw).toBe('@Suppress("UNCHECKED_CAST")');
        expect(oldFunction.annotations[0].name).toBe('Suppress');
        expect(oldFunction.parameters.length).toBe(1);
        assert(oldFunction.parameters[0]);
        expect(oldFunction.parameters[0].annotations.length).toBe(1);
        assert(oldFunction.parameters[0].annotations[0]);
        expect(oldFunction.parameters[0].annotations[0].name).toBe('NotNull');
    });

    it('parse vararg parameters - 解析可变参数', () => {
        const varargCode = `
class VarArgsExample {
    fun function1(vararg args: String) {}

    fun function2(first: Int, vararg rest: String) {}

    fun function3(matrix: Array<Array<Int>>) {}
}
        `;

        const result = parseKotlin(varargCode);

        expect(result.classes.length).toBe(1);
        const cls = result.classes[0];
        assert(cls);
        expect(cls.functions.length).toBe(3);

        const function1 = cls.functions[0];
        assert(function1);
        expect(function1.name).toBe('function1');
        assert(function1.parameters[0]);
        expect(function1.parameters[0].name).toBe('args');
        expect(function1.parameters[0].type.raw).toBe('String');
        expect(function1.parameters[0].type.name).toBe('String');
        expect(function1.parameters[0].isVarArg).toBe(true);

        const function2 = cls.functions[1];
        assert(function2);
        expect(function2.name).toBe('function2');
        assert(function2.parameters[0]);
        expect(function2.parameters[0].name).toBe('first');
        expect(function2.parameters[0].type.raw).toBe('Int');
        expect(function2.parameters[0].type.name).toBe('Int');
        assert(function2.parameters[1]);
        expect(function2.parameters[1].name).toBe('rest');
        expect(function2.parameters[1].type.raw).toBe('String');
        expect(function2.parameters[1].type.name).toBe('String');
        expect(function2.parameters[1].isVarArg).toBe(true);

        const function3 = cls.functions[2];
        assert(function3);
        expect(function3.name).toBe('function3');
        assert(function3.parameters[0]);
        expect(function3.parameters[0].name).toBe('matrix');
        expect(function3.parameters[0].type.raw).toBe('Array<Array<Int>>');
        expect(function3.parameters[0].type.name).toBe('Array');
    });

    it('parse empty file and edge cases - 解析空文件和边界情况', () => {
        const emptyResult = parseKotlin('');
        expect(emptyResult.packageName).toBe('');
        expect(emptyResult.imports.length).toBe(0);
        expect(emptyResult.classes.length).toBe(0);
        expect(emptyResult.enums.length).toBe(0);
        expect(emptyResult.objects.length).toBe(0);

        const onlyPackageCode = 'package com.example.test';
        const packageResult = parseKotlin(onlyPackageCode);
        expect(packageResult.packageName).toBe('com.example.test');
        expect(packageResult.classes.length).toBe(0);

        const onlyImportsCode = `
import java.util.*
import java.io.*
        `;
        const importsResult = parseKotlin(onlyImportsCode);
        expect(importsResult.imports.length).toBe(2);
        assert(importsResult.imports[0]);
        expect(importsResult.imports[0].raw).toBe('import java.util.*\n');
        expect(importsResult.imports[0].path).toBe('java.util');
        expect(importsResult.imports[0].isOnDemand).toBe(true);
        assert(importsResult.imports[1]);
        expect(importsResult.imports[1].raw).toBe('import java.io.*\n');
        expect(importsResult.imports[1].path).toBe('java.io');
        expect(importsResult.imports[1].isOnDemand).toBe(true);
    });

    it('parse secondary constructor - 解析次构造函数', () => {
        const secondaryConstructorCode = `
class Person(val name: String) {
    /**
     * 次构造函数
     */
    constructor(name: String, age: Int) : this(name) {
        println("Secondary constructor called")
    }

    /**
     * 委托给 super 的构造函数
     */
    constructor(id: Int) : super() {
        println("Delegating to super")
    }
}
        `;

        const result = parseKotlin(secondaryConstructorCode);

        expect(result.classes.length).toBe(1);
        const cls = result.classes[0];
        assert(cls);

        // 验证主构造函数
        expect(cls.primaryConstructor).toBeDefined();
        const primaryConstructor = cls.primaryConstructor;
        assert(primaryConstructor);
        expect(primaryConstructor.parameters.length).toBe(1);

        // 验证次构造函数
        expect(cls.secondaryConstructors.length).toBe(2);

        const secConstructor1 = cls.secondaryConstructors[0];
        assert(secConstructor1);
        expect(secConstructor1.delegateCall).toBe('this');

        const secConstructor2 = cls.secondaryConstructors[1];
        assert(secConstructor2);
        expect(secConstructor2.delegateCall).toBe('super');
    });

    it('parse property with getter and setter - 解析带 getter 和 setter 的属性', () => {
        const propertyAccessorCode = `
class PropertyAccessors {
    var counter: Int = 0
        get() = field
        set(value) {
            if (value >= 0) field = value
        }

    val isEmpty: Boolean
        get() = counter == 0
}
        `;

        const result = parseKotlin(propertyAccessorCode);

        expect(result.classes.length).toBe(1);
        const cls = result.classes[0];
        assert(cls);
        expect(cls.properties.length).toBe(2);

        const counterProp = cls.properties[0];
        assert(counterProp);
        expect(counterProp.name).toBe('counter');
        expect(counterProp.type.raw).toBe('Int');
        expect(counterProp.type.name).toBe('Int');
        expect(counterProp.isVar).toBe(true);
        expect(counterProp.getter).toBeDefined();
        expect(counterProp.setter).toBeDefined();

        const isEmptyProp = cls.properties[1];
        assert(isEmptyProp);
        expect(isEmptyProp.name).toBe('isEmpty');
        expect(isEmptyProp.type.raw).toBe('Boolean');
        expect(isEmptyProp.type.name).toBe('Boolean');
        expect(isEmptyProp.isVal).toBe(true);
        expect(isEmptyProp.getter).toBeDefined();
        expect(isEmptyProp.setter).toBeUndefined();
    });

    it('parse class delegation - 解析类级别委托', () => {
        const classDelegationCode = `
interface Base {
    fun print()
}

class BaseImpl(val x: Int) : Base {
    override fun print() {
        println(x)
    }
}

class Derived(b: BaseImpl) : Base by b
        `;

        const result = parseKotlin(classDelegationCode);

        expect(result.classes.length).toBe(3);

        const derivedClass = result.classes.find((c) => c.name === 'Derived');
        assert(derivedClass);

        expect(derivedClass.delegationSpecifiers.length).toBe(1);
        expect(derivedClass.delegationSpecifiers[0]?.raw).toBe('Base by b');
        expect(derivedClass.delegationSpecifiers[0]?.type?.name).toBe('Base');
    });

    it('parse property delegation with lazy - 解析 lazy 属性委托', () => {
        const lazyDelegationCode = `
class Example {
    val lazyValue: String by lazy {
        "initialized"
    }
    
    val lazyInt: Int by lazy(LazyThreadSafetyMode.NONE) {
        42
    }
}
        `;

        const result = parseKotlin(lazyDelegationCode);

        expect(result.classes.length).toBe(1);
        const exampleClass = result.classes[0];
        assert(exampleClass);

        expect(exampleClass.properties.length).toBe(2);

        const lazyValue = exampleClass.properties[0];
        assert(lazyValue);
        expect(lazyValue.name).toBe('lazyValue');
        expect(lazyValue.type.raw).toBe('String');
        expect(lazyValue.isVal).toBe(true);
        expect(lazyValue.initializer).toBe('lazy {\n' + '        "initialized"\n' + '    }');

        const lazyInt = exampleClass.properties[1];
        assert(lazyInt);
        expect(lazyInt.name).toBe('lazyInt');
        expect(lazyInt.type.raw).toBe('Int');
        expect(lazyInt.initializer).toBe(
            'lazy(LazyThreadSafetyMode.NONE) {\n' + '        42\n' + '    }',
        );
    });

    it('parse property delegation with observable - 解析 observable 属性委托', () => {
        const observableCode = `
import kotlin.properties.Delegates

class User {
    var name: String by Delegates.observable("<no name>") {
        prop, old, new ->
        println("\$old -> \$new")
    }
    
    var age: Int by Delegates.vetoable(0) {
        prop, old, new ->
        new >= 0
    }
}
        `;

        const result = parseKotlin(observableCode);

        expect(result.imports.length).toBe(1);
        expect(result.imports[0]?.path).toBe('kotlin.properties.Delegates');

        expect(result.classes.length).toBe(1);
        const userClass = result.classes[0];
        assert(userClass);

        expect(userClass.properties.length).toBe(2);

        const nameProp = userClass.properties[0];
        assert(nameProp);
        expect(nameProp.name).toBe('name');
        expect(nameProp.type.raw).toBe('String');
        expect(nameProp.isVar).toBe(true);
        expect(nameProp.initializer).toBe(
            'Delegates.observable("<no name>") {\n        prop, old, new ->\n        println("\$old -> \$new")\n    }',
        );

        const ageProp = userClass.properties[1];
        assert(ageProp);
        expect(ageProp.name).toBe('age');
        expect(ageProp.type.raw).toBe('Int');
        expect(ageProp.initializer).toBe(
            'Delegates.vetoable(0) {\n        prop, old, new ->\n        new >= 0\n    }',
        );
    });

    it('parse property delegation with custom delegate - 解析自定义属性委托', () => {
        const customDelegateCode = `
class Delegate {
    operator fun getValue(thisRef: Any?, property: KProperty<*>): String {
        return ""
    }
    
    operator fun setValue(thisRef: Any?, property: KProperty<*>, value: String) {
    }
}

class Resource {
    var value: String by Delegate()
}
        `;

        const result = parseKotlin(customDelegateCode);

        expect(result.classes.length).toBe(2);

        const resourceClass = result.classes.find((c) => c.name === 'Resource');
        assert(resourceClass);

        expect(resourceClass.properties.length).toBe(1);

        const valueProp = resourceClass.properties[0];
        assert(valueProp);
        expect(valueProp.name).toBe('value');
        expect(valueProp.type.raw).toBe('String');
        expect(valueProp.isVar).toBe(true);
        expect(valueProp.initializer).toContain('Delegate()');
    });

    it('parse multiple delegations - 解析多个委托', () => {
        const multipleDelegationCode = `
interface Logger {
    fun log(message: String)
}

interface Validator {
    fun validate(): Boolean
}

class LoggerImpl : Logger {
    override fun log(message: String) {
        println(message)
    }
}

class ValidatorImpl : Validator {
    override fun validate(): Boolean = true
}

class Component(
    logger: LoggerImpl,
    validator: ValidatorImpl
) : Logger by logger, Validator by validator {
    
    val status: String by lazy { "active" }
    var count: Int by Delegates.observable(0) { _, old, new -> 
        println("\$old -> \$new")
    }
}
        `;

        const result = parseKotlin(multipleDelegationCode);

        expect(result.classes.length).toBe(5);

        const componentClass = result.classes.find((c) => c.name === 'Component');
        assert(componentClass);

        expect(componentClass.delegationSpecifiers.length).toBe(2);
        expect(componentClass.delegationSpecifiers.map((d) => d.raw)).toContain('Logger by logger');
        expect(componentClass.delegationSpecifiers.map((d) => d.raw)).toContain(
            'Validator by validator',
        );

        expect(componentClass.properties.length).toBe(2);

        const statusProp = componentClass.properties[0];
        assert(statusProp);
        expect(statusProp.name).toBe('status');
        expect(statusProp.initializer).toContain('lazy');

        const countProp = componentClass.properties[1];
        assert(countProp);
        expect(countProp.name).toBe('count');
        expect(countProp.initializer).toContain('Delegates.observable');
    });

    it('parse delegated property with annotation - 解析带注解的委托属性', () => {
        const annotatedDelegateCode = `
import kotlin.jvm.JvmField

class Config {
    @JvmField
    val setting: String by lazy { "default" }
    
    @Deprecated("Use newProperty instead")
    var oldProperty: Int by Delegates.notNull()
}
        `;

        const result = parseKotlin(annotatedDelegateCode);

        expect(result.imports.length).toBe(1);
        expect(result.imports[0]?.path).toBe('kotlin.jvm.JvmField');

        expect(result.classes.length).toBe(1);
        const configClass = result.classes[0];
        assert(configClass);

        expect(configClass.properties.length).toBe(2);

        const settingProp = configClass.properties[0];
        assert(settingProp);
        expect(settingProp.name).toBe('setting');
        expect(settingProp.annotations.length).toBe(1);
        expect(settingProp.annotations[0]?.name).toBe('JvmField');
        expect(settingProp.initializer).toContain('lazy');

        const oldProp = configClass.properties[1];
        assert(oldProp);
        expect(oldProp.name).toBe('oldProperty');
        expect(oldProp.annotations.length).toBe(1);
        expect(oldProp.annotations[0]?.name).toBe('Deprecated');
        expect(oldProp.initializer).toContain('Delegates.notNull()');
    });

    it('parse inline and reified functions - 解析内联和实化函数', () => {
        const inlineCode = `
inline fun <reified T> printType() {
    println(T::class.java.simpleName)
}

@Suppress("INVISIBLE_MEMBER")
inline fun <T> locked(lock: Lock, action: () -> T): T {
    lock.lock()
    try {
        return action()
    } finally {
        lock.unlock()
    }
}
        `;

        const result = parseKotlin(inlineCode);

        expect(result.functions.length).toBe(2);

        const printTypeFunc = result.functions[0];
        assert(printTypeFunc);
        expect(printTypeFunc.name).toBe('printType');
        expect(printTypeFunc.receiverType).toBeUndefined();
        expect(printTypeFunc.modifiers).toContain('inline');
        expect(printTypeFunc.typeParameters.length).toBe(1);
        assert(printTypeFunc.typeParameters[0]);
        expect(printTypeFunc.typeParameters[0].name).toBe('T');
        expect(printTypeFunc.typeParameters[0].reified).toBe(true);

        const lockedFunc = result.functions[1];
        assert(lockedFunc);
        expect(lockedFunc.name).toBe('locked');
        expect(lockedFunc.returnType).toBeDefined();
        assert(lockedFunc.returnType);
        expect(lockedFunc.returnType.raw).toBe('T');
        expect(lockedFunc.returnType.name).toBe('T');
        expect(lockedFunc.modifiers).toContain('inline');
        expect(lockedFunc.annotations.length).toBe(1);
        assert(lockedFunc.annotations[0]);
        expect(lockedFunc.annotations[0].raw).toBe('@Suppress("INVISIBLE_MEMBER")');
        expect(lockedFunc.annotations[0].name).toBe('Suppress');
    });
});
