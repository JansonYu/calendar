# Button 组件

---

## demo

`npm run demo -- --component=button`

## 样式

![](https://ww1.sinaimg.cn/large/006tNbRwly1ffvfikj9sxj312s0hmwgg.jpg)

## API

属性 | 说明 | 类型 | 可选值 | 默认值 | 前置条件 | 备注
-----|-----|-----|------|-----|------|------
type | 按钮样式 | string | `important`：重要按钮; `primary`：主要按钮;  `secondary`：次要按钮;  `ghost`：幽灵按钮;  `disabled`：失效按钮;  `ellipse`: 椭圆按钮; | `important` | -- | -- 
size | 按钮大小 | string | `big`：大尺寸 ; `normal`：中尺寸;  `small`：小尺寸; | `normal` | -- | -- 
text | 按钮文本 | string | -- | '' | -- | -- 
selected | 按钮是否被选中，适用于按钮group | boolean | `true` 或者 `false` | `false` | `type` 属性必须为 `ellipse` | -- 
onClick | 按钮点击事件 | function | -- | -- | -- | --

## 示例

```
<Button type="important" text="重要按钮" size="big"/>
<Button type="primary" text="主要按钮" size="normal"/>
<Button type="secondary" text="次要按钮" size="small"/>
<Button type="ellipse" text="未选中"/>
<Button type="ellipse" text="选中" selected={true}/>
```


