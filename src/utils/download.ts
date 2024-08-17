/**
 * 下载二进制流
 * @param res
 * @param name
 */
export function downloadBlob(res: any, name: string) {
  const blob = new Blob([res.data]);

  const anchor = document.createElement('a');
  const href = window.URL.createObjectURL(blob); //关键点3
  anchor.setAttribute('href', href);
  // /* 关键之处：使用download属性必须要html5的页面才行 ，而且它不会刷新，文件名及扩展名均由这里控制*/
  anchor.setAttribute('download', name); //关键点4
  anchor.click();
}

/**
 * 下载链接
 * @param href
 * @param title
 */
export function downloadLink(href: string, title?: string) {
  let findTitle: string = '';

  if (!title) {
    const list = href.split('/');
    if (list.length > 0) {
      findTitle = list[list.length - 1];
    }
  }

  const a = document.createElement('a');
  a.setAttribute('href', href);
  a.setAttribute('download', title || findTitle);
  a.click();
}
