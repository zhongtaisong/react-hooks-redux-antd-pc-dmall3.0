export default (key, _service) => {
    let obj = {
        // 获取筛选条件 - 数据
        async getFilterData() {
            const res = await _service.getFilterData();
            try{
                if( res.data.code === 200 ){
                    const { data=[] } = res.data || {};
                    return data;
                }
            }catch(err) {
                console.log(err);
            }
        },    
        // 获取全部商品 - 数据
        async getProductsData(params = {}) {
            const res = await _service.getProductsData(params);
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
        }
    }
    return function() {
        return typeof obj[key] === 'function' && obj[key].apply(this, arguments);
    }
}