
export const cookie = {
    getCookieData : (name) => document.cookie.split(';').map(item => item.trim().split('=')).filter(([key, value]) => key === name)[0][1],
    checkCookie : (key) => document.cookie.includes(key),
    setCookie : (name, value, expiry, path) => document.cookie = `${name}=${value};expires=${expiry};path=${path ? path : '/'};Secure;${process.env.NODE_ENV === 'production' ? 'HttpOnly;' : null}`,
    deleteCookie: () => 'hello',
    setDate : (type) => {
        switch (type) {
            case 'half':
                const d = new Date();
                d.setTime(d.getTime() + (60*60*1000));
                return d.toUTCString();
            case 'never':
                const n = new Date();
                n.setTime(n.getTime() + (100*52*7*24*60*60*1000));
                return n.toUTCString();
            case 'delete':
                return 'Thu, 01 Jan 1970 00:00:00 UTC'
            default:
                break;
        }
    }
}
