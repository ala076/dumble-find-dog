var today = dayjs();
var dayWeek = today.format('[Today is] dddd');
$('#dayJsEl').text(dayWeek);

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

        var leftImage = document.getElementById('left-image');
        var rightImage = document.getElementById('right-image');

        leftImage.src = leftImageUrl;
        rightImage.src = rightImageUrl;
    })
};

getDogs(apiUrl);