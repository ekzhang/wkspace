export function download(fileName, content, contentType = 'text/plain') {
  const link = document.createElement('a');
  link.download = fileName;
  const blob = new Blob([content], { type: contentType });
  link.href = window.URL.createObjectURL(blob);
  link.click();
}
