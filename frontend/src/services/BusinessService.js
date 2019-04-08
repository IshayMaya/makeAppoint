import UtilService from './UtilService.js'
import UserService from './UserService.js'
// import axios from 'axios'

const cloudinary = require('cloudinary/lib/cloudinary.js')
cloudinary.config({
    cloud_name: 'dmr7h2h2h',
    api_key: '684627237884771',
    api_secret: 'UzOASIxY-D3Bcyu83yo7dLy4lpE'
})
import Axios from 'axios';
var axios = Axios.create({
    withCredentials: true
});




const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/business' : '//localhost:3003/business';


async function query(filterBy) {
    var filterBy = `?name=${filterBy.name}&locationLat=${filterBy.currUserLocation.lat}&locationLng=${filterBy.currUserLocation.lng}&type=${filterBy.type}&sortBy=${filterBy.sortBy}`;
    var res = await axios.get(`${BASE_URL}${filterBy}`)
    var businessList = await res.data
    return businessList;
}
async function getImgs(type) {
    var filterBy = `?type=${type}`;
    var res = await axios.get(`${BASE_URL}/imgs${filterBy}`)
    return res.data
}

async function getById(businessId) {
    if (!businessId) return _getEmptyBusiness()
    var res = await axios.get(`${BASE_URL}/${businessId}`)
    var business = await res.data
    return business
}

async function add(currBusiness) {
    var res = await axios.post(`${BASE_URL}`, currBusiness)
    var business = await res.data
    return business
}

async function update(currBusiness) {
    var businessId = currBusiness._id
    var currBusiness = JSON.parse(JSON.stringify(currBusiness))
    var res = await axios.put(`${BASE_URL}/${businessId}`, currBusiness)
    var business = await res.data
    return business
}




function _getEmptyBusiness() {
    return {
        "rank": {
            "qty": 0,
            "avg": 0
        },
        "type": "",
        "name": "",
        "phone": "",
        "userName": "",
        "pass": "",
        "address": "",
        "location": {
            "lat": 32.087971200000005,
            "lng": 34.8031581

        },
        "appoints_id": [],
        "products": [
            {},
            {}
        ],
        "prefs": {
            "description": "",
            "preview_img_url": "",
            "profile_img_url": "",
            "header_img_url": ""
        },
        "workHours": [
            {
                "dayOfTheWeek": 0,
                "timeRanges": [
                    {
                        "from": "09:00",
                        "to": " 11:00"
                    },
                    {
                        "from": "12:00",
                        "to": " 15:00"
                    }
                ]
            },
            {
                "dayOfTheWeek": 1,
                "timeRanges": [
                    {
                        "from": "08:00",
                        "to": " 17:00"
                    }
                ]
            },
            {
                "dayOfTheWeek": 2,
                "timeRanges": [
                    {
                        "from": "09:00",
                        "to": " 11:00"
                    }
                ]
            },
            {
                "dayOfTheWeek": 3,
                "timeRanges": [
                    {
                        "from": "09:00",
                        "to": " 11:00"
                    }
                ]
            },
            {
                "dayOfTheWeek": 4,
                "timeRanges": [
                    {
                        "from": "09:00",
                        "to": " 11:00"
                    }
                ]
            },
            {
                "dayOfTheWeek": 5,
                "timeRanges": [
                    {
                        "from": "09:00",
                        "to": " 11:00"
                    }
                ]
            },
            {
                "dayOfTheWeek": 6,
                "timeRanges": [
                    {
                        "from": "09:00",
                        "to": " 11:00"
                    }
                ]
            }
        ]
    }
}

function saveImage(imageToSave) {
    return cloudinary.v2.uploader.upload(imageToSave).then((data) => {
        return data.secure_url
    })
}

export default {
    query,
    getById,
    add,
    getImgs,
    saveImage,
    update

}
