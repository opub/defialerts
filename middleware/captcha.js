const axios = require('axios');

// axios.interceptors.request.use(request => {
//     console.log('Request', JSON.stringify(request, null, 2))
//     return request
// });

const SITE_KEY = '6LfZwhocAAAAAPhY_rU5G3ocBXKSax71PvlbPaKY';
const SECRET = '6LfZwhocAAAAAE1Ikomn8dp9aDy-Ch6wa7CrBd0-';

module.exports = async (ctx, next) => {
    console.log('validating captcha');

    try {
        const captcha = ctx.request.body.captcha;
        if (!captcha) {
            ctx.unauthorized('user validation missing');
            return;
        }

        const data = {
            secret: SECRET,
            response: captcha
        };

        const result = await axios.post('https://www.google.com/recaptcha/api/siteverify', undefined, { params: data });
        if (!result.data.success) {
            console.error(result.data['error-codes']);
            ctx.unauthorized('user validation failed');
            return;
        }
    }
    catch (e) {
        console.error(e);
        ctx.unauthorized('user validation error');
        return;
    }

    await next()
};