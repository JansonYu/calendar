# Input 组件

---

## demo

`npm run demo -- --component=input`

## 样式

![demo-png](http://172.16.117.224/fe/sunl-ui/raw/master/material/input-demo.png)

## API

属性 | 说明 | 类型 | 可选值 | 默认值 | 前置条件 | 备注
-----|-----|-----|------|-----|------|------
value | 输入框的值 | string | -- | -- | -- | -- 
type | input类型 | string | 'text'或者'password' | 'text' | -- | -- 
placeholder | placeholder | string | -- | '请输入' | -- | -- 
className | 样式类 | string | -- | -- | -- | -- 
style | 样式 | object | -- | -- | -- | --
disabled | 是否禁用 | Bool | -- | false | -- | --
onChange | 输入回调 | Function() | -- | -- | -- | --
onEnter | 按下回车的回调 | Function() | -- | -- | -- | --

## 示例

```
class AppComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
        }
        this.onChange = this.onChange.bind(this)
    }


    onChange(e) {
        this.setState({ value: e.target.value.trim() })
    }

    render() {
        const { value } = this.state
        return (
            <div className={styles['demo-pagination-wrap']}>
                <h3>Input 输入框</h3>
                <div className={styles['demo-pagination-section']}>
                    <div className={styles.title}>Input</div>
                    <Input value={value} placeholder={'请输入'} onChange={this.onChange} onEnter={() => { console.log('input') }} />
                </div>
            </div>
        )
    }
}
```


