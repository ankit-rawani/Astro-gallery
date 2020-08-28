let dl = document.querySelector('#search-previews dl')
let search = document.querySelector('#search')

search.addEventListener('keyup', () => {
    // console.log(search.value)
    clearList()
    if(search.value != '')
    {
        fetch('https://images-api.nasa.gov/search?q='+search.value)
            .then(data => {
                data.json().then(json_data => {
                    if(json_data.collection.items.length > 5) document.querySelector('#search-previews').style.height = '200px'
                    else document.querySelector('#search-previews').style.height = 'auto'
                    json_data.collection.items.forEach(item => {
                        let dd = document.createElement('dd')
                        let a = document.createElement('a')
                        if(item.links != undefined) a.href = item.links[0].href
                        a.textContent = item.data[0].title
                        a.target = '_blank'
                        dd.appendChild(a)
                        dl.appendChild(dd)
                        // console.log(item.links)
                    })
                })
            })
        }
})

function clearList() {
    while(dl.firstChild) {
        dl.removeChild(dl.firstChild)
    }
}

let background = document.querySelector('#background')
let img = document.createElement('img')

fetch('https://api.nasa.gov/planetary/apod?api_key=fh4yebWcmFDwQ9RV16k9ppEj6pgBZulGMTJpkkgY')
    .then(data => {
        // console.log(data)
        data.json().then(json_data => {
            img.src = json_data.hdurl
            background.appendChild(img)
        })
    })
    .catch(err => console.log(err))


