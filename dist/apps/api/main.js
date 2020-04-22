(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/websockets");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_3__);
var _a;




let UsersService = class UsersService {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    create(user) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const createdUser = yield new this.UserModel(user);
            return createdUser.save();
        });
    }
    findUserById(_id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const user = yield this.UserModel.findById(_id).exec();
            if (!user) {
                throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpException"]('Could not find user', 401);
            }
            return user;
        });
    }
    findAllUsers() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const users = yield this.UserModel.find();
            if (!users) {
                throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpException"]('Could not find users', 400);
            }
            return users;
        });
    }
    findByUsername(username) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const user = yield this.UserModel.findOne({ username: username }).exec();
            if (!user) {
                throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpException"]('Could not locate user.', 401);
            }
            return user;
        });
    }
};
UsersService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2__["InjectModel"])('User')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof mongoose__WEBPACK_IMPORTED_MODULE_3__["Model"] !== "undefined" && mongoose__WEBPACK_IMPORTED_MODULE_3__["Model"]) === "function" ? _a : Object])
], UsersService);



/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/passport");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _users_users_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2);
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_5__);
var _a, _b, _c;






let RoomsService = class RoomsService {
    constructor(RoomModel, UserModel, usersService) {
        this.RoomModel = RoomModel;
        this.UserModel = UserModel;
        this.usersService = usersService;
    }
    getRooms() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const rooms = this.RoomModel.find().exec();
            return rooms;
        });
    }
    create(room) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const createdRoom = new this.RoomModel(room);
            return createdRoom.save();
        });
    }
    addCollaborator(info) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const collaborator = yield this.usersService.findByUsername(info.username);
            if (!collaborator) {
                throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpException"]('Could not find collaborator', 400);
            }
            const room = yield this.RoomModel.findById(info.roomId).exec();
            if (!room) {
                throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpException"]('could not find room', 400);
            }
            const newCollab = {
                firstName: collaborator.firstName,
                lastName: collaborator.lastName,
                userId: collaborator._id,
                username: collaborator.username
            };
            room.collaborators.push(newCollab);
            const updatedRoom = yield room.save();
            return updatedRoom;
        });
    }
    getRoomById(roomId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const room = this.RoomModel.findById(roomId).exec();
            if (!room) {
                throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["HttpException"]('could not find room', 400);
            }
            return room;
        });
    }
    addActiveUser(user, roomId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const room = yield this.RoomModel.findById(roomId).exec();
            if (!room) {
                throw new _nestjs_websockets__WEBPACK_IMPORTED_MODULE_5__["WsException"]('could not find room');
            }
            const alreadyJoined = room.activeUsers.find((eachUser) => eachUser.userId == user._id);
            if (alreadyJoined) {
                return { 'msg': 'user already in room' };
            }
            const newActiveUser = {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                userId: user._id
            };
            room.activeUsers.push(newActiveUser);
            yield room.save();
            console.log('active user added');
        });
    }
    removeActiveUser(userId, roomId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const room = yield this.RoomModel.findById(roomId).exec();
            if (!room) {
                throw new _nestjs_websockets__WEBPACK_IMPORTED_MODULE_5__["WsException"]('could not find room');
            }
            const index = room.activeUsers.findIndex((eachUser) => eachUser.userId == userId);
            room.activeUsers.splice(index, 1);
            yield room.save();
            console.log('active user removed');
        });
    }
    getActiveUsers(roomId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const room = yield this.RoomModel.findById(roomId).exec();
            if (!room) {
                throw new _nestjs_websockets__WEBPACK_IMPORTED_MODULE_5__["WsException"]('could not locate room');
            }
            return room.activeUsers;
        });
    }
};
RoomsService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2__["InjectModel"])('Rooms')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_2__["InjectModel"])('User')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof mongoose__WEBPACK_IMPORTED_MODULE_3__["Model"] !== "undefined" && mongoose__WEBPACK_IMPORTED_MODULE_3__["Model"]) === "function" ? _a : Object, typeof (_b = typeof mongoose__WEBPACK_IMPORTED_MODULE_3__["Model"] !== "undefined" && mongoose__WEBPACK_IMPORTED_MODULE_3__["Model"]) === "function" ? _b : Object, typeof (_c = typeof _users_users_service__WEBPACK_IMPORTED_MODULE_4__[/* UsersService */ "a"] !== "undefined" && _users_users_service__WEBPACK_IMPORTED_MODULE_4__[/* UsersService */ "a"]) === "function" ? _c : Object])
], RoomsService);



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _users_users_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_jwt__WEBPACK_IMPORTED_MODULE_3__);
var _a, _b;




