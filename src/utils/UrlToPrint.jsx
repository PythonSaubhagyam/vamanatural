const UrlToPrint = (
  fileUrl = "http://192.168.1.48:8000/accounting/invoice-pdf/43723/"
) => {
  const newWindow = window.open("", "_blank");
  const printStyles = `
      @page {
        size: A4;
        margin: 0;
      }
      body {
        margin: 0;
      }
    `;
  const styleSheet = newWindow.document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = printStyles;
  newWindow.document.head.appendChild(styleSheet);
  newWindow.location.href = fileUrl;
  newWindow.onload = () => {
    setTimeout(() => {
      newWindow.print();
    }, 1000);
  };
};

export default UrlToPrint;
