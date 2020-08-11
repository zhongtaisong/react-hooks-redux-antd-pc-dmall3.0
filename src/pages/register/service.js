export const postRegData = async ( values ) => {
    const res = await service.postRegData(values);
    try{
        if( res.data.code === 200 ){
            const { data } = res.data || {};
            data && localStorage.setItem('uname', data); 
            this.history.push('/login');
        }else if( res.data.code === 201 ){
            message.error(res.data.msg);
        }
    }catch(err) {
        console.log(err);
    }
}