var today = dayjs();
var dayWeek = today.format('[Today is] dddd');
$('#dayJsEl').text(dayWeek);
var leftButton = document.getElementById('left-button');
var rightButton = document.getElementById('right-button');
var dogsStorageKey = 'liked-dogs';
var bodyEl = document.getElementById('body');

var apiKey = 'live_iX7RKYHwWFdPNAzqsGY55sDz4EP3dPmFV7zFe8mztg9rlJ3glpV2KggBggBTfXQq';

var apiUrl = 'https://api.thedogapi.com/v1/breeds?limit=10&has_breeds=0' + apiKey;

//This function fetches the dog api and pull the data we need (images and breed names) to be used on screen.
function getDogs(url) {
    fetch(url).then(function(response) {
        if(response.status != 200) {
            console.log('Status error');
        } else {
            return response.json();
        }
    }).then(function(data) {

        var leftImageUrl = data[0].image.url;
        var rightImageUrl = data[1].image.url;
        console.log(data);
        const dataCopy = data.slice(2);
        var leftImage = document.getElementById('left-image');
        var rightImage = document.getElementById('right-image');

        leftImage.src = leftImageUrl;
        rightImage.src = rightImageUrl;

        leftButton.addEventListener('click', function() {
            if(dataCopy.length > 0) {
                rightImage.src = dataCopy[0].image.url;
                dataCopy.shift();
            } else {
                    var foundDog = data.find(function(dog) {
                        return dog.image.url === leftImage.src;
                    })
                    localStorage.setItem(dogsStorageKey, JSON.stringify(foundDog));
                    let finalDog = JSON.parse(localStorage.getItem('liked-dogs'));
                    document.getElementById('initial-page').style.display = 'none';
                    document.getElementById('final-dog-image').src = finalDog.image.url;
                    console.log(finalDog.image.url)
                    document.getElementById('final-page').style.display = 'block';
            }
        })

        rightButton.addEventListener('click', function() {
            if(dataCopy.length > 0) {
                leftImage.src = dataCopy[0].image.url;
                dataCopy.shift();
            } else {
                var foundDog = data.find(function(dog) {
                    return dog.image.url === document.getElementById('right-image').getAttribute('src')
                })
                localStorage.setItem(dogsStorageKey, JSON.stringify(foundDog));
                let finalDog = JSON.parse(localStorage.getItem('liked-dogs'));
                document.getElementById('initial-page').style.display = 'none';
                document.getElementById('final-dog-image').src = finalDog.image.url;
                console.log(finalDog.image.url)
                document.getElementById('final-page').style.display = 'block';
            }
            
        })
    })
};

getDogs(apiUrl);
