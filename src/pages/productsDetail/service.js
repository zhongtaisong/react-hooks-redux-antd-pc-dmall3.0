import React from 'react';

// 获取 - 商品详情
export const getDetailsData = async (params = {}) => {
    const res = await React.$service.getDetailsData(params);
    try{
        if( res.data.code === 200 ){
            const { basicInfo={}, imgList=[], params={}, specs=[], detailsPic=[] } = res.data.data || {};
            return { basicInfo, imgList, params, specs, detailsPic };
        }
    }catch(err) {
        console.log(err);
    }
}