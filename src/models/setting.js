import { queryStatus, updateReportStatus } from '../services/report';
import { parse } from 'qs';

export default {
  namespace: 'setting',

  state: {
    message: {
      key: Symbol('msg_setting'), // 确保每次message的key独一无二
      type: '',
      msg: ''
    },
    reportStatus: {
      stat: 'close',
    },
    currentNav: 'setting',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/setting') {
          console.log('setting');
          dispatch({
            type: 'fetchReportStatus'
          });
        }
      });
    },
  },

  effects: {
    *fetchReportStatus({ payload }, { call, put }) {
      const {data} = yield call(queryStatus, parse(payload));
      console.log('data', data);
      if (data && data.success == 'true') {
        yield put({
          type: 'querySuccess',
          payload: data.data
        });
      } else {
        yield put({
          type: 'showMsg',
          payload: {
            msgType: 'error',
            msg: '世界上最遥远的距离是跟服务器失联了'
          }
        })
      }
    },

    *updateReportStatus({ payload }, { call, put }) {
      const {data} = yield call(updateReportStatus, parse(payload.payload));
      if (data && data.success == 'true') {
        yield put({
          type: 'showMsg',
          payload: {
            msgType: 'success',
            msg: '操作成功'
          }
        })
      } else {
        yield put({
          type: 'showMsg',
          payload: {
            msgType: 'error',
            msg: '操作失败，如果需要理由，那可能是断网了。。。'
          }
        })
      }
    }
  },

  reducers: {

    querySuccess(state, action) {
      const params = {
        reportStatus: action.payload
      }
      return { ...state, ...params };
    },

    showMsg(state, action) {
      const params = {
        shouldUpdate: false,
        message: {
          key: Symbol('msg_setting'),
          type: action.payload.msgType,
          msg: action.payload.msg
        }
      }
      return { ...state, ...params};
    }
  }

}
