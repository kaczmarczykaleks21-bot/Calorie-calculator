const host = window.location.hostname;
if (host.includes('tdeetoday.com')) {
  window.location.replace('/ENG/index.html');
} else {
  window.location.replace('/PL/index.html');
}
