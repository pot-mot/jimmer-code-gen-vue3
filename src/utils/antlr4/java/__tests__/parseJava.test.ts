import {assert, describe, expect, it} from 'vitest';
import {parseJava} from '../parseJava.js';

describe('parseJava', () => {
    it('parseClass - 解析普通类', () => {
        const classCode = `
import java.util.List;
import java.util.ArrayList;

/**
 * 测试类说明
 * @author test
 */
public class TestClass<T extends Object & Comparable<T>, U> extends Object implements Runnable {
    /**
     * x 字段注释
     */
    private int x = 10;
    
    // name 字段注释
    protected String name;
    
    /**
     * method1 方法注释
     */
    public void method1() {
        int x = 10;
    }
    
    // method2 方法注释
    private <K, V extends Number> String method2(
        // 整型参数
        int aParam,
        // 字符串数组参数 
        String[] b
    ) {
        return "hello";
    }
}
      `;

        const result = parseJava(classCode);

        expect(result.imports.length).toBe(2);
        expect(result.classes.length).toBe(1);
        const cls = result.classes[0];
        assert(cls);
        expect(cls.name).toBe('TestClass');
        expect(cls.modifiers).toContain('public');
        expect(cls.superClass).toBe('Object');
        expect(cls.interfaces).toContain('Runnable');
        expect(cls.fields.length).toBe(2);
        expect(cls.methods.length).toBe(2);

        // 验证方法注释和注解
        assert(cls.methods[0]);
        expect(cls.methods[0].name).toBe('method1');
        expect(cls.methods[0].comments.length).toBe(1);
        expect(cls.methods[0].annotations).toStrictEqual([]);
        assert(cls.methods[1]);
        expect(cls.methods[1].name).toBe('method2');
        expect(cls.methods[1].comments.length).toBe(1);
        expect(cls.methods[1].annotations).toStrictEqual([]);

        // 验证类泛型参数
        expect(cls.typeParameters).toBeDefined();
        assert(cls.typeParameters);
        expect(cls.typeParameters.length).toBe(2);
        assert(cls.typeParameters[0]);
        expect(cls.typeParameters[0].typeName).toBe('T');
        expect(cls.typeParameters[0].modifiers).toStrictEqual([]);
        expect(cls.typeParameters[0].annotations).toStrictEqual([]);
        assert(cls.typeParameters[0].bound);
        expect(cls.typeParameters[0].bound.raw).toBe('extends Object & Comparable<T>');
        expect(cls.typeParameters[0].bound.typeName).toBe('Object');
        expect(cls.typeParameters[0].bound.typeArguments).toStrictEqual([]);
        assert(cls.typeParameters[0].bound.additionalBounds?.[0]);
        expect(cls.typeParameters[0].bound.additionalBounds[0].raw).toBe('& Comparable<T>');
        expect(cls.typeParameters[0].bound.additionalBounds[0].typeName).toBe('Comparable');
        assert(cls.typeParameters[0].bound.additionalBounds[0].typeArguments?.[0]);
        expect(cls.typeParameters[0].bound.additionalBounds[0].typeArguments[0].raw).toBe('T');
        assert(cls.typeParameters[1]);
        expect(cls.typeParameters[1].typeName).toBe('U');
        expect(cls.typeParameters[1].modifiers).toStrictEqual([]);
        expect(cls.typeParameters[1].annotations).toStrictEqual([]);
        expect(cls.typeParameters[1].bound).toBeUndefined();

        const method2 = cls.methods[1];
        assert(method2);

        // 验证方法参数
        expect(method2.parameters.length).toBe(2);
        assert(method2.parameters[0]);
        expect(method2.parameters[0].name).toBe('aParam');
        expect(method2.parameters[0].type.name).toBe('int');
        expect(method2.parameters[0].annotations).toStrictEqual([]);
        expect(method2.parameters[0].comments).toStrictEqual(['// 整型参数']);
        assert(method2.parameters[1]);
        expect(method2.parameters[1].name).toBe('b');
        expect(method2.parameters[1].type).toStrictEqual({
            raw: 'String[]',
            name: 'String',
            isArray: true,
            arrayDimensions: 1,
            typeArguments: [],
        });
        expect(method2.parameters[1].annotations).toStrictEqual([]);
        expect(method2.parameters[1].comments).toStrictEqual(['// 字符串数组参数 ']);

        // 验证方法返回值
        expect(method2.returnType).toStrictEqual({
            name: 'String',
            raw: 'String',
            isArray: false,
            typeArguments: [],
        });

        // 验证方法泛型参数
        assert(method2.typeParameters);
        expect(method2.typeParameters).toBeDefined();
        expect(method2.typeParameters.length).toBe(2);
        assert(method2.typeParameters[0]);
        expect(method2.typeParameters[0].typeName).toBe('K');
        expect(method2.typeParameters[0].modifiers).toStrictEqual([]);
        expect(method2.typeParameters[0].annotations).toStrictEqual([]);
        expect(method2.typeParameters[0].bound).toBeUndefined();
        assert(method2.typeParameters[1]);
        expect(method2.typeParameters[1].typeName).toBe('V');
        expect(method2.typeParameters[1].modifiers).toStrictEqual([]);
        expect(method2.typeParameters[1].annotations).toStrictEqual([]);
        assert(method2.typeParameters[1].bound);
        expect(method2.typeParameters[1].bound.typeName).toBe('Number');
    });

    it('parse interface with multiple inheritance - 解析接口多重继承', () => {
        const interfaceCode = `
package com.example;

import java.io.Serializable;
import java.util.Comparable;

public interface MyInterface<T extends Serializable & Comparable<T>> 
    extends Serializable, Cloneable {
    
    int CONSTANT = 10;
    String NAME = "test";
    
    void doSomething();
    
    <U> U getData(Class<U> clazz);
    
    default void defaultMethod() {
        System.out.println("default");
    }
    
    static void staticMethod() {
        System.out.println("static");
    }
}
        `;

        const result = parseJava(interfaceCode);

        expect(result.packageName).toBe('com.example');
        expect(result.imports.length).toBe(2);
        expect(result.interfaces.length).toBe(1);

        const interface0 = result.interfaces[0];
        assert(interface0);
        expect(interface0.name).toBe('MyInterface');
        expect(interface0.modifiers).toContain('public');
        expect(interface0.interfaces).toContain('Serializable');
        expect(interface0.interfaces).toContain('Cloneable');

        // 验证接口泛型参数
        expect(interface0.typeParameters).toBeDefined();
        assert(interface0.typeParameters);
        expect(interface0.typeParameters.length).toBe(1);
        assert(interface0.typeParameters[0]);
        expect(interface0.typeParameters[0].typeName).toBe('T');
        expect(interface0.typeParameters[0].modifiers).toStrictEqual([]);
        expect(interface0.typeParameters[0].annotations).toStrictEqual([]);
        assert(interface0.typeParameters[0].bound);
        expect(interface0.typeParameters[0].bound.typeName).toBe('Serializable');
        assert(interface0.typeParameters[0].bound.additionalBounds?.[0]);
        expect(interface0.typeParameters[0].bound.additionalBounds[0].raw).toBe('& Comparable<T>');
        expect(interface0.typeParameters[0].bound.additionalBounds[0].typeName).toBe('Comparable');
        assert(interface0.typeParameters[0].bound.additionalBounds[0].typeArguments?.[0]);
        expect(interface0.typeParameters[0].bound.additionalBounds[0].typeArguments[0].raw).toBe(
            'T',
        );

        // 验证字段 (常量)
        expect(interface0.fields.length).toBe(2);
        assert(interface0.fields[0]);
        expect(interface0.fields[0].name).toBe('CONSTANT');
        expect(interface0.fields[0].type.name).toBe('int');
        expect(interface0.fields[0].modifiers).toStrictEqual([]);
        expect(interface0.fields[0].annotations).toStrictEqual([]);
        expect(interface0.fields[0].comments).toStrictEqual([]);
        assert(interface0.fields[1]);
        expect(interface0.fields[1].name).toBe('NAME');
        expect(interface0.fields[1].type.name).toBe('String');
        expect(interface0.fields[1].modifiers).toStrictEqual([]);
        expect(interface0.fields[1].annotations).toStrictEqual([]);
        expect(interface0.fields[1].comments).toStrictEqual([]);

        // 验证方法
        expect(interface0.methods.length).toBe(4);
        assert(interface0.methods[0]);
        expect(interface0.methods[0].name).toBe('doSomething');
        expect(interface0.methods[0].returnType).toBe('void');
        expect(interface0.methods[0].comments).toStrictEqual([]);
        expect(interface0.methods[0].annotations).toStrictEqual([]);

        const genericMethod = interface0.methods[1];
        assert(genericMethod);
        expect(genericMethod.name).toBe('getData');
        expect(genericMethod.comments).toStrictEqual([]);
        expect(genericMethod.annotations).toStrictEqual([]);
        expect(genericMethod.typeParameters?.length).toBe(1);
        assert(genericMethod.typeParameters?.[0]);
        expect(genericMethod.typeParameters[0].typeName).toBe('U');
        expect(genericMethod.parameters.length).toBe(1);
        assert(genericMethod.parameters[0]);
        expect(genericMethod.parameters[0].name).toBe('clazz');
        expect(genericMethod.parameters[0].type.name).toBe('Class');
        expect(genericMethod.parameters[0].type.typeArguments?.length).toBe(1);
        expect(genericMethod.parameters[0].annotations).toStrictEqual([]);
        expect(genericMethod.parameters[0].comments).toStrictEqual([]);

        // 验证 default 和 static 方法
        assert(interface0.methods[2]);
        expect(interface0.methods[2].name).toBe('defaultMethod');
        expect(interface0.methods[2].modifiers).toContain('default');
        assert(interface0.methods[3]);
        expect(interface0.methods[3].name).toBe('staticMethod');
        expect(interface0.methods[3].modifiers).toContain('static');
    });

    it('parse enum with body declarations - 解析枚举体声明', () => {
        const enumCode = `
import java.util.Arrays;

/**
 * 星期枚举
 */
public enum DayOfWeek {
    /**
     * 周一
     */
    MONDAY("周一"),
    /**
     * 周二
     */
    TUESDAY("周二"),
    /**
     * 周三 (带匿名类)
     */
    WEDNESDAY("周三") {
        @Override
        public boolean isWeekend() {
            return false;
        }
    };
    
    /**
     * 中文字段
     */
    private final String chineseName;
    
    /**
     * 构造方法注释
     */
    DayOfWeek(String chineseName) {
        this.chineseName = chineseName;
    }
    
    /**
     * 获取中文名称
     */
    public String getChineseName() {
        return chineseName;
    }
    
    // 判断是否是周末
    public boolean isWeekend() {
        return this == SATURDAY || this == SUNDAY;
    }
    
    /**
     * 从值创建枚举
     */
    public static DayOfWeek fromValue(int value) {
        return values()[value - 1];
    }
}
        `;

        const result = parseJava(enumCode);

        expect(result.imports.length).toBe(1);
        expect(result.enums.length).toBe(1);

        const enumType = result.enums[0];
        assert(enumType);
        expect(enumType.name).toBe('DayOfWeek');
        expect(enumType.modifiers).toContain('public');

        // 验证枚举项
        expect(enumType.enumItems.length).toBe(3);
        assert(enumType.enumItems[0]);
        expect(enumType.enumItems[0].name).toBe('MONDAY');
        expect(enumType.enumItems[0].arguments).toStrictEqual(['"周一"']);
        expect(enumType.enumItems[0].modifiers).toStrictEqual([]);
        expect(enumType.enumItems[0].annotations).toStrictEqual([]);
        expect(enumType.enumItems[0].comments.length).toBe(1);
        assert(enumType.enumItems[1]);
        expect(enumType.enumItems[1].name).toBe('TUESDAY');
        expect(enumType.enumItems[1].arguments).toStrictEqual(['"周二"']);
        expect(enumType.enumItems[1].modifiers).toStrictEqual([]);
        expect(enumType.enumItems[1].annotations).toStrictEqual([]);
        expect(enumType.enumItems[1].comments.length).toBe(1);
        assert(enumType.enumItems[2]);
        expect(enumType.enumItems[2].name).toBe('WEDNESDAY');
        expect(enumType.enumItems[2].arguments).toStrictEqual(['"周三"']);
        expect(enumType.enumItems[2].modifiers).toStrictEqual([]);
        expect(enumType.enumItems[2].annotations).toStrictEqual([]);
        expect(enumType.enumItems[2].comments.length).toBe(1);

        // 验证字段
        expect(enumType.fields.length).toBe(1);
        assert(enumType.fields[0]);
        expect(enumType.fields[0].name).toBe('chineseName');
        expect(enumType.fields[0].type.name).toBe('String');
        expect(enumType.fields[0].modifiers).toContain('private');
        expect(enumType.fields[0].modifiers).toContain('final');
        expect(enumType.fields[0].annotations).toStrictEqual([]);
        expect(enumType.fields[0].comments.length).toBe(1);

        // 验证构造方法
        expect(enumType.constructors.length).toBe(1);
        const constructor = enumType.constructors[0];
        assert(constructor);
        expect(constructor.name).toBe('DayOfWeek');
        expect(constructor.comments.length).toBe(1);
        expect(constructor.annotations).toStrictEqual([]);
        expect(constructor.parameters.length).toBe(1);
        assert(constructor.parameters[0]);
        expect(constructor.parameters[0].name).toBe('chineseName');
        expect(constructor.parameters[0].type.name).toBe('String');
        expect(constructor.parameters[0].annotations).toStrictEqual([]);
        expect(constructor.parameters[0].comments).toStrictEqual([]);

        // 验证方法
        expect(enumType.methods.length).toBe(3);
        expect(enumType.methods.some((m) => m.name === 'getChineseName')).toBe(true);
        expect(enumType.methods.some((m) => m.name === 'isWeekend')).toBe(true);
        expect(enumType.methods.some((m) => m.name === 'fromValue')).toBe(true);
        const staticMethod = enumType.methods.find((m) => m.name === 'fromValue');
        assert(staticMethod);
        expect(staticMethod.modifiers).toContain('static');
        expect(staticMethod.comments.length).toBe(1);
        expect(staticMethod.annotations).toStrictEqual([]);
    });

    it('parse record with compact constructor - 解析记录紧凑构造器', () => {
        const recordCode = `
import java.util.Objects;

/**
 * 人员记录
 */
public record Person(
    /**
     * 姓名
     */
    String name,
    /**
     * 年龄
     */
    int age,
    // 爱好
    String... hobbies
) implements Serializable {
    
    /**
     * 紧凑构造器
     */
    public Person {
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative");
        }
    }
    
    // 问候方法
    public String greeting() {
        return "Hello, I'm " + name;
    }
}
        `;

        const result = parseJava(recordCode);

        expect(result.imports.length).toBe(1);
        expect(result.records.length).toBe(1);

        const record = result.records[0];
        assert(record);
        expect(record.name).toBe('Person');
        expect(record.modifiers).toContain('public');
        expect(record.interfaces).toContain('Serializable');

        // 验证记录组件
        expect(record.recordComponents.length).toBe(3);
        assert(record.recordComponents[0]);
        expect(record.recordComponents[0].name).toBe('name');
        expect(record.recordComponents[0].type.name).toBe('String');
        expect(record.recordComponents[0].modifiers).toStrictEqual([]);
        expect(record.recordComponents[0].annotations).toStrictEqual([]);
        expect(record.recordComponents[0].comments.length).toBe(1);
        assert(record.recordComponents[1]);
        expect(record.recordComponents[1].name).toBe('age');
        expect(record.recordComponents[1].type.name).toBe('int');
        expect(record.recordComponents[1].modifiers).toStrictEqual([]);
        expect(record.recordComponents[1].annotations).toStrictEqual([]);
        expect(record.recordComponents[1].comments.length).toBe(1);
        assert(record.recordComponents[2]);
        expect(record.recordComponents[2].name).toBe('hobbies');
        expect(record.recordComponents[2].type.name).toBe('String');
        expect(record.recordComponents[2].isVarArgs).toBe(true);
        expect(record.recordComponents[2].type.isArray).toBe(false);
        expect(record.recordComponents[2].modifiers).toStrictEqual([]);
        expect(record.recordComponents[2].annotations).toStrictEqual([]);
        expect(record.recordComponents[2].comments.length).toBe(1);

        // 验证字段 (包含记录组件和声明的字段)
        expect(record.fields.length).toBeGreaterThanOrEqual(3);

        // 验证方法
        expect(record.methods.length).toBe(1);
        assert(record.methods[0]);
        expect(record.methods[0].name).toBe('greeting');
        expect(record.methods[0].comments.length).toBe(1);
        expect(record.methods[0].annotations).toStrictEqual([]);

        // 验证构造方法
        expect(record.constructors.length).toBe(1);
        const recordConstructor = record.constructors[0];
        assert(recordConstructor);
        expect(recordConstructor.name).toBe('Person');
        expect(recordConstructor.comments.length).toBe(1);
        expect(recordConstructor.annotations).toStrictEqual([]);
    });

    it('parse annotation interface - 解析注解接口', () => {
        const annotationCode = `
package com.example;

import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface MyAnnotation {
    String value();
    int count() default 0;
    String[] tags() default {};
}
        `;

        const result = parseJava(annotationCode);

        expect(result.packageName).toBe('com.example');
        expect(result.imports.length).toBe(1);
        expect(result.annotationInterfaces.length).toBe(1);

        const annotationInterface = result.annotationInterfaces[0];
        assert(annotationInterface);
        expect(annotationInterface.name).toBe('MyAnnotation');
        expect(annotationInterface.modifiers).toContain('public');

        // 验证注解属性
        expect(annotationInterface.fields.length).toBe(3);
        assert(annotationInterface.fields[0]);
        expect(annotationInterface.fields[0].name).toBe('value');
        expect(annotationInterface.fields[0].comments).toStrictEqual([]);
        expect(annotationInterface.fields[0].modifiers).toStrictEqual([]);
        expect(annotationInterface.fields[0].annotations).toStrictEqual([]);
        assert(annotationInterface.fields[1]);
        expect(annotationInterface.fields[1].name).toBe('count');
        expect(annotationInterface.fields[1].comments).toStrictEqual([]);
        expect(annotationInterface.fields[1].modifiers).toStrictEqual([]);
        expect(annotationInterface.fields[1].annotations).toStrictEqual([]);
        assert(annotationInterface.fields[2]);
        expect(annotationInterface.fields[2].name).toBe('tags');
        expect(annotationInterface.fields[2].comments).toStrictEqual([]);
        expect(annotationInterface.fields[2].modifiers).toStrictEqual([]);
        expect(annotationInterface.fields[2].annotations).toStrictEqual([]);
    });

    it('parse complex type annotations and generics - 解析复杂类型注解和泛型', () => {
        const complexCode = `
import java.util.*;
import java.util.stream.Collectors;

public class GenericExample<T extends Comparable<? super T>> {
    private List<Map<String, ? extends Number>> data;
    private Map<Integer, List<T>> cache;
    
    public <R extends Object> R convert(Function<T, R> mapper) {
        return null;
    }
    
    public void process(List<? super T> input, Map<String, ?> config) {
    }
    
    public Optional<T> findFirst(Predicate<T> predicate) {
        return Optional.empty();
    }
}
        `;

        const result = parseJava(complexCode);

        expect(result.classes.length).toBe(1);
        const cls = result.classes[0];
        assert(cls);

        // 验证类泛型边界中的通配符
        expect(cls.typeParameters?.length).toBe(1);
        assert(cls.typeParameters?.[0]);
        expect(cls.typeParameters[0].typeName).toBe('T');
        assert(cls.typeParameters[0].bound);
        expect(cls.typeParameters[0].bound.typeName).toBe('Comparable');
        expect(cls.typeParameters[0].bound.additionalBounds?.length).toBe(0);

        // 验证字段复杂类型
        expect(cls.fields.length).toBe(2);
        const dataField = cls.fields[0];
        assert(dataField);
        expect(dataField.name).toBe('data');
        expect(dataField.type.name).toBe('List');
        expect(dataField.type.typeArguments?.length).toBe(1);
        expect(dataField.modifiers).toContain('private');
        expect(dataField.annotations).toStrictEqual([]);
        expect(dataField.comments).toStrictEqual([]);

        // 验证方法泛型和参数
        const convertMethod = cls.methods[0];
        assert(convertMethod);
        expect(convertMethod.name).toBe('convert');
        expect(convertMethod.comments).toStrictEqual([]);
        expect(convertMethod.annotations).toStrictEqual([]);
        expect(convertMethod.typeParameters?.length).toBe(1);
        assert(convertMethod.typeParameters[0]);
        expect(convertMethod.typeParameters[0].typeName).toBe('R');
        expect(convertMethod.typeParameters[0].modifiers).toStrictEqual([]);
        expect(convertMethod.typeParameters[0].annotations).toStrictEqual([]);
        expect(convertMethod.parameters.length).toBe(1);
        assert(convertMethod.parameters[0]);
        expect(convertMethod.parameters[0].type.name).toBe('Function');
        expect(convertMethod.parameters[0].annotations).toStrictEqual([]);
        expect(convertMethod.parameters[0].comments).toStrictEqual([]);

        // 验证通配符参数
        const processMethod = cls.methods[1];
        assert(processMethod);
        expect(processMethod.name).toBe('process');
        expect(processMethod.comments).toStrictEqual([]);
        expect(processMethod.annotations).toStrictEqual([]);
        expect(processMethod.parameters.length).toBe(2);
        assert(processMethod.parameters[0]);
        expect(processMethod.parameters[0].type.name).toBe('List');
        expect(processMethod.parameters[0].annotations).toStrictEqual([]);
        expect(processMethod.parameters[0].comments).toStrictEqual([]);
        assert(processMethod.parameters[1]);
        expect(processMethod.parameters[1].type.name).toBe('Map');
        expect(processMethod.parameters[1].annotations).toStrictEqual([]);
        expect(processMethod.parameters[1].comments).toStrictEqual([]);
    });

    it('parse nested classes and interfaces - 解析嵌套类和接口', () => {
        const nestedCode = `
public class OuterClass {
    private int outerField;
    
    public static class StaticNestedClass {
        private static int nestedStaticField;
        public void nestedMethod() {}
    }
    
    public class InnerClass {
        private String innerField;
        
        public class DeepInnerClass {
            public void deepMethod() {}
        }
    }
    
    interface NestedInterface {
        void interfaceMethod();
    }
}
        `;

        const result = parseJava(nestedCode);

        expect(result.classes.length).toBe(1);
        const outerClass = result.classes[0];
        assert(outerClass);
        expect(outerClass.name).toBe('OuterClass');

        // 验证内部类
        expect(outerClass.inner.classes.length).toBe(2);
        expect(outerClass.inner.interfaces.length).toBe(1);

        const staticNested = outerClass.inner.classes[0];
        assert(staticNested);
        expect(staticNested.name).toBe('StaticNestedClass');
        expect(staticNested.modifiers).toContain('static');
        expect(staticNested.comments).toStrictEqual([]);
        expect(staticNested.annotations).toStrictEqual([]);

        const innerClass = outerClass.inner.classes[1];
        assert(innerClass);
        expect(innerClass.name).toBe('InnerClass');
        expect(innerClass.comments).toStrictEqual([]);
        expect(innerClass.annotations).toStrictEqual([]);

        // 验证深层内部类
        expect(innerClass.inner.classes.length).toBe(1);
        const deepInner = innerClass.inner.classes[0];
        assert(deepInner);
        expect(deepInner.name).toBe('DeepInnerClass');
        expect(deepInner.comments).toStrictEqual([]);
        expect(deepInner.annotations).toStrictEqual([]);

        const nestedInterface = outerClass.inner.interfaces[0];
        assert(nestedInterface);
        expect(nestedInterface.name).toBe('NestedInterface');
        expect(nestedInterface.comments).toStrictEqual([]);
        expect(nestedInterface.annotations).toStrictEqual([]);
    });

    it('parse varargs and array parameters - 解析可变参数和数组参数', () => {
        const varargsCode = `
public class VarArgsExample {
    public void method1(String... args) {}
    
    public void method2(int first, String... rest) {}
    
    public void method3(int[][] matrix) {}
    
    public void method4(List<String>... lists) {}
}
        `;

        const result = parseJava(varargsCode);

        expect(result.classes.length).toBe(1);
        const cls = result.classes[0];
        assert(cls);
        expect(cls.methods.length).toBe(4);

        const method1 = cls.methods[0];
        assert(method1);
        assert(method1.parameters[0]);
        expect(method1.parameters[0].isVarArgs).toBe(true);
        expect(method1.parameters[0].type.name).toBe('String');
        expect(method1.parameters[0].type.isArray).toBe(false);
        expect(method1.parameters[0].annotations).toStrictEqual([]);
        expect(method1.parameters[0].comments).toStrictEqual([]);
        expect(method1.comments).toStrictEqual([]);
        expect(method1.annotations).toStrictEqual([]);

        const method2 = cls.methods[1];
        assert(method2);
        assert(method2.parameters[1]);
        expect(method2.parameters[1].isVarArgs).toBe(true);
        expect(method2.parameters[1].type.isArray).toBe(false);
        expect(method2.parameters[1].annotations).toStrictEqual([]);
        expect(method2.parameters[1].comments).toStrictEqual([]);
        expect(method2.comments).toStrictEqual([]);
        expect(method2.annotations).toStrictEqual([]);

        const method3 = cls.methods[2];
        assert(method3);
        assert(method3.parameters[0]);
        expect(method3.parameters[0].type.isArray).toBe(true);
        expect(method3.parameters[0].type.arrayDimensions).toBe(2);
        expect(method3.parameters[0].annotations).toStrictEqual([]);
        expect(method3.parameters[0].comments).toStrictEqual([]);
        expect(method3.comments).toStrictEqual([]);
        expect(method3.annotations).toStrictEqual([]);

        const method4 = cls.methods[3];
        assert(method4);
        assert(method4.parameters[0]);
        expect(method4.parameters[0].isVarArgs).toBe(true);
        expect(method4.parameters[0].type.name).toBe('List');
        expect(method4.parameters[0].annotations).toStrictEqual([]);
        expect(method4.parameters[0].comments).toStrictEqual([]);
        expect(method4.comments).toStrictEqual([]);
        expect(method4.annotations).toStrictEqual([]);
    });

    it('parse throws clause - 解析 throws 子句', () => {
        const throwsCode = `
import java.io.*;

public class ExceptionExample {
    public void readFile(String path) throws IOException, FileNotFoundException {
    }
    
    public <T> T create() throws Exception {
        return null;
    }
    
    public void multiCatch(int x) throws ArithmeticException, IndexOutOfBoundsException {
    }
}
        `;

        const result = parseJava(throwsCode);

        expect(result.classes.length).toBe(1);
        const cls = result.classes[0];
        assert(cls);
        expect(cls.methods.length).toBe(3);

        const method1 = cls.methods[0];
        assert(method1?.throws);
        expect(method1.throws.length).toBe(2);
        assert(method1.throws[0]);
        expect(method1.throws[0].name).toBe('IOException');
        assert(method1.throws[1]);
        expect(method1.throws[1].name).toBe('FileNotFoundException');
        expect(method1.comments).toStrictEqual([]);
        expect(method1.annotations).toStrictEqual([]);

        const method2 = cls.methods[1];
        assert(method2?.throws);
        expect(method2.throws.length).toBe(1);
        assert(method2.throws[0]);
        expect(method2.throws[0].name).toBe('Exception');
        expect(method2.comments).toStrictEqual([]);
        expect(method2.annotations).toStrictEqual([]);

        const method3 = cls.methods[2];
        assert(method3?.throws);
        expect(method3.throws.length).toBe(2);
        assert(method3.throws[0]);
        expect(method3.throws[0].name).toBe('ArithmeticException');
        assert(method3.throws[1]);
        expect(method3.throws[1].name).toBe('IndexOutOfBoundsException');
        expect(method3.comments).toStrictEqual([]);
        expect(method3.annotations).toStrictEqual([]);
    });

    it('parse empty file and edge cases - 解析空文件和边界情况', () => {
        const emptyResult = parseJava('');
        expect(emptyResult.packageName).toBe('');
        expect(emptyResult.imports.length).toBe(0);
        expect(emptyResult.classes.length).toBe(0);
        expect(emptyResult.interfaces.length).toBe(0);
        expect(emptyResult.enums.length).toBe(0);
        expect(emptyResult.records.length).toBe(0);
        expect(emptyResult.annotationInterfaces.length).toBe(0);

        const onlyPackageCode = 'package com.example.test;';
        const packageResult = parseJava(onlyPackageCode);
        expect(packageResult.packageName).toBe('com.example.test');
        expect(packageResult.classes.length).toBe(0);

        const onlyImportsCode = `
import java.util.*;
import java.io.*;
import static java.lang.Math.PI;
        `;
        const importsResult = parseJava(onlyImportsCode);
        expect(importsResult.imports.length).toBe(3);
        expect(importsResult.imports.some((i) => i.isStatic)).toBe(true);
    });

    it('parse annotations with parameters - 解析带参数的注解', () => {
        const annotationCode = `
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("userService")
public class AnnotatedClass {
    @Autowired
    private UserRepository repository;
    
    @Deprecated
    @SuppressWarnings({"unchecked"})
    public void oldMethod(@NotNull String param) {
    }
    
    @Override
    public String toString() {
        return "";
    }
}
        `;

        const result = parseJava(annotationCode);

        expect(result.classes.length).toBe(1);
        const cls = result.classes[0];
        assert(cls);

        // 验证类注解
        expect(cls.annotations.length).toBe(1);
        assert(cls.annotations[0]);
        expect(cls.annotations[0].name).toBe('Service');
        assert(cls.annotations[0].parameters?.[0]);
        expect(cls.annotations[0].parameters[0].name).toBe('value');
        expect(cls.annotations[0].parameters[0].rawValue).toBe('"userService"');
        expect(cls.comments).toStrictEqual([]);

        // 验证字段注解
        expect(cls.fields.length).toBe(1);
        assert(cls.fields[0]);
        expect(cls.fields[0].name).toBe('repository');
        expect(cls.fields[0].annotations.length).toBe(1);
        assert(cls.fields[0].annotations[0]);
        expect(cls.fields[0].annotations[0].name).toBe('Autowired');
        expect(cls.fields[0].comments).toStrictEqual([]);

        // 验证方法注解
        const oldMethod = cls.methods.find((m) => m.name === 'oldMethod');
        assert(oldMethod);
        expect(oldMethod.name).toBe('oldMethod');
        expect(oldMethod.comments).toStrictEqual([]);
        expect(oldMethod.annotations.some((a) => a.name === 'Deprecated')).toBe(true);
        expect(oldMethod.annotations.some((a) => a.name === 'SuppressWarnings')).toBe(true);

        // 验证参数注解
        assert(oldMethod.parameters[0]);
        expect(oldMethod.parameters[0].name).toBe('param');
        expect(oldMethod.parameters[0].annotations.length).toBe(1);
        assert(oldMethod.parameters[0].annotations[0]);
        expect(oldMethod.parameters[0].annotations[0]?.name).toBe('NotNull');
        expect(oldMethod.parameters[0].comments).toStrictEqual([]);
    });

    it('parse multiple comments for fields - 解析字段的多个注释', () => {
        const multiCommentCode = `
public class MultiCommentClass {
    /**
     * 第一行注释
     * 第二行注释
     */
    private int field1;
    
    // 单行注释 1
    // 单行注释 2
    protected String field2;
    
    /** Javadoc 风格 */
    /* C 风格注释 */
    // 单行注释
    public double field3;
}
        `;

        const result = parseJava(multiCommentCode);

        expect(result.classes.length).toBe(1);
        const cls = result.classes[0];
        assert(cls);
        expect(cls.fields.length).toBe(3);

        // 验证多行 Javadoc 注释
        assert(cls.fields[0]);
        expect(cls.fields[0].name).toBe('field1');
        expect(cls.fields[0].comments.length).toBe(1);
        expect(cls.fields[0].comments.some((c) => c.includes('第一行注释'))).toBe(true);
        expect(cls.fields[0].comments.some((c) => c.includes('第二行注释'))).toBe(true);

        // 验证多个单行注释
        assert(cls.fields[1]);
        expect(cls.fields[1].name).toBe('field2');
        expect(cls.fields[1].comments.length).toBe(2);
        expect(cls.fields[1].comments.some((c) => c.includes('单行注释 1'))).toBe(true);
        expect(cls.fields[1].comments.some((c) => c.includes('单行注释 2'))).toBe(true);

        // 验证混合注释类型
        assert(cls.fields[2]);
        expect(cls.fields[2].name).toBe('field3');
        expect(cls.fields[2].comments.length).toBe(3);
        expect(cls.fields[2].comments.some((c) => c.includes('Javadoc 风格'))).toBe(true);
        expect(cls.fields[2].comments.some((c) => c.includes('C 风格注释'))).toBe(true);
        expect(cls.fields[2].comments.some((c) => c.includes('单行注释'))).toBe(true);
    });

    it('parse comments for methods with different styles - 解析不同风格的方法注释', () => {
        const methodCommentCode = `
public class MethodCommentClass {
    /**
     * 方法 1 的详细说明
     * @return 返回值说明
     */
    public int method1() {
        return 1;
    }
    
    // 方法 2 的单行注释
    private void method2() {}
    
    /* 方法 3 的块级注释 */
    protected String method3() {
        return "test";
    }
}
        `;

        const result = parseJava(methodCommentCode);

        expect(result.classes.length).toBe(1);
        const cls = result.classes[0];
        assert(cls);
        expect(cls.methods.length).toBe(3);

        // 验证方法 1 的多行注释
        assert(cls.methods[0]);
        expect(cls.methods[0].name).toBe('method1');
        expect(cls.methods[0].comments.length).toBe(1);
        expect(cls.methods[0].comments.some((c) => c.includes('方法 1 的详细说明'))).toBe(true);

        // 验证方法 2 的单行注释
        assert(cls.methods[1]);
        expect(cls.methods[1].name).toBe('method2');
        expect(cls.methods[1].comments.length).toBe(1);
        expect(cls.methods[1].comments.some((c) => c.includes('方法 2 的单行注释'))).toBe(true);

        // 验证方法 3 的块级注释
        assert(cls.methods[2]);
        expect(cls.methods[2].name).toBe('method3');
        expect(cls.methods[2].comments.length).toBe(1);
        expect(cls.methods[2].comments.some((c) => c.includes('方法 3 的块级注释'))).toBe(true);
    });

    it('parse comments with special characters - 解析包含特殊字符的注释', () => {
        const specialCharCode = `
public class SpecialCharCommentClass {
    /**
     * 包含特殊字符：@#$%^&*
     * 包含 HTML 标签：<b>bold</b>, <i>italic</i>
     * 包含链接：{@link OtherClass#otherMethod()}
     * 包含参数：@param x 参数说明
     */
    public void methodWithSpecialChars() {}
    
    // 包含 emoji: 😀 🎉 🚀
    public void methodWithEmoji() {}
    
    /**
     * 包含多语言：Hello 你好 Привет こんにちは
     */
    public void methodWithMultiLanguage() {}
}
        `;

        const result = parseJava(specialCharCode);

        expect(result.classes.length).toBe(1);
        const cls = result.classes[0];
        assert(cls);
        expect(cls.methods.length).toBe(3);

        // 验证特殊字符注释
        assert(cls.methods[0]);
        expect(cls.methods[0].name).toBe('methodWithSpecialChars');
        expect(cls.methods[0].comments.length).toBe(1);
        const comment0 = cls.methods[0].comments.find((c) => c.includes('特殊字符'));
        expect(comment0).toBeDefined();
        expect(comment0?.includes('@#$%^&*')).toBe(true);

        // 验证 emoji 注释
        assert(cls.methods[1]);
        expect(cls.methods[1].name).toBe('methodWithEmoji');
        expect(cls.methods[1].comments.length).toBe(1);
        expect(cls.methods[1].comments.some((c) => c.includes('😀'))).toBe(true);

        // 验证多语言注释
        assert(cls.methods[2]);
        expect(cls.methods[2].name).toBe('methodWithMultiLanguage');
        expect(cls.methods[2].comments.length).toBe(1);
        expect(cls.methods[2].comments.some((c) => c.includes('Hello'))).toBe(true);
    });

    it('parse comments for constructors - 解析构造方法的注释', () => {
        const constructorCommentCode = `
public class ConstructorCommentClass {
    /**
     * 默认构造方法
     */
    public ConstructorCommentClass() {}
    
    // 带参数的构造方法
    public ConstructorCommentClass(int x) {}
    
    /**
     * 私有构造方法
     * @param name 名称
     */
    private ConstructorCommentClass(String name) {}
}
        `;

        const result = parseJava(constructorCommentCode);

        expect(result.classes.length).toBe(1);
        const cls = result.classes[0];
        assert(cls);
        expect(cls.constructors.length).toBe(3);

        // 验证默认构造方法注释
        assert(cls.constructors[0]);
        expect(cls.constructors[0].comments.length).toBe(1);
        expect(cls.constructors[0].comments.some((c) => c.includes('默认构造方法'))).toBe(true);

        // 验证带参数构造方法注释
        assert(cls.constructors[1]);
        expect(cls.constructors[1].comments.length).toBe(1);
        expect(cls.constructors[1].comments.some((c) => c.includes('带参数的构造方法'))).toBe(true);

        // 验证私有构造方法注释
        assert(cls.constructors[2]);
        expect(cls.constructors[2].comments.length).toBe(1);
        expect(cls.constructors[2].comments.some((c) => c.includes('私有构造方法'))).toBe(true);
    });

    it('parse comments for inner classes - 解析内部类的注释', () => {
        const innerClassCommentCode = `
public class OuterClass {
    /**
     * 静态内部类
     */
    public static class StaticInnerClass {}
    
    // 成员内部类
    public class MemberInnerClass {}
    
    /* 匿名内部类将在使用时创建 */
    public void createAnonymous() {
        Runnable r = new Runnable() {
            public void run() {}
        };
    }
}
        `;

        const result = parseJava(innerClassCommentCode);

        expect(result.classes.length).toBe(1);
        const outerClass = result.classes[0];
        assert(outerClass);
        expect(outerClass.inner.classes.length).toBe(2);

        // 验证静态内部类注释
        const staticInner = outerClass.inner.classes[0];
        assert(staticInner);
        expect(staticInner.name).toBe('StaticInnerClass');
        expect(staticInner.comments.length).toBe(1);
        expect(staticInner.comments.some((c) => c.includes('静态内部类'))).toBe(true);

        // 验证成员内部类注释
        const memberInner = outerClass.inner.classes[1];
        assert(memberInner);
        expect(memberInner.name).toBe('MemberInnerClass');
        expect(memberInner.comments.length).toBe(1);
        expect(memberInner.comments.some((c) => c.includes('成员内部类'))).toBe(true);
    });

    it('parse comments for enum items - 解析枚举项的注释', () => {
        const enumItemCommentCode = `
public enum EnumWithComments {
    /**
     * 星期一
     */
    MONDAY,
    
    // 星期二
    TUESDAY,
    
    /* 星期三 */
    WEDNESDAY,
    
    /**
     * 星期四 (带参数)
     */
    THURSDAY("周四"),
}
        `;

        const result = parseJava(enumItemCommentCode);

        expect(result.enums.length).toBe(1);
        const enumType = result.enums[0];
        assert(enumType);
        expect(enumType.enumItems.length).toBe(4);

        // 验证 MONDAY 注释
        assert(enumType.enumItems[0]);
        expect(enumType.enumItems[0].name).toBe('MONDAY');
        expect(enumType.enumItems[0].comments.length).toBe(1);
        expect(enumType.enumItems[0].comments.some((c) => c.includes('星期一'))).toBe(true);

        // 验证 TUESDAY 注释
        assert(enumType.enumItems[1]);
        expect(enumType.enumItems[1].name).toBe('TUESDAY');
        expect(enumType.enumItems[1].comments.length).toBe(1);
        expect(enumType.enumItems[1].comments.some((c) => c.includes('星期二'))).toBe(true);

        // 验证 WEDNESDAY 注释
        assert(enumType.enumItems[2]);
        expect(enumType.enumItems[2].name).toBe('WEDNESDAY');
        expect(enumType.enumItems[2].comments.length).toBe(1);
        expect(enumType.enumItems[2].comments.some((c) => c.includes('星期三'))).toBe(true);

        // 验证 THURSDAY 注释
        assert(enumType.enumItems[3]);
        expect(enumType.enumItems[3].name).toBe('THURSDAY');
        expect(enumType.enumItems[3].comments.length).toBe(1);
        expect(enumType.enumItems[3].comments.some((c) => c.includes('星期四'))).toBe(true);
    });

    it('parse comments for record components - 解析记录组件的注释', () => {
        const recordComponentCommentCode = `
public record RecordWithComments(
    /**
     * 姓名组件
     */
    String name,
    
    // 年龄组件
    int age,
    
    /* 爱好组件 (可变参数) */
    String... hobbies
) {}
        `;

        const result = parseJava(recordComponentCommentCode);

        expect(result.records.length).toBe(1);
        const record = result.records[0];
        assert(record);
        expect(record.recordComponents.length).toBe(3);

        // 验证 name 组件注释
        assert(record.recordComponents[0]);
        expect(record.recordComponents[0].name).toBe('name');
        expect(record.recordComponents[0].comments.length).toBe(1);
        expect(record.recordComponents[0].comments.some((c) => c.includes('姓名组件'))).toBe(true);

        // 验证 age 组件注释
        assert(record.recordComponents[1]);
        expect(record.recordComponents[1].name).toBe('age');
        expect(record.recordComponents[1].comments.length).toBe(1);
        expect(record.recordComponents[1].comments.some((c) => c.includes('年龄组件'))).toBe(true);

        // 验证 hobbies 组件注释
        assert(record.recordComponents[2]);
        expect(record.recordComponents[2].name).toBe('hobbies');
        expect(record.recordComponents[2].comments.length).toBe(1);
        expect(record.recordComponents[2].comments.some((c) => c.includes('爱好组件'))).toBe(true);
    });

    it('parse comments for interface methods - 解析接口方法的注释', () => {
        const interfaceMethodCommentCode = `
public interface InterfaceWithComments {
    /**
     * 普通方法注释
     */
    void normalMethod();
    
    // 默认方法注释
    default void defaultMethod() {}
    
    /* 静态方法注释 */
    static void staticMethod() {}
    
    /**
     * 泛型方法注释
     */
    <T> T genericMethod(T value);
}
        `;

        const result = parseJava(interfaceMethodCommentCode);

        expect(result.interfaces.length).toBe(1);
        const interfaceType = result.interfaces[0];
        assert(interfaceType);
        expect(interfaceType.methods.length).toBe(4);

        // 验证普通方法注释
        assert(interfaceType.methods[0]);
        expect(interfaceType.methods[0].name).toBe('normalMethod');
        expect(interfaceType.methods[0].comments.length).toBe(1);
        expect(interfaceType.methods[0].comments.some((c) => c.includes('普通方法注释'))).toBe(
            true,
        );

        // 验证默认方法注释
        assert(interfaceType.methods[1]);
        expect(interfaceType.methods[1].name).toBe('defaultMethod');
        expect(interfaceType.methods[1].comments.length).toBe(1);
        expect(interfaceType.methods[1].comments.some((c) => c.includes('默认方法注释'))).toBe(
            true,
        );

        // 验证静态方法注释
        assert(interfaceType.methods[2]);
        expect(interfaceType.methods[2].name).toBe('staticMethod');
        expect(interfaceType.methods[2].comments.length).toBe(1);
        expect(interfaceType.methods[2].comments.some((c) => c.includes('静态方法注释'))).toBe(
            true,
        );

        // 验证泛型方法注释
        assert(interfaceType.methods[3]);
        expect(interfaceType.methods[3].name).toBe('genericMethod');
        expect(interfaceType.methods[3].comments.length).toBe(1);
        expect(interfaceType.methods[3].comments.some((c) => c.includes('泛型方法注释'))).toBe(
            true,
        );
    });

    it('parse comments for annotation interface elements - 解析注解接口元素的注释', () => {
        const annotationElementCommentCode = `
public @interface AnnotationWithComments {
    /**
     * value 元素注释
     */
    String value();
    
    // count 元素注释
    int count() default 0;
    
    /* tags 元素注释 */
    String[] tags() default {};
}
        `;

        const result = parseJava(annotationElementCommentCode);

        expect(result.annotationInterfaces.length).toBe(1);
        const annotationInterface = result.annotationInterfaces[0];
        assert(annotationInterface);
        expect(annotationInterface.fields.length).toBe(3);

        // 验证 value 元素注释
        assert(annotationInterface.fields[0]);
        expect(annotationInterface.fields[0].name).toBe('value');
        expect(annotationInterface.fields[0].comments.length).toBe(1);
        expect(
            annotationInterface.fields[0].comments.some((c) => c.includes('value 元素注释')),
        ).toBe(true);

        // 验证 count 元素注释
        assert(annotationInterface.fields[1]);
        expect(annotationInterface.fields[1].name).toBe('count');
        expect(annotationInterface.fields[1].comments.length).toBe(1);
        expect(
            annotationInterface.fields[1].comments.some((c) => c.includes('count 元素注释')),
        ).toBe(true);

        // 验证 tags 元素注释
        assert(annotationInterface.fields[2]);
        expect(annotationInterface.fields[2].name).toBe('tags');
        expect(annotationInterface.fields[2].comments.length).toBe(1);
        expect(
            annotationInterface.fields[2].comments.some((c) => c.includes('tags 元素注释')),
        ).toBe(true);
    });

    it('parse comments without spaces before declarations - 解析声明前无空格的注释', () => {
        const noSpaceCommentCode = `
public class NoSpaceCommentClass {
/** 紧贴类的注释 */
class TightClass{
/**字段 1*/int field1;
//字段 2
String field2;
/*字段 3*/double field3;
}
}
        `;

        const result = parseJava(noSpaceCommentCode);

        expect(result.classes.length).toBe(1);
        const outerClass = result.classes[0];
        assert(outerClass);
        expect(outerClass.inner.classes.length).toBe(1);

        const tightClass = outerClass.inner.classes[0];
        assert(tightClass);
        expect(tightClass.name).toBe('TightClass');
        expect(tightClass.fields.length).toBe(3);
        expect(tightClass.comments.some((c) => c.includes('紧贴类的注释'))).toBe(true);

        // 验证字段 1 注释
        assert(tightClass.fields[0]);
        expect(tightClass.fields[0].name).toBe('field1');
        expect(tightClass.fields[0].comments.length).toBe(1);
        expect(tightClass.fields[0].comments.some((c) => c.includes('字段 1'))).toBe(true);

        // 验证字段 2 注释
        assert(tightClass.fields[1]);
        expect(tightClass.fields[1].name).toBe('field2');
        expect(tightClass.fields[1].comments.length).toBe(1);
        expect(tightClass.fields[1].comments.some((c) => c.includes('字段 2'))).toBe(true);

        // 验证字段 3 注释
        assert(tightClass.fields[2]);
        expect(tightClass.fields[2].name).toBe('field3');
        expect(tightClass.fields[2].comments.length).toBe(1);
        expect(tightClass.fields[2].comments.some((c) => c.includes('字段 3'))).toBe(true);
    });
});
