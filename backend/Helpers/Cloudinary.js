import cloud from 'cloudinary'
const cloudinary = cloud.v2

export default cloudinary.config({
    cloud_name: 'Example',
    api_key: '8748374832Example',
    api_secret: 'a676b67565c6767a6767d6Example',
    secure: true
});
