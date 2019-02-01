import React, { PureComponent } from 'react';
import { Card, Input, Select, DatePicker } from 'antd';
import ToolBar from '@/components/ToolBar';

const { Option } = Select;
const { RangePicker } = DatePicker;

const fields = [
  {
    id: 'companyName', // 字段名，必选
    render(_this) {
      return (
        <Input placeholder="请输入企业名称" onPressEnter={_this.onSearch} />
      );
    }, // 控件渲染函数，必选
    label: '企业名称', // 字段中文，可选
    span: 8, // 控件所占格数，可以为数字，也可以为对象，具体见Col组件，可选
    options: {
      rules: [{
        required: true,
        message: `请输入企业名称`,
      }],
    }, // 用于getFieldDecorator设置的参数，可选
    labelCol: { span: 3 }, // 可选
    wrapperCol: { span: 9 }, // 可选
  },
  {
    id: 'companyType', // 字段名，必选
    render() {
      return (
        <Select placeholder="请选择企业类型">
          {[{ id: 1, label: '一般企业' }, { id: 2, label: '重要企业' }].map(({ id, label }) => (
            <Option key={id}>{label}</Option>
          ))}
        </Select>
      );
    }, // 控件渲染函数，必选
    options: {
      initialValue: '1',
    }, // 用于getFieldDecorator设置的参数，可选
  },
  {
    id: 'creatTime', // 字段名，必选
    render() {
      return (
        <RangePicker placeholder={['开始时间', '结束时间']} style={{ width: '100%' }} />
      );
    }, // 控件渲染函数，必选
    transform(value) {
      if (value) {
        const [start, end] = value;
        return [start && start.format('YYYY-MM-DD HH:mm:ss'), end && end.format('YYYY-MM-DD HH:mm:ss')];
      }
      return value;
    }, // 点击查询时会根据这个函数对获取的对应表单值进行转换，如去除两边空格等操作都可以在这里实现，可选
  }
];

export default class Test2 extends PureComponent {
  componentDidMount() {
    // 通过this.form可以手动修改控件值
    this.form.setFieldsValue({
      companyName: '测试',
    });
  }

  refForm = (form) => {
    this.form = form;
  }

  handleSearch = (values) => {
    console.log(values);
  }

  handleReset = (values) => {
    console.log(values);
  }

  render() {
    return (
      <Card bordered={false}>
        <ToolBar
          fields={fields}
          onSearch={this.handleSearch}
          onReset={this.handleReset}
          ref={this.refForm}
        />
      </Card>
    );
  }
}
