// 退出登录
export const postLogoutData = (_service) => (async () => {
    const res = await _service.postLogoutData();
    try{
        if( res.data.code === 200 ){
            sessionStorage.removeItem('uname');
        }
        return res.data.code;
    }catch(err) {
        console.log(err);
    }
})