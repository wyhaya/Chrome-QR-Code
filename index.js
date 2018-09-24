

chrome.tabs.getSelected(null, tab => {


    let url = tab.url
    textarea = document.querySelector('textarea')
    qr = document.querySelector('#qr')
    bottom = document.querySelector('.bottom')
    textarea.value = url


    let qrCanvas = new AraleQRCode({
        render: 'canvas',
        text: url,
        size: 200,
        background: '#FFFFFF',
        foreground: '#000000',
    })


    // add element
    qr.insertBefore(qrCanvas, bottom)


    // download
    document.querySelector('button').onclick = () => {
        let imgData = document.querySelector('canvas').toDataURL('png')
        downloadImg(imgData, tab.title + '.png')
    }


    textarea.oninput = () => {
        url = event.target.value
        let qrCanvas = new AraleQRCode({
            render: 'canvas',
            text: url,
            size: 200,
            background: '#FFFFFF',
            foreground: '#000000',
        })
        document.querySelector('canvas').parentNode.removeChild(document.querySelector('canvas'))
        qr.insertBefore(qrCanvas, bottom)
    }

    
})



const downloadImg = function (imgData, fileName) {
    imgData = imgData.replace('image/png', 'image/octet-stream')
    let link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
    link.href = imgData
    link.download = fileName
    let event = document.createEvent('MouseEvents')
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    link.dispatchEvent(event)
}


