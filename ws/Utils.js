/**
 * Created by Administrator on 2015/9/23.
 */
(function(e){
    /**
     * @namespace Utils
     */
    var Utils = {
        /**
         * 将一个字符串在浏览器输出，并断行
         *
         * @method printbr
         * @param {String} 要输出的字符串
         */
        printbr: function(str){
            e.document.write(str + '<br />');
        },
        ajax: {
            createXHR: function(){
                if(typeof XMLHttpRequest != undefined){
                    return new XMLHttpRequest();
                }else if( typeof ActiveXObject != undefined){
                    var versons = [
                            'MSMXL2.XMLHttp.6.0',
                            'MSXML2.XMLHttp.3.0',
                            'MSXML2.XMLHttp'
                        ],
                        i,
                        len,
                        axo;
                    for(i = 0, len = versons.length; i < len; i++){
                        try{
                            axo = new ActiveXObject(versons[i]);
                            arguments.callee.activeXString = versons[i];
                            return axo
                        }catch(e){}
                    }
                }else{
                    throw new Error("no xhr object available");
                }
            }
        }
    };

    e.Utils = Utils;
})(window)