let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    verifyPassword(user, pass) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (user.password !== pass) {
                return false;
            }
            return true;
        });
    }
    validateUser(username, password) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const user = yield this.usersService.findByUsername(username);
            const validPassword = yield this.verifyPassword(user, password);
            if (!validPassword) {
                throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_1__["UnauthorizedException"]();
            }
            return user;
        });
    }
    login(user) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const payload = { username: user.username, _id: user._id };
            return {
                access_token: this.jwtService.sign(payload),
            };
        });
    }
};
AuthService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _users_users_service__WEBPACK_IMPORTED_MODULE_2__[/* UsersService */ "a"] !== "undefined" && _users_users_service__WEBPACK_IMPORTED_MODULE_2__[/* UsersService */ "a"]) === "function" ? _a : Object, typeof (_b = typeof _nestjs_jwt__WEBPACK_IMPORTED_MODULE_3__["JwtService"] !== "undefined" && _nestjs_jwt__WEBPACK_IMPORTED_MODULE_3__["JwtService"]) === "function" ? _b : Object])
], AuthService);



/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _users_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(33);
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _schemas_user_schema__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(34);






let UsersModule = class UsersModule {
};
UsersModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [
            _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_4__["MongooseModule"].forFeature([{
                    name: 'User',
                    schema: _schemas_user_schema__WEBPACK_IMPORTED_MODULE_5__[/* UserSchema */ "a"]
                }])
        ],
        providers: [_users_service__WEBPACK_IMPORTED_MODULE_3__[/* UsersService */ "a"]],
        controllers: [_users_controller__WEBPACK_IMPORTED_MODULE_2__[/* UsersController */ "a"]],
        exports: [_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_4__["MongooseModule"], _users_service__WEBPACK_IMPORTED_MODULE_3__[/* UsersService */ "a"]]
    })
], UsersModule);



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return jwtConstants; });
const jwtConstants = {
    secret: 'mysecret'
};


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JwtServicer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(36);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _users_users_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
var _a;






let JwtServicer = class JwtServicer {
    constructor(usersService) {
        this.usersService = usersService;
    }
    verify(socket) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const token = (socket.handshake && socket.handshake.query) ? socket.handshake.query.token : false;
            if (!token) {
                throw new _nestjs_websockets__WEBPACK_IMPORTED_MODULE_3__["WsException"]('Unauthorized. No token found');
            }
            const payload = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__["verify"](token, _constants__WEBPACK_IMPORTED_MODULE_5__[/* jwtConstants */ "a"].secret);
            const user = yield this.usersService.findUserById(payload._id);
            return user;
        });
    }
};
JwtServicer = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _users_users_service__WEBPACK_IMPORTED_MODULE_4__[/* UsersService */ "a"] !== "undefined" && _users_users_service__WEBPACK_IMPORTED_MODULE_4__[/* UsersService */ "a"]) === "function" ? _a : Object])
], JwtServicer);



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);


let AppService = class AppService {
    getData() {
        return { message: 'Welcome to api!' };
    }
};
AppService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], AppService);



/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _auth_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(29);
/* harmony import */ var _local_strategy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(31);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _users_users_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(11);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(14);
/* harmony import */ var _nestjs_jwt__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_nestjs_jwt__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _jwt_strategy__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(35);
/* harmony import */ var _jwt_jwt_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(12);











