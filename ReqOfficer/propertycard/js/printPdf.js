// function PrintElem(elem)
// {
//     // localStorage.chartData = document.getElementById(elem).toDataURL();
//     Popup($('<div/>').append($(elem).clone()).html());
// }

// function Popup(data) 
// {
    
    
    
//     var mywindow = window.open('', '_blank');

//     mywindow.document.write(data);
    
//     // mywindow.document.write('<center><img id="url" width="1000px" src='+localStorage.chartData+'><br><br><h2>Life Cycle Cost Analysis Chart Table Data</h2>'+data+'</center></div><center>');
    
//     mywindow.focus();
//     setTimeout(function(){mywindow.close();},2000);

//     return true; 
 
// }

function print(){
    var doc = new jsPDF('1','mm',[200,200]);
    doc.addHTML($('#mybody')[0], 15, 15, {
      'background': '#fff',
    }, function() {    
    doc.addFont('fonts/calibri.ttf', 'Calibri', 'normal');
    doc.setFont('Calibri');
    doc.setFontType("Regular");
    doc.setFontSize(10);
    doc.save('Property_Card.pdf');
    });
}

setTimeout(function(){print();},5000);