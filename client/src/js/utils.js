export function download(fileName, content, contentType = 'text/plain') {
  const link = document.createElement('a');
  link.download = fileName;
  const blob = new Blob([content], { type: contentType });
  link.href = window.URL.createObjectURL(blob);
  link.click();
}

export function recentWorkspaces() {
  return localStorage.getItem('recentWorkspaces') || '';
}

export function addWorkspace(id) {
  const ar = recentWorkspaces()
    .split(',')
    .filter((s) => s);
  if (!ar.includes(id)) {
    ar.push(id);
    localStorage.setItem('recentWorkspaces', ar.join(','));
  }
}