let AuthModule = class AuthModule {
};
AuthModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        providers: [_auth_service__WEBPACK_IMPORTED_MODULE_2__[/* AuthService */ "a"], _local_strategy__WEBPACK_IMPORTED_MODULE_4__[/* LocalStrategy */ "a"], _jwt_strategy__WEBPACK_IMPORTED_MODULE_9__[/* JwtStrategy */ "a"], _jwt_jwt_service__WEBPACK_IMPORTED_MODULE_10__[/* JwtServicer */ "a"]],
        controllers: [_auth_controller__WEBPACK_IMPORTED_MODULE_3__[/* AuthController */ "a"]],
        imports: [
            _nestjs_passport__WEBPACK_IMPORTED_MODULE_5__["PassportModule"],
            _users_users_module__WEBPACK_IMPORTED_MODULE_6__[/* UsersModule */ "a"],
            _nestjs_jwt__WEBPACK_IMPORTED_MODULE_8__["JwtModule"].register({
                secret: _constants__WEBPACK_IMPORTED_MODULE_7__[/* jwtConstants */ "a"].secret,
                signOptions: { expiresIn: '7d' }
            })
        ],
        exports: [_jwt_jwt_service__WEBPACK_IMPORTED_MODULE_10__[/* JwtServicer */ "a"]]
    })
], AuthModule);



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _rooms_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39);
/* harmony import */ var _rooms_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _schemas_room_schema__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(40);
/* harmony import */ var _users_users_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);







let RoomsModule = class RoomsModule {
};
RoomsModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [
            _users_users_module__WEBPACK_IMPORTED_MODULE_6__[/* UsersModule */ "a"],
            _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_4__["MongooseModule"].forFeature([{
                    name: 'Rooms',
                    schema: _schemas_room_schema__WEBPACK_IMPORTED_MODULE_5__[/* RoomSchema */ "a"]
                }])
        ],
        controllers: [_rooms_controller__WEBPACK_IMPORTED_MODULE_2__[/* RoomsController */ "a"]],
        providers: [_rooms_service__WEBPACK_IMPORTED_MODULE_3__[/* RoomsService */ "a"]],
        exports: [_rooms_service__WEBPACK_IMPORTED_MODULE_3__[/* RoomsService */ "a"]]
    })
], RoomsModule);



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0__, "Message")) __webpack_require__.d(__webpack_exports__, "Message", function() { return _lib_api_interfaces__WEBPACK_IMPORTED_MODULE_0__["Message"]; });

/* harmony import */ var _lib_user_interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var _lib_user_interface__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib_user_interface__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_user_interface__WEBPACK_IMPORTED_MODULE_1__, "Message")) __webpack_require__.d(__webpack_exports__, "Message", function() { return _lib_user_interface__WEBPACK_IMPORTED_MODULE_1__["Message"]; });

/* harmony import */ var _lib_room_interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _lib_room_interface__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lib_room_interface__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_room_interface__WEBPACK_IMPORTED_MODULE_2__, "Message")) __webpack_require__.d(__webpack_exports__, "Message", function() { return _lib_room_interface__WEBPACK_IMPORTED_MODULE_2__["Message"]; });

/* harmony import */ var _lib_credentials_interface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var _lib_credentials_interface__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lib_credentials_interface__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_lib_credentials_interface__WEBPACK_IMPORTED_MODULE_3__, "Message")) __webpack_require__.d(__webpack_exports__, "Message", function() { return _lib_credentials_interface__WEBPACK_IMPORTED_MODULE_3__["Message"]; });







/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JwtAuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__);



let JwtAuthGuard = class JwtAuthGuard extends Object(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"])('jwt') {
};
JwtAuthGuard = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], JwtAuthGuard);



/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 20 */
/***/ (function(module, exports) {



/***/ }),
/* 21 */
/***/ (function(module, exports) {



/***/ }),
/* 22 */
/***/ (function(module, exports) {



/***/ }),
/* 23 */
/***/ (function(module, exports) {



/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _nestjs_serve_static__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27);
/* harmony import */ var _nestjs_serve_static__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_nestjs_serve_static__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(28);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _auth_auth_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(15);
/* harmony import */ var _chat_chat_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(37);
/* harmony import */ var _rooms_rooms_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(16);
/* harmony import */ var _users_users_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(10);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5);
/* harmony import */ var _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_nestjs_mongoose__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(41);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_angular_forms__WEBPACK_IMPORTED_MODULE_11__);












