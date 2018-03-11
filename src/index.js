


chrome.tabs.getSelected(null, (tab) => {

    //生成二维码
    let qrCanvas = new AraleQRCode({
        render:'canvas',
        text:tab.url,
        size:200,
        background:'#FFFFFF',
        foreground:'#000000',
    })

    //...
    qrCanvas.setAttribute('title','点击可以下载')

    //添加到视图里面
    document.body.appendChild(qrCanvas)

    //点击下载
    qrCanvas.onclick = () => {
        let imgData = event.target.toDataURL('png')
        downloadImg(imgData,tab.title + '.png')
    }

})


//下载图片
const downloadImg = function (imgData,fileName) {
    imgData = imgData.replace('image/png','image/octet-stream')
    let link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
    link.href = imgData
    link.download = fileName
    let event = document.createEvent('MouseEvents')
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    link.dispatchEvent(event)
}

