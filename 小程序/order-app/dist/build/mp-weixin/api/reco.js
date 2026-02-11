"use strict";var t=require("../common/http.js");exports.getRecoListApi=e=>t.http.get("/wxapi/reco/list",e),exports.reportRecoEventBatchApi=e=>t.http.post("/wxapi/reco/event/batch",{events:e});
