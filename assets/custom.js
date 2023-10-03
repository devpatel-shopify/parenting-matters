/**
 * Open all external links in new Tab
 */
{

  document.querySelectorAll('a[href]').forEach(button => {
    let newUrl = new URL(button.href);
    if(newUrl.origin != window.shopUrl) button.setAttribute('target',"_blank");
  });
}