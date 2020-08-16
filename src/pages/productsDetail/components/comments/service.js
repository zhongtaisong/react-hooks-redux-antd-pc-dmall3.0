export default (key, _service) => {
    let obj = {
        // 获取 - 当前商品评价
        async getCurrentCommentData(params = {}) {
            const res = await _service.getCurrentCommentData(params);
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
        },
        // 赞、踩 - 评价
        async postUpdateCommentData(params = {}) {
            const res = await _service.postUpdateCommentData(params);
            return res || {};
        }
    }
    return function() {
        return typeof obj[key] === 'function' && obj[key].apply(this, arguments);
    }
}