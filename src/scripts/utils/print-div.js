function printDiv(divName) {
  var printContents = document.getElementById(divName).innerHTML;
  var originalContents = document.body.innerHTML;
  document.getElementById(divName).style.backgroundImage = "https://ksucipta.org/logo/KSPCIPTA-02.png";
  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;

}

export default printDiv;