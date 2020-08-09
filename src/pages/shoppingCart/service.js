import React from 'react';

// 获取购物车列表 - 数据
export const getSelectCartData = async (params) => {
    const res = await React.$service.getSelectCartData(params);
    try{
        if( res.data.code === 200 ){
            const { data=[] } = res.data || {};
            return data;
        }
    }catch(err) {
        console.log(err);
    }
};
    
// 获取全部商品 - 数据
export const getProductsData = async (params = {}) => {
    const res = await React.$service.getProductsData(params);
    try{
        if( res.data.code === 200 ){
            let { products, current, pageSize, total } = res.data.data || {};
            products.map((item, index) => {
                return item['key'] = index + 1;
            });
            return { products, current, pageSize, total };
        }
    }catch(err) {
        console.log(err);
    }
};