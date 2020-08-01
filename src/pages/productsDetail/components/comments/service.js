import React from 'react';
import { message } from 'antd';

// 获取 - 当前商品评价
export const getCurrentCommentData = async (params = {}) => {
    const res = await React.$service.getCurrentCommentData(params);
    try{
        if( res.data.code === 200 ){
            const { data=[] } = res.data || {};
            let nums = data.map(item => {
                return ({
                    agree: item.agree,
                    disagree: item.disagree
                });
            });
            return { data, nums };
        }
    }catch(err) {
        console.log(err);
    }
}

// 赞、踩 - 评价
export const postUpdateCommentData = async (params = {}) => {
    const res = await React.$service.postUpdateCommentData(params);
    try{
        if( res.data.code === 200 ){
            message.success(res.data.msg);
        }
    }catch(err) {
        console.log(err);
    }
}