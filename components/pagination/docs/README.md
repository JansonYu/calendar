# Pagination 组件

---

## demo

`npm run demo -- --component=pagination`

## 样式

![demo-png](http://172.16.117.224/fe/sunl-ui/raw/master/material/pagination-demo.png)

## API

属性 | 说明 | 类型 | 可选值 | 默认值 | 前置条件 | 备注
-----|-----|-----|------|-----|------|------
defaultCurrent | 默认当前页数 | Number | -- | 1 | -- | -- 
current | 当前页数 | Number | -- | 1 | -- | -- 
total | item总数 | Number | -- | 0 | -- | -- 
defaultPageSize | 默认每页多少item | Number | -- | 10 | -- | -- 
pageSize | 每页多少item | Number | -- | 10 | -- | --
pageSizeOptions | sizeChanger下拉可选项 | Array | -- | ['10', '20', '30', '40'] | showSizeChanger为'true' | --
onChange | 换页 | Function(page) | -- | -- | -- | --
onSizeChange | 更换pageSize | Function(current,pageSize) | -- | -- | showSizeChanger为'true' | --
showTotal | 显示页码总数信息 | Function(total, [from, to]) | -- | -- | -- | --
showQuickJumper | 能否快速跳转换页 | Bool | 'true'或者'false' | false | -- | --
showSizeChanger | 能否更换pageSize | Bool | 'true'或者'false' | false | -- | --
simple | 是否是简易分页 | Bool | 'true'或者'false' | false | -- | --
showTitle | 是否显示title | Bool | 'true'或者'false' | true | -- | --
className | 样式类 | string | -- | -- | -- | --

## 示例

```
class AppComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 1,
            pageSize: 10,
        }
        this.onPageChange = this.onPageChange.bind(this)
        this.onSizeChange = this.onSizeChange.bind(this)
    }

    onPageChange(page) {
        this.setState({
            current: page,
        })
    }

    onSizeChange(current, pageSize) {
        this.setState({
            current,
            pageSize,
        })
    }

    render() {
        const { current, pageSize } = this.state
        return (
            <div className={styles['demo-button-wrap']}>
                <h3>Button 按钮</h3>
                <div className={styles['demo-button-section']}>
                    <div className={styles.title}>按钮样式</div>
                    <Pagination
                        showQuickJumper={true}
                        showSizeChanger={true}
                        current={current}
                        pageSize={pageSize}
                        onSizeChange={this.onSizeChange}
                        onChange={this.onPageChange}
                        total={260}
                        showTotal: total => `共 ${total} 条`
                    />
                </div>
            </div>
        )
    }
}
```