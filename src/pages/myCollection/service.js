export default (key, _service) => {
    let obj = {
        // 获取宝贝收藏列表 - 数据
        async getAllCollectionData() {
            const res = await _service.getAllCollectionData({
                uname: sessionStorage.getItem('uname'),
                collection: 1
            });
            return res || {};
        },
        // 加入购物车
        async postAddCollectionData(ids = []) {
            const res = await _service.postAddCollectionData({ 
                uname: sessionStorage.getItem('uname'), 
                ids,
                collection: 0
            });
            return res || {};
        }
    }
    return function() {
        return typeof obj[key] === 'function' && obj[key].apply(this, arguments);
    }
}