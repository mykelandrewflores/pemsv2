function print(){
    var doc = new jsPDF('l','mm',[300,210]);
    doc.addHTML($('#mybody')[0], 15, 15, {
      'background': '#fff',
    }, function() {    
    doc.addFont('fonts/calibri.ttf', 'Calibri', 'normal');
    doc.setFont('Calibri');
    doc.setFontType("bold");
    doc.setFontSize(40);
    doc.save('sample-file.pdf');
    });
}

setTimeout(function(){print();},2000);
