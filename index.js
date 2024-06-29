let contentImages
let nextPageURL = ''

getImages = (url) => {
    fetch(url, {
        method: 'GET',
        headers: {
            Authorization: 'PEXELS_API_KEY'
        }
    }).then(response => {
        if (!response.ok) {
            return 'Network error. Couldn\'t fetch content'
        }

        return response.json()
    }).then(data => {
        let { next_page, photos } = data

        nextPageURL = next_page

        photos.forEach(photo => {
            let divElement = document.createElement('div')
            let imgElement = document.createElement('img')

            imgElement.src = photo.src.portrait

            let chipElement = document.createElement('p')
            chipElement.innerText = 'Save'
            chipElement.className = 'chip'

            let linkElement = document.createElement('a')
            linkElement.className = 'link'
            linkElement.href = photo.url
            linkElement.target = '_blank'
            let linkImg = document.createElement('img')
            linkImg.className = 'link-icon'
            linkImg.src = 'assets/arrow-up-right.svg'
            let linkName = document.createElement('p')
            linkName.innerText = 'pexels.com'

            linkElement.appendChild(linkImg)
            linkElement.appendChild(linkName)

            let uploadImg = document.createElement('img')
            uploadImg.src = 'assets/upload.svg'
            uploadImg.className = 'upload-icon'

            let ellipsisImg = document.createElement('img')
            ellipsisImg.src = 'assets/ellipsis.svg'
            ellipsisImg.className = 'ellipsis-icon'

            let optionElement = document.createElement('div')
            optionElement.className = 'options'
            
            optionElement.appendChild(linkElement)

            let iconsElement = document.createElement('div')
            iconsElement.className = 'options-icons'
            iconsElement.appendChild(uploadImg)
            iconsElement.appendChild(ellipsisImg)

            optionElement.appendChild(iconsElement)

            let blackBg = document.createElement('div')
            blackBg.className = 'black-bg'

            divElement.appendChild(blackBg)
            divElement.appendChild(imgElement)
            divElement.appendChild(chipElement)
            divElement.appendChild(optionElement)

            divElement.className = 'img-container'

            contentImages.appendChild(divElement)
        });
    })
}

document.addEventListener('DOMContentLoaded', () => {
    contentImages = document.querySelector(".content-images")
    getImages(`https://api.pexels.com/v1/curated?per_page=15`)

    let navBar = document.querySelector('.nav-bar')

    document.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY
        
        if(contentImages.offsetHeight * 0.5 <= scrollPosition) {
            getImages(nextPageURL)
        }

        if(scrollPosition > 30) {
            navBar.style.boxShadow = '0px 0px 5px #d5d5d5'
        }
        else {
            navBar.style.boxShadow = 'none'
        }
    })
})

searchImages = (event) => {
    if(event.key === 'Enter') {
        let searchArr = event.target.value.split(' ')
        clearContent()
        getImages(`https://api.pexels.com/v1/search?query=${searchArr.join('%20')}`)
    }
}

clearContent = () => {
    while(contentImages.firstChild) {
        contentImages.removeChild(contentImages.firstChild)
    }
}
