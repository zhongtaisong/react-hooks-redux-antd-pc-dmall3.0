export default (key, _service) => {
    let obj = {
        // 登录
        async postLogData(params = {}) {
            
            const res = await _service.postLogData(params);
            try{
                if( res.data.code === 200 ){
                    const { uname } = res.data.data || {};

                    if(!uname) return res.data;

                    sessionStorage.setItem('uname', uname);
                    localStorage.setItem('uname', uname);
                }
                return res.data.code;
            }catch(err) {
                console.log(err);
            }
        },
        // 验证信息
        async postValiForgetPwdData(params = {}) {
            const res = await _service.postValiForgetPwdData(params);
            try{
                if( res.data.code === 200 ){
                    return res.data.data || {};
                }
            }catch(err) {
                console.log(err);
            }
        },
        // 提交新密码
        async postUpdateUpwdData(params = {}) {
            const res = await _service.postUpdateUpwdData(params);
            try{
                if( res.data.code === 200 ){
                    res.data.data && localStorage.setItem('uname', res.data.data);
                }
                return res.data.code;
            }catch(err) {
                console.log(err);
            }
        }
    }

    return (...params) => {
        return typeof obj[key] === 'function' && obj[key](...params);
    }
}
