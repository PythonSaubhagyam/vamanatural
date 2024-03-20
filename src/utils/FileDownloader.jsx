import { useState } from "react";
import { HiDownload } from "react-icons/hi";

export function DownloadWithIcon({ url, fileName, size }) {
  const [downloading, setDownloading] = useState(false);

  const downloadFile = () => {
    fetch(url, {
      mode: "no-cors",
    })
      .then((response) => response.blob())
      .then((blob) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setDownloading(false);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
        setDownloading(false);
      });
  };
  return (
    <div>
      <HiDownload
        onClick={downloadFile}
        size={size}
        style={{ cursor: "pointer", opacity: downloading ? 0.5 : 1 }}
      />
    </div>
  );
}
