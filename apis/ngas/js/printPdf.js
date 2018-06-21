var doc = new jsPDF();

	
doc.addHTML($('#mybody')[0], 15, 15, {
  'background': '#fff',
}, function() {    
  doc.addFont('fonts/calibri.ttf', 'Calibri', 'normal');
	doc.setFont('Calibri');
  doc.setFontType("bold");
  doc.setFontSize(40);
  doc.save('purchase-request-summary.pdf');
});