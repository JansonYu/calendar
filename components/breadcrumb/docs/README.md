# Breadcrumb 组件

---

## demo

`npm run demo -- --component="Breadcrumb"`

## 样式

![](http://172.16.117.224/fe/sunl-ui/raw/master/material/breadcrumb-dmo.png)

## API

属性 | 说明 | 类型 | 可选值 | 默认值 | 前置条件 | 备注
-----|-----|-----|------|-----|------|------
separator | 分隔符样式 | string/ReactNode | -- | `>` | -- | --

## 示例

#### 默认
```
<Breadcrumb separator="-">
    <Breadcrumb.Item>
        一中
    </Breadcrumb.Item>
    <Breadcrumb.Item>
        二班
    </Breadcrumb.Item>
    <Breadcrumb.Item>
        三组
    </Breadcrumb.Item>
</Breadcrumb>
```
#### 自定义分隔符
```
<Breadcrumb separator="-">
    <Breadcrumb.Item>
        一中
    </Breadcrumb.Item>
    <Breadcrumb.Item>
        二班
    </Breadcrumb.Item>
    <Breadcrumb.Item>
        三组
    </Breadcrumb.Item>
</Breadcrumb>
```
#### 自带链接
```
<Breadcrumb>
    <Breadcrumb.Item>
        <a href="http://www.baidu.com">一中</a>

    </Breadcrumb.Item>
    <Breadcrumb.Item>
        <a href="http://www.baidu.com">二班</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
        三组
    </Breadcrumb.Item>
</Breadcrumb>
```
