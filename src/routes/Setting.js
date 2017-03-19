import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import Layout from '../components/Common/Layout.js';
import TabPage from '../components/Common/TabPage.js';
import ReportSetting from '../components/Setting/ReportSetting.js';

class Setting extends Component {

  handleReportStatusChange = (payload) => {
    this.props.dispatch({
      type: 'setting/updateReportStatus',
      payload: { payload }
    });
  }

  componentWillReceiveProps(nextProps) {
    const msg = nextProps.setting.message;
    const oldMsg = this.props.setting.message;
    // 利用Symbol类型的key解决消息重复的问题
    if (msg.key !== oldMsg.key) {
      if (msg.type == 'success') {
        message.success(msg.msg, 3);
      } else if (msg.type == 'error') {
        message.error(msg.msg, 3);
      }
    }
  }

  render() {
    const { reportStatus } = this.props.setting;
    const tabItems = [
      {
        text: '汇报设置',
        key: 'report',
        content:  <ReportSetting reportStatus={reportStatus} handleReportStatusChange={this.handleReportStatusChange} />
      }
    ];
    return (
      <Layout currentNav={this.props.setting.currentNav}>
        <TabPage
          items={tabItems}
          defaultActiveKey={'report'}
          onChange={this.handleTabChange}
        />
      </Layout>
    );
  }
}

function mapStateToProps(setting) {
  return {...setting};
}

export default connect(mapStateToProps)(Setting);