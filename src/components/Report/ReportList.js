import React, { Component } from 'react';
import { Spin } from 'antd';
import ReportCard from './ReportCard.js';
import style from './ReviewReport.less';

export default class ReportList extends Component {

  render() {
    const { handler, loading } = this.props;
    const reportData = this.props.data.slice(
                         (this.props.currentPage - 1) * this.props.pageSize,
                         this.props.currentPage * this.props.pageSize
                       );
    const cardList = reportData.map((item, index) => {
      return (
        <ReportCard
          key={index}
          currentUser={OAglobal.user}
          type={'review'}
          item={item}
          {...handler}
        />
      );
    });

    if (loading) {
      return (
        <div className={style.report_list_wrap_loading}>
          <Spin tip={'加载中。。。'} />
        </div>
      )
    } else {
      return (
        <div className={style.report_list_wrap}>
          {cardList}
        </div>
      );
    }
  }
}