const dbURI =  true ? process.env.MONGODB_URI : undefined;
let AppModule = class AppModule {
};
AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [
            _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ReactiveFormsModule"],
            _nestjs_mongoose__WEBPACK_IMPORTED_MODULE_10__["MongooseModule"].forRoot(dbURI),
            _nestjs_serve_static__WEBPACK_IMPORTED_MODULE_4__["ServeStaticModule"].forRoot({
                rootPath: Object(path__WEBPACK_IMPORTED_MODULE_5__["join"])(__dirname, '..', 'socketproto'),
                exclude: ['/api*']
            }),
            _auth_auth_module__WEBPACK_IMPORTED_MODULE_6__[/* AuthModule */ "a"],
            _chat_chat_module__WEBPACK_IMPORTED_MODULE_7__[/* ChatModule */ "a"],
            _rooms_rooms_module__WEBPACK_IMPORTED_MODULE_8__[/* RoomsModule */ "a"],
            _users_users_module__WEBPACK_IMPORTED_MODULE_9__[/* UsersModule */ "a"]
        ],
        controllers: [_app_controller__WEBPACK_IMPORTED_MODULE_2__[/* AppController */ "a"]],
        providers: [_app_service__WEBPACK_IMPORTED_MODULE_3__[/* AppService */ "a"]]
    })
], AppModule);



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _sockets_api_interfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var _app_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
var _a, _b;




let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])('hello'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", []),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", typeof (_a = typeof _sockets_api_interfaces__WEBPACK_IMPORTED_MODULE_2__["Message"] !== "undefined" && _sockets_api_interfaces__WEBPACK_IMPORTED_MODULE_2__["Message"]) === "function" ? _a : Object)
], AppController.prototype, "getData", null);
AppController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_b = typeof _app_service__WEBPACK_IMPORTED_MODULE_3__[/* AppService */ "a"] !== "undefined" && _app_service__WEBPACK_IMPORTED_MODULE_3__[/* AppService */ "a"]) === "function" ? _b : Object])
], AppController);



/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/serve-static");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _local_auth_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30);
var _a;




let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(req) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.authService.login(req.user);
        });
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["UseGuards"])(_local_auth_guard__WEBPACK_IMPORTED_MODULE_3__[/* LocalAuthGuard */ "a"]),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])('login'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Request"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])('auth'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _auth_service__WEBPACK_IMPORTED_MODULE_2__[/* AuthService */ "a"] !== "undefined" && _auth_service__WEBPACK_IMPORTED_MODULE_2__[/* AuthService */ "a"]) === "function" ? _a : Object])
], AuthController);



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalAuthGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__);



let LocalAuthGuard = class LocalAuthGuard extends Object(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"])('local') {
};
LocalAuthGuard = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
], LocalAuthGuard);



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalStrategy; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32);
/* harmony import */ var passport_local__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport_local__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
var _a;





let LocalStrategy = class LocalStrategy extends Object(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__["PassportStrategy"])(passport_local__WEBPACK_IMPORTED_MODULE_1__["Strategy"]) {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    validate(username, password) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const user = yield this.authService.validateUser(username, password);
            if (!user) {
                throw new _nestjs_common__WEBPACK_IMPORTED_MODULE_3__["UnauthorizedException"]();
            }
            return user;
        });
    }
};
LocalStrategy = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_3__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _auth_service__WEBPACK_IMPORTED_MODULE_4__[/* AuthService */ "a"] !== "undefined" && _auth_service__WEBPACK_IMPORTED_MODULE_4__[/* AuthService */ "a"]) === "function" ? _a : Object])
], LocalStrategy);



/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _users_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _auth_jwt_auth_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);
var _a;




let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    createUser(body) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.usersService.create(body);
        });
    }
    findAll() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.usersService.findAllUsers();
        });
    }
    getUser(body) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.usersService.findByUsername(body.username);
        });
    }
    whoAmI(req) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return req.user;
        });
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])('create'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Body"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", []),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["UseGuards"])(_auth_jwt_auth_guard__WEBPACK_IMPORTED_MODULE_3__[/* JwtAuthGuard */ "a"]),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])('findone'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Body"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["UseGuards"])(_auth_jwt_auth_guard__WEBPACK_IMPORTED_MODULE_3__[/* JwtAuthGuard */ "a"]),
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])('whoami'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Request"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", Promise)
], UsersController.prototype, "whoAmI", null);
UsersController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])('users'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_a = typeof _users_service__WEBPACK_IMPORTED_MODULE_2__[/* UsersService */ "a"] !== "undefined" && _users_service__WEBPACK_IMPORTED_MODULE_2__[/* UsersService */ "a"]) === "function" ? _a : Object])
], UsersController);



