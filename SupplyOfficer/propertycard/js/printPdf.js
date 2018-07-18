function print(){
    var doc = new jsPDF('1','mm',[300,300]);
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
