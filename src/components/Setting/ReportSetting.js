import React, { Component } from 'react';
import { Form, Row, Col, Input, DatePicker, Button, Switch } from 'antd';
import moment from 'moment';
import style from './Setting.less';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class ReportSetting extends Component {

  state = {
    reportStatus: this.props.reportStatus
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ reportStatus: nextProps.reportStatus });
  }

  handleOpenOrClose = (isOpen) => {
    if (!isOpen) {
      this.props.handleReportStatusChange({stat: 'close'});
    }
    const { reportStatus } = this.state;
    reportStatus.stat = isOpen ? 'open' : 'close';
    this.setState({ reportStatus });
  }

  handleDateChange = (type, dates) => {
    const { reportStatus } = this.state;
    reportStatus[type + '_start_date'] = dates[0].format('YYYY-MM-DD');
    reportStatus[type + '_end_date'] = dates[1].format('YYYY-MM-DD');
    this.setState({ reportStatus });
  }

  handleSubmit = (e) => {
    this.props.handleReportStatusChange(this.state.reportStatus);
    e.preventDefault();
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 12,
        offset: 4,
      },
    };
    const { reportStatus } = this.state;
    if (reportStatus.stat !== 'open') {
      return (
        <div className={style.setting_wrap}>
          <Row gutter={0}>
            <Col span={14}>
              <FormItem
                {...formItemLayout}
                label="汇报开关"
                hasFeedback
              >
                <Switch checked={false} onChange={this.handleOpenOrClose} />
                <span>（当前状态：关闭）</span>
              </FormItem>
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div className={style.setting_wrap}>
          <Row gutter={0}>
            <Col span={14}>
              <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem
                  {...formItemLayout}
                  label="汇报开关"
                  hasFeedback
                >
                  <Switch checked={true} onChange={this.handleOpenOrClose} />
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="汇报对应工作日期"
                  hasFeedback
                >
                  <RangePicker
                    format={'YYYY/MM/DD'}
                    value={[moment(reportStatus.work_start_date, 'YYYY/MM/DD'), moment(reportStatus.work_end_date, 'YYYY/MM/DD')]}
                    onChange={dates => this.handleDateChange('work', dates)}
                  />
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="汇报提交起止时间"
                  hasFeedback
                >
                  <RangePicker
                    value={[moment(reportStatus.report_start_date, 'YYYY/MM/DD'), moment(reportStatus.report_end_date, 'YYYY/MM/DD')]}
                    onChange={dates => this.handleDateChange('report', dates)}
                    format={'YYYY/MM/DD'}
                  />
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="部长审核起止时间"
                  hasFeedback
                >
                  <RangePicker
                    format={'YYYY/MM/DD'}
                    value={[moment(reportStatus.review_start_date, 'YYYY/MM/DD'), moment(reportStatus.review_end_date, 'YYYY/MM/DD')]}
                    onChange={dates => this.handleDateChange('review', dates)}
                  />
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit" size="large">开启汇报通道</Button>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

const ReportSettingForm = Form.create()(ReportSetting);

export default ReportSettingForm;