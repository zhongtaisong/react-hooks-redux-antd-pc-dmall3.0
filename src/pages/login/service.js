export default (key, _service, history, _globalCloseTime) => {
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

                    // setTimeout(() => {
                    //     history.push('/home');
                    // }, _globalCloseTime * 500);
                }
            }catch(err) {
                console.log(err);
            }
        },
        // 验证信息
        async postValiForgetPwdData(params = {}) {
            const res = await _service.postValiForgetPwdData(params);
            try{
                if( res.data.code === 200 ){
                    // const { data={} } = res.data || {};
                    // if(data) {
                    //     this.setUpwdObj(data);
                    // }
                    // message.success(res.data.msg);
                }
                // return res.data.code;
            }catch(err) {
                console.log(err);
            }
        },
        // 提交新密码
        async postUpdateUpwdData(params = {}) {
            const res = await _service.postUpdateUpwdData(params);
            try{
                if( res.data.code === 200 ){
                    // message.success('新密码提交成功！');
                    // res.data.data && localStorage.setItem('uname', res.data.data);      
                }
                // return res.data.code;
            }catch(err) {
                console.log(err);
            }
        }
    }

    return (...params) => {
        typeof obj[key] === 'function' && obj[key](...params);
    }
}
