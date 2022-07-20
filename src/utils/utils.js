


function date_exp(expired_day,t = null){
        const date_expire = new Date();
        const getfim = new Date(date_expire.getFullYear(),date_expire.getMonth(),date_expire.getDate() + parseInt(expired_day)).toISOString()
        const formed = new String(getfim)
        if(t != 0){
            const expire = new Date();
            const x1 = new Date(expire.getFullYear(),expire.getMonth(),expire.getDate()).toISOString()
            const x2 = new String(x1)
            return (x2.slice(0,10)).match(/\d/g).join('');
        }
        return (formed.slice(0,10));
}
 function getPagination(page,dinamic){
    var totalItem = dinamic;
    var pages = (page == 1) ? 0 : page - 1;
    pages = totalItem * pages;
    return {pages,totalItem}
}
 function getDataPagination(data,page,limit){
    const {count: totalItems,rows:line} = data;
    const currentPage = page ? +page : 1;
    const TotalPage = Math.ceil(totalItems/limit);
    return {totalItems,line,TotalPage,currentPage}
  }


module.exports = {date_exp,getDataPagination,getPagination}