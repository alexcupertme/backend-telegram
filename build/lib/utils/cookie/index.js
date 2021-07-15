"use strict";
class Cookie {
    createCookie(token, expiresIn) {
        return `Authorization=${token}; HttpOnly; Max-Age=${expiresIn}; Path=/api/`;
    }
}
module.exports = new Cookie();
