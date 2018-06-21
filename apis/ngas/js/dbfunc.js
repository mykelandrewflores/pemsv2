let datas = [];
function getTables() {
    $.getJSON("data.json", function(json) {
        datas = json;
        getTableVal('order_details');
        console.log(datas);
        // let longString = "";
        // for(var i = 0; i < datas.length; i++) {
        // 	longString += "<a href='#'>" + datas[i] + "</a>";
        // }
        // console.log(longString);
    });
}
function getTableVal(table) {
    let longString = "";
    for(var i = 0; i < datas.length; i++) {
      	longString += "<a href='#'>" + datas[0].order_details + "</a>";
    }
    console.log(longString);
}
getTables();