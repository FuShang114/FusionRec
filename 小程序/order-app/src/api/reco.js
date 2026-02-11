import http from '../common/http.js'

// 推荐列表
export const getRecoListApi = (parm) => {
	return http.get('/wxapi/reco/list', parm)
}

// 事件上报（曝光/点击/下单等）
export const reportRecoEventBatchApi = (events) => {
	return http.post('/wxapi/reco/event/batch', {
		events
	})
}