/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserSchema; });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"]({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
});


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JwtStrategy; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var passport_jwt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport_jwt__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _nestjs_passport__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);





let JwtStrategy = class JwtStrategy extends Object(_nestjs_passport__WEBPACK_IMPORTED_MODULE_2__["PassportStrategy"])(passport_jwt__WEBPACK_IMPORTED_MODULE_1__["Strategy"]) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt__WEBPACK_IMPORTED_MODULE_1__["ExtractJwt"].fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: _constants__WEBPACK_IMPORTED_MODULE_4__[/* jwtConstants */ "a"].secret,
        });
    }
    validate(payload) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return { userId: payload.sub, username: payload.username };
        });
    }
};
JwtStrategy = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_3__["Injectable"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [])
], JwtStrategy);



/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _chat_gateway__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(38);
/* harmony import */ var _rooms_rooms_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16);
/* harmony import */ var _auth_auth_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);





let ChatModule = class ChatModule {
};
ChatModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Module"])({
        imports: [_rooms_rooms_module__WEBPACK_IMPORTED_MODULE_3__[/* RoomsModule */ "a"], _auth_auth_module__WEBPACK_IMPORTED_MODULE_4__[/* AuthModule */ "a"]],
        providers: [_chat_gateway__WEBPACK_IMPORTED_MODULE_2__[/* ChatGateway */ "a"]]
    })
], ChatModule);



/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatGateway; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _nestjs_websockets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _rooms_rooms_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _auth_jwt_jwt_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_4__);
var _a, _b, _c, _d, _e, _f;





let ChatGateway = class ChatGateway {
    constructor(roomsService, jwtServicer) {
        this.roomsService = roomsService;
        this.jwtServicer = jwtServicer;
    }
    broadcastToRoom(socket, data) {
        socket.broadcast.to(data.room).emit(data.event, data.response);
    }
    getRoomFromSocket(socket) {
        return Object.keys(socket.rooms)[1];
    }
    getUserFromSocket(socket) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.jwtServicer.verify(socket);
        });
    }
    leaveRoom(socket) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const room = this.getRoomFromSocket(socket);
            const user = yield this.getUserFromSocket(socket);
            this.broadcastToRoom(socket, {
                room: room,
                event: 'other_exited_room',
                response: {
                    message: 'someone left',
                    user: user
                }
            });
            socket.leave(room);
            this.roomsService.removeActiveUser(user._id, room);
        });
    }
    handleConnection(socket) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log('*** SOCKET CONNECTED ***');
            socket.on('disconnecting', (reason) => {
                this.leaveRoom(socket);
            });
        });
    }
    handleDisconnect(socket) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log('~~~ SOCKET DISCONNECTED ~~~');
        });
    }
    handleMessage(body, socket) {
        const room = this.getRoomFromSocket(socket);
        this.broadcastToRoom(socket, {
            'room': room,
            'event': 'chatmsg',
            'response': {
                'message': body
            }
        });
    }
    checkForToken(socket) {
        if (socket.handshake.query.token) {
            return true;
        }
        throw new _nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["WsException"]('no token set');
    }
    verifyCollaborator(user, room) {
        return room.collaborators.find((collaborator) => collaborator.userId == user._id);
    }
    doJoinRoom(socket, room, user) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            socket.join(room._id);
            this.broadcastToRoom(socket, {
                'room': room._id,
                'event': 'other_joined_room',
                'response': {
                    'message': 'Someone has joined.',
                    'user': user
                }
            });
            yield this.roomsService.addActiveUser(user, room._id);
            const activeUsers = yield this.roomsService.getActiveUsers(room._id);
            socket.emit('joined_room', {
                'msg': 'You joined the room.',
                'room': room,
                'activeUsers': activeUsers
            });
        });
    }
    joinRoom(data, socket) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const user = yield this.jwtServicer.verify(socket);
            const requestedRoom = yield this.roomsService.getRoomById(data._id);
            if (!this.verifyCollaborator(user, requestedRoom)) {
                socket.emit('err', { 'err': 'You cannot join this room' });
                return;
            }
            if (this.getRoomFromSocket(socket)) {
                this.leaveRoom(socket);
            }
            this.doJoinRoom(socket, requestedRoom, user);
        });
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["WebSocketServer"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", typeof (_a = typeof socket_io__WEBPACK_IMPORTED_MODULE_4__["Server"] !== "undefined" && socket_io__WEBPACK_IMPORTED_MODULE_4__["Server"]) === "function" ? _a : Object)
], ChatGateway.prototype, "server", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["SubscribeMessage"])('chatmsg'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["MessageBody"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["ConnectedSocket"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, typeof (_b = typeof socket_io__WEBPACK_IMPORTED_MODULE_4__["Socket"] !== "undefined" && socket_io__WEBPACK_IMPORTED_MODULE_4__["Socket"]) === "function" ? _b : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", void 0)
], ChatGateway.prototype, "handleMessage", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["SubscribeMessage"])('joinroom'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["MessageBody"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(1, Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["ConnectedSocket"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object, typeof (_c = typeof socket_io__WEBPACK_IMPORTED_MODULE_4__["Socket"] !== "undefined" && socket_io__WEBPACK_IMPORTED_MODULE_4__["Socket"]) === "function" ? _c : Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ChatGateway.prototype, "joinRoom", null);
ChatGateway = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_websockets__WEBPACK_IMPORTED_MODULE_1__["WebSocketGateway"])({ pingTimeout: 30000 }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_e = typeof _rooms_rooms_service__WEBPACK_IMPORTED_MODULE_2__[/* RoomsService */ "a"] !== "undefined" && _rooms_rooms_service__WEBPACK_IMPORTED_MODULE_2__[/* RoomsService */ "a"]) === "function" ? _e : Object, typeof (_f = typeof _auth_jwt_jwt_service__WEBPACK_IMPORTED_MODULE_3__[/* JwtServicer */ "a"] !== "undefined" && _auth_jwt_jwt_service__WEBPACK_IMPORTED_MODULE_3__[/* JwtServicer */ "a"]) === "function" ? _f : Object])
], ChatGateway);



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomsController; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _nestjs_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _rooms_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
var _a, _b, _c, _d, _e;



