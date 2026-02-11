"use strict";var t=require("../common/http.js");exports.getHotListApi=()=>t.http.get("/api/home/getHotList"),exports.getSwipperListApi=()=>t.http.get("/api/home/getSwipperList");
