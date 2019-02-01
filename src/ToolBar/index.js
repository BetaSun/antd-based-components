import React, { PureComponent } from 'react';
import { Form, Button, Row, Col } from 'antd';
// 引入样式文件
import styles from './index.less';

const { Item: FormItem } = Form;

// 默认控件容器所占格数
const defaultSpan = {
  xl: 8,
  md: 12,
  sm: 24,
  xs: 24,
};
// 默认控件容器间隔
const defaultGutter = 24;
// 默认样式
const defaultStyle = { margin: '0', padding: '4px 0' };
// 默认按钮样式
const defaultButtonStyle = { marginRight: 16 };

/**
 * description: 将输入框、下拉框、按钮等控件放在一起的控件栏
 */
@Form.create()
export default class ToolBar extends PureComponent {
  handleSearch = () => {
    const {
      fields,
      onSearch,
      autoTrim=true,
      form: { validateFieldsAndScroll, setFieldsValue },
    } = this.props;
    validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        if (autoTrim) {
          setFieldsValue(fields.reduce((result, { id }) => {
            if (typeof values[id] === 'string') {
              result[id] = values[id].trim(); // eslint-disable-line
            }
            return result;
          }, {}));
        }
        if (onSearch) {
          onSearch(fields.reduce((result, { id, transform }) => {
            if (transform) {
              result[id] = transform(values[id]); // eslint-disable-line
            }
            return result;
          }, values));
        }
      }
    });
  };

  handleReset = () => {
    const {
      onReset,
      form: { resetFields, getFieldsValue },
    } = this.props;
    resetFields();
    if (onReset) {
      onReset(getFieldsValue());
    }
  };

  /**
   * 渲染
   */
  render() {
    const {
      // 无需传入
      form: { getFieldDecorator },
      // 字段数组
      fields,
      // 查询按钮的参数，具体见Button组件
      searchProps,
      // 查询按钮的文本
      searchText="查询",
      // 是否显示查询按钮
      searchable = true,
      // 重置按钮的参数，具体见Button组件
      resetProps,
      // 重置按钮的文本
      resetText="重置",
      // 是否显示重置按钮
      resetable = true,
      // 放在按钮容器中的控件，一般为其他按钮，如添加按钮等
      action,
      // 按钮容器占位格数，具体见Col组件
      buttonSpan = defaultSpan,
      // 容器的间隔，具体见Row组件
      gutter = defaultGutter,
      // 按钮容器样式
      buttonWrapperStyle,
      // ref函数
      ref,
    } = this.props;

    return (
      <Form className={styles.form} ref={ref}>
        <Row gutter={gutter}>
          {/* 控件 */}
          {fields && fields.map(({
            id,
            label,
            span = defaultSpan,
            options,
            render,
            labelCol,
            wrapperCol,
            style,
          }) => (
            <Col
              key={id}
              {...(typeof span === 'number' ? { span } : span)}
            >
              <FormItem
                label={label}
                style={{ ...defaultStyle, ...style }}
                labelCol={labelCol}
                wrapperCol={wrapperCol}
              >
                {getFieldDecorator(id, options)(render(this))}
              </FormItem>
            </Col>
          ))}
          {/* 按钮 */}
          <Col {...buttonSpan}>
            <FormItem style={{ ...defaultStyle, ...buttonWrapperStyle }}>
              {/* 查询按钮 */}
              {searchable && (
                <Button type="primary" style={defaultButtonStyle} {...searchProps} onClick={this.handleSearch}>
                  {searchText}
                </Button>
              )}
              {/* 重置按钮 */}
              {resetable && (
                <Button type="default" style={defaultButtonStyle} {...resetProps} onClick={this.handleReset}>
                  {resetText}
                </Button>
              )}
              {/* 其他按钮 */}
              {action}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