let RoomsController = class RoomsController {
    constructor(roomsService) {
        this.roomsService = roomsService;
    }
    getRooms() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.roomsService.getRooms();
        });
    }
    roomById(params) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.roomsService.getRoomById(params.id);
        });
    }
    createRoom(room) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.roomsService.create(room);
        });
    }
    addCollaborator(info) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.roomsService.addCollaborator(info);
        });
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])('all'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", []),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], RoomsController.prototype, "getRooms", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Get"])(':id'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Param"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], RoomsController.prototype, "roomById", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])('create'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Body"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], RoomsController.prototype, "createRoom", null);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Post"])('add-collaborator'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Body"])()),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Function),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [Object]),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], RoomsController.prototype, "addCollaborator", null);
RoomsController = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_nestjs_common__WEBPACK_IMPORTED_MODULE_1__["Controller"])('rooms'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [typeof (_e = typeof _rooms_service__WEBPACK_IMPORTED_MODULE_2__[/* RoomsService */ "a"] !== "undefined" && _rooms_service__WEBPACK_IMPORTED_MODULE_2__[/* RoomsService */ "a"]) === "function" ? _e : Object])
], RoomsController);



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoomSchema; });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const CollaboratorSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"]({
    firstName: String,
    lastName: String,
    userId: String,
    username: String
});
const RoomSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__["Schema"]({
    name: String,
    specId: String,
    collaborators: [CollaboratorSchema],
    activeUsers: [CollaboratorSchema]
});


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("@angular/forms");

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(43);


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tslib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var _nestjs_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_nestjs_core__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(25);
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */



function bootstrap() {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
        const app = yield _nestjs_core__WEBPACK_IMPORTED_MODULE_1__["NestFactory"].create(_app_app_module__WEBPACK_IMPORTED_MODULE_2__[/* AppModule */ "a"]);
        app.enableCors({
            origin: 'http://localhost:4200',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin']
        });
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        const port = process.env.PORT || 3333;
        yield app.listen(port, () => {
            console.log('Listening at http://localhost:' + port);
        });
    });
}
bootstrap();


/***/ })
/******/ ])));
//# sourceMappingURL=main.js.map