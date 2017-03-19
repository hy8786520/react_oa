import React, { Component } from 'react';
import { Pagination } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import SearchForm from './SearchForm.js';
import ReportList from './ReportList.js';
import style from './ReviewReport.less';

const pageSize = 10;

export default class ReviewReport extends Component {

  state = {
    page: 1
  }

  componentWillReceiveProps() {
    this.setState({ page: 1 });
  }

  handlePageChange = (page) => {
    this.setState({ page });
  }

  render() {
    const { handler, loading, conditions } = this.props;
    return (
      <Scrollbars style={{ width: '100%', height: '98%' }}>
        <SearchForm {...handler} conditions={conditions} />
        <ReportList
          data={this.props.reportList}
          currentPage={this.state.page}
          pageSize={pageSize}
          loading={loading}
          handler={handler}
        />
        <div className={style.report_list_pagination}>
          <Pagination
            onChange={this.handlePageChange}
            size="large"
            defaultCurrent={1}
            current={this.state.page}
            pageSize={pageSize}
            total={this.props.reportList.length}
          />
        </div>
      </Scrollbars>
    );
  }
}