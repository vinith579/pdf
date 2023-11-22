const zoombutton = document.getElementById('zoom');
const input = document.getElementById('inputfile');
const openfile = document.getElementById('openpdf');
const currentpage = document.getElementById('current_page');
const viewer = document.querySelector('.pdf-viewer');
let currentpdf = {};

function resetcurrentpdf(){
  currentpdf = {
    file : null,
    countofpages : 0,
    currentpage : 1,
    zoom : 1.5
  }
}

openPdf.addEventListner('click',() => {
  input.click();
});

input.addEventListener('change', event=>{
  const inputfile = event.target.files[0];
  if (inputfile.type === 'application/pdf'){
    const reader = new FileReader();
    reader.readAsDataURL(inputfile);
    reader.onload = () =>{
      loadPDF(reader.result);
      zoombutton.disabled = false;
    }
  }
  else{
    alert("you choosen file is not an pdf format!! please check it")
  }
});

function loadPDF(data){
  resetcurrentpdf();
  const pdfFile = pdfpdfjsLib.getDocument(data);
  pdfFile.promise.then(doc =>{
    currentpdf.file = doc;
    currentpdf.countofpages = doc.numPages;
    viewer.classList.remove("hidden");
    document.querySelector("main h3").classList.add("hidden");
    rendercurrentpage();
  });
}

function rendercurrentpage(){
  currentpdf.file.getPage(currentpdf.currentpage).then(page =>{
    const context = viewer.getContext('2d');
    const viewport = page.getViewport({scale: currentpdf.zoom});
    viewer.height = viewport.height;
    viewer.width = viewport.width;

    const renderContext = {
      canvasContext : context,
      viewport : viewport
    };
    page.render(renderContext);
  });
  currentpage.innerHTML = currentpdf.currentpage + " of " + currentpdf.countofpages;
  
}