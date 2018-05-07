webpackJsonp([0],{

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SqliteService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_native__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_items_service__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SqliteService = /** @class */ (function () {
    function SqliteService(itemsService) {
        this.itemsService = itemsService;
    }
    SqliteService.prototype.InitDatabase = function () {
        var self = this;
        this.db = new __WEBPACK_IMPORTED_MODULE_1_ionic_native__["e" /* SQLite */]();
        self.db.openDatabase({
            name: 'forumdb.db',
            location: 'default' // the location field is required
        }).then(function () {
            self.createThreads();
            self.createComments();
            self.createUsers();
        }, function (err) {
            console.error('Unable to open database: ', err);
        });
    };
    SqliteService.prototype.resetDatabase = function () {
        var self = this;
        self.resetUsers();
        self.resetThreads();
        self.resetComments();
    };
    SqliteService.prototype.resetUsers = function () {
        var self = this;
        var query = 'DELETE FROM Users';
        self.db.executeSql(query, {}).then(function (data) {
            console.log('Users removed');
        }, function (err) {
            console.error('Unable to remove users: ', err);
        });
    };
    SqliteService.prototype.resetThreads = function () {
        var self = this;
        var query = 'DELETE FROM Threads';
        self.db.executeSql(query, {}).then(function (data) {
            console.log('Threads removed');
        }, function (err) {
            console.error('Unable to remove Threads: ', err);
        });
    };
    SqliteService.prototype.resetComments = function () {
        var self = this;
        var query = 'DELETE FROM Comments';
        self.db.executeSql(query, {}).then(function (data) {
            console.log('Comments removed');
        }, function (err) {
            console.error('Unable to remove Commments: ', err);
        });
    };
    SqliteService.prototype.printThreads = function () {
        var self = this;
        self.db.executeSql('SELECT * FROM Threads', {}).then(function (data) {
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    console.log(data.rows.item(i));
                    console.log(data.rows.item(i).key);
                    console.log(data.rows.item(i).title);
                    console.log(data.rows.item(i).question);
                }
            }
            else {
                console.log('no threads found..');
            }
        }, function (err) {
            console.error('Unable to print threads: ', err);
        });
    };
    SqliteService.prototype.createThreads = function () {
        var self = this;
        self.db.executeSql('CREATE TABLE IF NOT EXISTS Threads ( key VARCHAR(255) PRIMARY KEY NOT NULL, title text NOT NULL, question text NOT NULL, category text NOT NULL, datecreated text, USER VARCHAR(255), comments INT NULL);', {}).then(function () {
        }, function (err) {
            console.error('Unable to create Threads table: ', err);
        });
    };
    SqliteService.prototype.createComments = function () {
        var self = this;
        self.db.executeSql('CREATE TABLE IF NOT EXISTS Comments ( key VARCHAR(255) PRIMARY KEY NOT NULL, thread VARCHAR(255) NOT NULL, text text NOT NULL, USER VARCHAR(255) NOT NULL, datecreated text, votesUp INT NULL, votesDown INT NULL);', {}).then(function () {
        }, function (err) {
            console.error('Unable to create Comments table: ', err);
        });
    };
    SqliteService.prototype.createUsers = function () {
        var self = this;
        self.db.executeSql('CREATE TABLE IF NOT EXISTS Users ( uid text PRIMARY KEY NOT NULL, username text NOT NULL); ', {}).then(function () {
        }, function (err) {
            console.error('Unable to create Users table: ', err);
        });
    };
    SqliteService.prototype.saveUsers = function (users) {
        var self = this;
        users.forEach(function (user) {
            self.addUser(user);
        });
    };
    SqliteService.prototype.addUser = function (user) {
        var self = this;
        var query = 'INSERT INTO Users (uid, username) Values (?,?)';
        self.db.executeSql(query, [user.uid, user.username]).then(function (data) {
            console.log('user ' + user.username + ' added');
        }, function (err) {
            console.error('Unable to add user: ', err);
        });
    };
    SqliteService.prototype.saveThreads = function (threads) {
        var self = this;
        var users = [];
        threads.forEach(function (thread) {
            if (!self.itemsService.includesItem(users, function (u) { return u.uid === thread.user.uid; })) {
                console.log('in add user..' + thread.user.username);
                users.push(thread.user);
            }
            else {
                console.log('user found: ' + thread.user.username);
            }
            self.addThread(thread);
        });
        self.saveUsers(users);
    };
    SqliteService.prototype.addThread = function (thread) {
        var self = this;
        var query = 'INSERT INTO Threads (key, title, question, category, datecreated, user, comments) VALUES (?,?,?,?,?,?,?)';
        self.db.executeSql(query, [
            thread.key,
            thread.title,
            thread.question,
            thread.category,
            thread.dateCreated,
            thread.user.uid,
            thread.comments
        ]).then(function (data) {
            console.log('thread ' + thread.key + ' added');
        }, function (err) {
            console.error('Unable to add thread: ', err);
        });
    };
    SqliteService.prototype.getThreads = function () {
        var self = this;
        return self.db.executeSql('SELECT Threads.*, username FROM Threads INNER JOIN Users ON Threads.user = Users.uid', {});
    };
    SqliteService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_items_service__["a" /* ItemsService */]])
    ], SqliteService);
    return SqliteService;
}());

//# sourceMappingURL=sqlite.service.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__threads_threads__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_profile__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__about_about__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_auth_service__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TabsPage = /** @class */ (function () {
    function TabsPage(navCtrl, authService, events) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.events = events;
        this.newThreads = '';
        this.selectedTab = -1;
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.threadsPage = __WEBPACK_IMPORTED_MODULE_2__threads_threads__["a" /* ThreadsPage */];
        this.profilePage = __WEBPACK_IMPORTED_MODULE_3__profile_profile__["a" /* ProfilePage */];
        this.aboutPage = __WEBPACK_IMPORTED_MODULE_4__about_about__["a" /* AboutPage */];
    }
    TabsPage.prototype.ngOnInit = function () {
        this.startListening();
    };
    TabsPage.prototype.startListening = function () {
        var self = this;
        self.events.subscribe('thread:created', function (threadData) {
            if (self.newThreads === '') {
                self.newThreads = '1';
            }
            else {
                self.newThreads = (+self.newThreads + 1).toString();
            }
        });
        self.events.subscribe('threads:viewed', function (threadData) {
            self.newThreads = '';
        });
    };
    TabsPage.prototype.clicked = function () {
        var self = this;
        if (self.newThreads !== '') {
            self.events.publish('threads:add');
            self.newThreads = '';
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('forumTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Tabs */])
    ], TabsPage.prototype, "tabRef", void 0);
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Projects\Attendant\src\pages\tabs\tabs.html"*/'<ion-tabs #forumTabs [selectedIndex]="0" (click)="clicked()">\n    <ion-tab tabIcon="chatboxes" #content tabTitle="Threads" [root]="threadsPage" tabBadge="{{newThreads}}" tabBadgeStyle="danger"></ion-tab>\n    <ion-tab tabIcon="person" #content tabTitle="Profile" [root]="profilePage"></ion-tab>\n    <ion-tab tabIcon="information-circle" #content tabTitle="About" [root]="aboutPage"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"C:\Projects\Attendant\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__shared_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MappingsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_items_service__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MappingsService = /** @class */ (function () {
    function MappingsService(itemsService) {
        this.itemsService = itemsService;
    }
    MappingsService.prototype.getThreads = function (snapshot) {
        var threads = [];
        if (snapshot.val() == null)
            return threads;
        var list = snapshot.val();
        Object.keys(snapshot.val()).map(function (key) {
            var thread = list[key];
            threads.push({
                key: key,
                title: thread.title,
                question: thread.question,
                category: thread.category,
                dateCreated: thread.dateCreated,
                user: { uid: thread.user.uid, username: thread.user.username },
                comments: thread.comments == null ? 0 : thread.comments
            });
        });
        return threads;
    };
    MappingsService.prototype.getThread = function (snapshot, key) {
        var thread = {
            key: key,
            title: snapshot.title,
            question: snapshot.question,
            category: snapshot.category,
            dateCreated: snapshot.dateCreated,
            user: snapshot.user,
            comments: snapshot.comments == null ? 0 : snapshot.comments
        };
        return thread;
    };
    MappingsService.prototype.getComments = function (snapshot) {
        var _this = this;
        var comments = [];
        if (snapshot.val() == null)
            return comments;
        var list = snapshot.val();
        Object.keys(snapshot.val()).map(function (key) {
            var comment = list[key];
            //console.log(comment.votes);
            _this.itemsService.groupByBoolean(comment.votes, true);
            comments.push({
                key: key,
                text: comment.text,
                thread: comment.thread,
                dateCreated: comment.dateCreated,
                user: comment.user,
                votesUp: _this.itemsService.groupByBoolean(comment.votes, true),
                votesDown: _this.itemsService.groupByBoolean(comment.votes, false)
            });
        });
        return comments;
    };
    MappingsService.prototype.getComment = function (snapshot, commentKey) {
        var comment;
        if (snapshot.val() == null)
            return null;
        var snapshotComment = snapshot.val();
        console.log(snapshotComment);
        comment = {
            key: commentKey,
            text: snapshotComment.text,
            thread: snapshotComment.thread,
            dateCreated: snapshotComment.dateCreated,
            user: snapshotComment.user,
            votesUp: this.itemsService.groupByBoolean(snapshotComment.votes, true),
            votesDown: this.itemsService.groupByBoolean(snapshotComment.votes, false)
        };
        return comment;
    };
    MappingsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_items_service__["a" /* ItemsService */]])
    ], MappingsService);
    return MappingsService;
}());

//# sourceMappingURL=mappings.service.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_data_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_auth_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_validators_checked_validator__ = __webpack_require__(815);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_validators_email_validator__ = __webpack_require__(816);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SignupPage = /** @class */ (function () {
    function SignupPage(nav, loadingCtrl, toastCtrl, viewCtrl, fb, dataService, authService) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.viewCtrl = viewCtrl;
        this.fb = fb;
        this.dataService = dataService;
        this.authService = authService;
    }
    SignupPage.prototype.ngOnInit = function () {
        this.createFirebaseAccountForm = this.fb.group({
            'username': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(8)])],
            'email': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_6__shared_validators_email_validator__["a" /* EmailValidator */].isValid])],
            'password': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(5)])],
            'dateOfBirth': [new Date().toISOString().slice(0, 10), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            'terms': [false, __WEBPACK_IMPORTED_MODULE_5__shared_validators_checked_validator__["a" /* CheckedValidator */].isChecked]
        });
        this.username = this.createFirebaseAccountForm.controls['username'];
        this.email = this.createFirebaseAccountForm.controls['email'];
        this.password = this.createFirebaseAccountForm.controls['password'];
        this.dateOfBirth = this.createFirebaseAccountForm.controls['dateOfBirth'];
        this.terms = this.createFirebaseAccountForm.controls['terms'];
    };
    SignupPage.prototype.getFormattedDate = function () {
        var now = new Date();
        var mm = now.getMonth() + 1;
        var dd = now.getDate();
        var formattedDate = [now.getFullYear(), !mm[1] && '0', mm, !dd[1] && '0', dd].join('-');
        return formattedDate;
    };
    SignupPage.prototype.onSubmit = function (signupForm) {
        var self = this;
        if (this.createFirebaseAccountForm.valid) {
            var loader_1 = this.loadingCtrl.create({
                content: 'Creating account...',
                dismissOnPageChange: true
            });
            var newUser_1 = {
                email: signupForm.email,
                password: signupForm.password
            };
            loader_1.present();
            this.authService.registerUser(newUser_1)
                .then(function (result) {
                self.authService.addUser(signupForm.username, signupForm.dateOfBirth, self.authService.getLoggedInUser().uid);
                loader_1.dismiss()
                    .then(function () {
                    self.viewCtrl.dismiss({
                        user: newUser_1
                    }).then(function () {
                        var toast = self.toastCtrl.create({
                            message: 'Account created successfully',
                            duration: 4000,
                            position: 'top'
                        });
                        toast.present();
                        self.CreateAndUploadDefaultImage();
                    });
                });
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(error);
                loader_1.dismiss().then(function () {
                    var toast = self.toastCtrl.create({
                        message: errorMessage,
                        duration: 4000,
                        position: 'top'
                    });
                    toast.present();
                });
            });
        }
    };
    SignupPage.prototype.CreateAndUploadDefaultImage = function () {
        var self = this;
        var imageData = 'assets/images/profile.png';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', imageData, true);
        xhr.responseType = 'blob';
        xhr.onload = function (e) {
            if (this.status === 200) {
                var myBlob = this.response;
                // myBlob is now the blob that the object URL pointed to.
                self.startUploading(myBlob);
            }
        };
        xhr.send();
    };
    SignupPage.prototype.startUploading = function (file) {
        var self = this;
        var uid = self.authService.getLoggedInUser().uid;
        var progress = 0;
        // display loader
        var loader = this.loadingCtrl.create({
            content: 'Uploading default image..',
        });
        loader.present();
        // Upload file and metadata to the object 'images/mountains.jpg'
        var metadata = {
            contentType: 'image/png',
            name: 'profile.png',
            cacheControl: 'no-cache',
        };
        var uploadTask = self.dataService.getStorageRef().child('images/' + uid + '/profile.png').put(file, metadata);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed', function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, function (error) {
            loader.dismiss().then(function () {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            });
        }, function () {
            loader.dismiss().then(function () {
                // Upload completed successfully, now we can get the download URL
                var downloadURL = uploadTask.snapshot.downloadURL;
                self.dataService.setUserImage(uid);
            });
        });
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Projects\Attendant\src\pages\signup\signup.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Signup</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content padding>\n    <form [formGroup]="createFirebaseAccountForm" (ngSubmit)="onSubmit(createFirebaseAccountForm.value)">\n        <ion-list>\n            <ion-list-header>\n                Firebase account\n            </ion-list-header>\n            <ion-item [class.error]="!email.valid && email.touched">\n                <ion-label floating>Email address</ion-label>\n                <ion-input type="text" value="" [formControl]="email"></ion-input>\n            </ion-item>\n            <div *ngIf="email.hasError(\'required\') && email.touched" class="error-box">* Email is required.</div>\n            <div *ngIf="email.hasError(\'isValid\') && email.touched" class="error-box">* Enter a valid email address.</div>\n            <ion-item [class.error]="!password.valid && password.touched">\n                <ion-label floating>Password</ion-label>\n                <ion-input type="password" value="" [formControl]="password"></ion-input>\n            </ion-item>\n            <div *ngIf="password.hasError(\'required\') && password.touched" class="error-box">* Password is required.</div>\n            <div *ngIf="password.hasError(\'minlength\') && password.touched" class="error-box">* Minimum password length is 5.</div>\n        </ion-list>\n        <ion-list>\n            <ion-list-header>\n                Basic info\n            </ion-list-header>\n            <ion-item [class.error]="!username.valid && username.touched">\n                <ion-label floating>Username</ion-label>\n                <ion-input type="text" value="" [formControl]="username"></ion-input>\n            </ion-item>\n            <div *ngIf="username.hasError(\'required\') && username.touched" class="error-box">* Username is required.</div>\n            <div *ngIf="username.hasError(\'minlength\') && username.touched" class="error-box">* Minimum password length is 8.</div>\n            <ion-item>\n                <ion-label>Date of Birth</ion-label>\n                <ion-datetime displayFormat="MMM DD YYYY" [formControl]="dateOfBirth"></ion-datetime>\n            </ion-item>\n            <ion-item>\n                <ion-label>I accept terms of use</ion-label>\n                <ion-toggle [formControl]="terms"></ion-toggle>\n            </ion-item>\n            <div *ngIf="terms.hasError(\'isChecked\') && terms.touched" class="error-box">* You need to accept the terms of use.</div>\n        </ion-list>\n        <button ion-button type="submit" class="custom-button" [disabled]="!createFirebaseAccountForm.valid" block>Confirm</button>\n    </form>\n</ion-content>'/*ion-inline-end:"C:\Projects\Attendant\src\pages\signup\signup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__shared_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_auth_service__["a" /* AuthService */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 166:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 166;

/***/ }),

/***/ 211:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 211;

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DataService = /** @class */ (function () {
    function DataService() {
        this.databaseRef = firebase.database();
        this.usersRef = firebase.database().ref('users');
        this.threadsRef = firebase.database().ref('threads');
        this.commentsRef = firebase.database().ref('comments');
        this.statisticsRef = firebase.database().ref('statistics');
        this.storageRef = firebase.storage().ref();
        this.connectionRef = firebase.database().ref('.info/connected');
        this.connected = false;
        var self = this;
        try {
            self.checkFirebaseConnection();
            /*
            self.storageRef.child('images/default/profile.png').getDownloadURL().then(function (url) {
                self.defaultImageUrl = url.split('?')[0] + '?alt=media';
            });
            */
            self.InitData();
        }
        catch (error) {
            console.log('Data Service error:' + error);
        }
    }
    DataService.prototype.checkFirebaseConnection = function () {
        try {
            var self = this;
            var connectedRef = self.getConnectionRef();
            connectedRef.on('value', function (snap) {
                console.log(snap.val());
                if (snap.val() === true) {
                    console.log('Firebase: Connected:');
                    self.connected = true;
                }
                else {
                    console.log('Firebase: No connection:');
                    self.connected = false;
                }
            });
        }
        catch (error) {
            self.connected = false;
        }
    };
    DataService.prototype.isFirebaseConnected = function () {
        return this.connected;
    };
    DataService.prototype.InitData = function () {
        var self = this;
        // Set statistics/threads = 1 for the first time only
        self.getStatisticsRef().child('threads').transaction(function (currentRank) {
            if (currentRank === null) {
                return 1;
            }
        }, function (error, committed, snapshot) {
            if (error) {
                console.log('Transaction failed abnormally!', error);
            }
            else if (!committed) {
                console.log('We aborted the transaction because there is already one thread.');
            }
            else {
                console.log('Threads number initialized!');
                var thread = {
                    key: null,
                    title: 'Welcome to Forum!',
                    question: 'Congratulations! It seems that you have successfully setup the Forum app.',
                    category: 'welcome',
                    dateCreated: new Date().toString(),
                    user: { uid: 'default', username: 'Administrator' },
                    comments: 0
                };
                var firstThreadRef = self.threadsRef.push();
                firstThreadRef.setWithPriority(thread, 1).then(function (dataShapshot) {
                    console.log('Congratulations! You have created the first thread!');
                });
            }
            console.log('commited', snapshot.val());
        }, false);
    };
    DataService.prototype.getDatabaseRef = function () {
        return this.databaseRef;
    };
    DataService.prototype.getConnectionRef = function () {
        return this.connectionRef;
    };
    DataService.prototype.goOffline = function () {
        firebase.database().goOffline();
    };
    DataService.prototype.goOnline = function () {
        firebase.database().goOnline();
    };
    DataService.prototype.getDefaultImageUrl = function () {
        return this.defaultImageUrl;
    };
    DataService.prototype.getTotalThreads = function () {
        return this.statisticsRef.child('threads').once('value');
    };
    DataService.prototype.getThreadsRef = function () {
        return this.threadsRef;
    };
    DataService.prototype.getCommentsRef = function () {
        return this.commentsRef;
    };
    DataService.prototype.getStatisticsRef = function () {
        return this.statisticsRef;
    };
    DataService.prototype.getUsersRef = function () {
        return this.usersRef;
    };
    DataService.prototype.getStorageRef = function () {
        return this.storageRef;
    };
    DataService.prototype.getThreadCommentsRef = function (threadKey) {
        return this.commentsRef.orderByChild('thread').equalTo(threadKey);
    };
    DataService.prototype.loadThreads = function () {
        return this.threadsRef.once('value');
    };
    DataService.prototype.submitThread = function (thread, priority) {
        var newThreadRef = this.threadsRef.push();
        this.statisticsRef.child('threads').set(priority);
        console.log(priority);
        return newThreadRef.setWithPriority(thread, priority);
    };
    DataService.prototype.addThreadToFavorites = function (userKey, threadKey) {
        return this.usersRef.child(userKey + '/favorites/' + threadKey).set(true);
    };
    DataService.prototype.getFavoriteThreads = function (user) {
        return this.usersRef.child(user + '/favorites/').once('value');
    };
    DataService.prototype.setUserImage = function (uid) {
        this.usersRef.child(uid).update({
            image: true
        });
    };
    DataService.prototype.loadComments = function (threadKey) {
        return this.commentsRef.orderByChild('thread').equalTo(threadKey).once('value');
    };
    DataService.prototype.submitComment = function (threadKey, comment) {
        var _this = this;
        // let commentRef = this.commentsRef.push();
        // let commentkey: string = commentRef.key;
        this.commentsRef.child(comment.key).set(comment);
        return this.threadsRef.child(threadKey + '/comments').once('value')
            .then(function (snapshot) {
            var numberOfComments = snapshot == null ? 0 : snapshot.val();
            _this.threadsRef.child(threadKey + '/comments').set(numberOfComments + 1);
        });
    };
    DataService.prototype.voteComment = function (commentKey, like, user) {
        var commentRef = this.commentsRef.child(commentKey + '/votes/' + user);
        return commentRef.set(like);
    };
    DataService.prototype.getUsername = function (userUid) {
        return this.usersRef.child(userUid + '/username').once('value');
    };
    DataService.prototype.getUser = function (userUid) {
        return this.usersRef.child(userUid).once('value');
    };
    DataService.prototype.getUserThreads = function (userUid) {
        return this.threadsRef.orderByChild('user/uid').equalTo(userUid).once('value');
    };
    DataService.prototype.getUserComments = function (userUid) {
        return this.commentsRef.orderByChild('user/uid').equalTo(userUid).once('value');
    };
    DataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], DataService);
    return DataService;
}());

//# sourceMappingURL=data.service.js.map

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AuthService = /** @class */ (function () {
    function AuthService() {
        this.usersRef = firebase.database().ref('users');
    }
    AuthService.prototype.registerUser = function (user) {
        return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
    };
    AuthService.prototype.signInUser = function (email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };
    AuthService.prototype.signOut = function () {
        return firebase.auth().signOut();
    };
    AuthService.prototype.addUser = function (username, dateOfBirth, uid) {
        this.usersRef.child(uid).update({
            username: username,
            dateOfBirth: dateOfBirth
        });
    };
    AuthService.prototype.getLoggedInUser = function () {
        return firebase.auth().currentUser;
    };
    AuthService.prototype.onAuthStateChanged = function (callback) {
        return firebase.auth().onAuthStateChanged(callback);
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThreadsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__thread_create_thread_create__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__thread_comments_thread_comments__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_auth_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_data_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_mappings_service__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_services_items_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_services_sqlite_service__ = __webpack_require__(152);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ThreadsPage = /** @class */ (function () {
    function ThreadsPage(navCtrl, modalCtrl, toastCtrl, authService, dataService, sqliteService, mappingsService, itemsService, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.authService = authService;
        this.dataService = dataService;
        this.sqliteService = sqliteService;
        this.mappingsService = mappingsService;
        this.itemsService = itemsService;
        this.events = events;
        this.segment = 'all';
        this.selectedSegment = this.segment;
        this.queryText = '';
        this.pageSize = 3;
        this.loading = true;
        this.internetConnected = true;
        this.threads = [];
        this.newThreads = [];
        this.firebaseConnectionAttempts = 0;
        this.networkConnected = function (connection) {
            var self = _this;
            self.internetConnected = connection[0];
            console.log('NetworkConnected event: ' + self.internetConnected);
            if (self.internetConnected) {
                self.threads = [];
                self.loadThreads(true);
            }
            else {
                self.notify('Connection lost. Working offline..');
                // save current threads..
                setTimeout(function () {
                    console.log(self.threads.length);
                    self.sqliteService.saveThreads(self.threads);
                    self.loadSqliteThreads();
                }, 1000);
            }
        };
        // Notice function declarion to keep the right this reference
        this.onThreadAdded = function (childSnapshot, prevChildKey) {
            var priority = childSnapshot.val(); // priority..
            var self = _this;
            self.events.publish('thread:created');
            // fetch new thread..
            self.dataService.getThreadsRef().orderByPriority().equalTo(priority).once('value').then(function (dataSnapshot) {
                var key = Object.keys(dataSnapshot.val())[0];
                var newThread = self.mappingsService.getThread(dataSnapshot.val()[key], key);
                self.newThreads.push(newThread);
            });
        };
        this.addNewThreads = function () {
            var self = _this;
            self.newThreads.forEach(function (thread) {
                self.threads.unshift(thread);
            });
            self.newThreads = [];
            self.scrollToTop();
            self.events.publish('threads:viewed');
        };
    }
    ThreadsPage.prototype.ngOnInit = function () {
        var self = this;
        self.segment = 'all';
        self.events.subscribe('network:connected', self.networkConnected);
        self.events.subscribe('threads:add', self.addNewThreads);
        self.checkFirebase();
    };
    ThreadsPage.prototype.checkFirebase = function () {
        var self = this;
        if (!self.dataService.isFirebaseConnected()) {
            setTimeout(function () {
                console.log('Retry : ' + self.firebaseConnectionAttempts);
                self.firebaseConnectionAttempts++;
                if (self.firebaseConnectionAttempts < 5) {
                    self.checkFirebase();
                }
                else {
                    self.internetConnected = false;
                    self.dataService.goOffline();
                    self.loadSqliteThreads();
                }
            }, 1000);
        }
        else {
            console.log('Firebase connection found (threads.ts) - attempt: ' + self.firebaseConnectionAttempts);
            self.dataService.getStatisticsRef().on('child_changed', self.onThreadAdded);
            if (self.authService.getLoggedInUser() === null) {
                //
            }
            else {
                self.loadThreads(true);
            }
        }
    };
    ThreadsPage.prototype.loadSqliteThreads = function () {
        var self = this;
        if (self.threads.length > 0)
            return;
        self.threads = [];
        console.log('Loading from db..');
        self.sqliteService.getThreads().then(function (data) {
            console.log('Found in db: ' + data.rows.length + ' threads');
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    var thread = {
                        key: data.rows.item(i).key,
                        title: data.rows.item(i).title,
                        question: data.rows.item(i).question,
                        category: data.rows.item(i).category,
                        dateCreated: data.rows.item(i).datecreated,
                        user: { uid: data.rows.item(i).user, username: data.rows.item(i).username },
                        comments: data.rows.item(i).comments
                    };
                    self.threads.push(thread);
                    console.log('Thread added from db:' + thread.key);
                    console.log(thread);
                }
                self.loading = false;
            }
        }, function (error) {
            console.log('Error: ' + JSON.stringify(error));
            self.loading = true;
        });
    };
    ThreadsPage.prototype.loadThreads = function (fromStart) {
        var self = this;
        if (fromStart) {
            self.loading = true;
            self.threads = [];
            self.newThreads = [];
            if (self.segment === 'all') {
                this.dataService.getTotalThreads().then(function (snapshot) {
                    self.start = snapshot.val();
                    self.getThreads();
                });
            }
            else {
                self.start = 0;
                self.favoriteThreadKeys = [];
                self.dataService.getFavoriteThreads(self.authService.getLoggedInUser().uid).then(function (dataSnapshot) {
                    var favoriteThreads = dataSnapshot.val();
                    self.itemsService.getKeys(favoriteThreads).forEach(function (threadKey) {
                        self.start++;
                        self.favoriteThreadKeys.push(threadKey);
                    });
                    self.getThreads();
                });
            }
        }
        else {
            self.getThreads();
        }
    };
    ThreadsPage.prototype.getThreads = function () {
        var _this = this;
        var self = this;
        var startFrom = self.start - self.pageSize;
        if (startFrom < 0)
            startFrom = 0;
        if (self.segment === 'all') {
            this.dataService.getThreadsRef().orderByPriority().startAt(startFrom).endAt(self.start).once('value', function (snapshot) {
                self.itemsService.reversedItems(self.mappingsService.getThreads(snapshot)).forEach(function (thread) {
                    self.threads.push(thread);
                });
                self.start -= (self.pageSize + 1);
                self.events.publish('threads:viewed');
                self.loading = false;
            });
        }
        else {
            self.favoriteThreadKeys.forEach(function (key) {
                _this.dataService.getThreadsRef().child(key).once('value')
                    .then(function (dataSnapshot) {
                    self.threads.unshift(self.mappingsService.getThread(dataSnapshot.val(), key));
                });
            });
            self.events.publish('threads:viewed');
            self.loading = false;
        }
    };
    ThreadsPage.prototype.filterThreads = function (segment) {
        if (this.selectedSegment !== this.segment) {
            this.selectedSegment = this.segment;
            if (this.selectedSegment === 'favorites')
                this.queryText = '';
            if (this.internetConnected)
                // Initialize
                this.loadThreads(true);
        }
        else {
            this.scrollToTop();
        }
    };
    ThreadsPage.prototype.searchThreads = function () {
        var self = this;
        if (self.queryText.trim().length !== 0) {
            self.segment = 'all';
            // empty current threads
            self.threads = [];
            self.dataService.loadThreads().then(function (snapshot) {
                self.itemsService.reversedItems(self.mappingsService.getThreads(snapshot)).forEach(function (thread) {
                    if (thread.title.toLowerCase().includes(self.queryText.toLowerCase()))
                        self.threads.push(thread);
                });
            });
        }
        else {
            this.loadThreads(true);
        }
    };
    ThreadsPage.prototype.createThread = function () {
        var _this = this;
        var self = this;
        var modalPage = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__thread_create_thread_create__["a" /* ThreadCreatePage */]);
        modalPage.onDidDismiss(function (data) {
            if (data) {
                var toast = _this.toastCtrl.create({
                    message: 'Thread created',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present();
                if (data.priority === 1)
                    self.newThreads.push(data.thread);
                self.addNewThreads();
            }
        });
        modalPage.present();
    };
    ThreadsPage.prototype.viewComments = function (key) {
        if (this.internetConnected) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__thread_comments_thread_comments__["a" /* ThreadCommentsPage */], {
                threadKey: key
            });
        }
        else {
            this.notify('Network not found..');
        }
    };
    ThreadsPage.prototype.reloadThreads = function (refresher) {
        this.queryText = '';
        if (this.internetConnected) {
            this.loadThreads(true);
            refresher.complete();
        }
        else {
            refresher.complete();
        }
    };
    ThreadsPage.prototype.fetchNextThreads = function (infiniteScroll) {
        if (this.start > 0 && this.internetConnected) {
            this.loadThreads(false);
            infiniteScroll.complete();
        }
        else {
            infiniteScroll.complete();
        }
    };
    ThreadsPage.prototype.scrollToTop = function () {
        var self = this;
        setTimeout(function () {
            self.content.scrollToTop();
        }, 1500);
    };
    ThreadsPage.prototype.notify = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], ThreadsPage.prototype, "content", void 0);
    ThreadsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Projects\Attendant\src\pages\threads\threads.html"*/'<ion-header>\n  <ion-navbar no-border-bottom>\n    <button ion-button menuToggle>\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-segment [(ngModel)]="segment" (ionChange)="filterThreads(segment)">\n      <ion-segment-button value="all">\n        All\n      </ion-segment-button>\n      <ion-segment-button value="favorites">\n        Favorites\n      </ion-segment-button>\n    </ion-segment>\n\n    <ion-buttons end>\n      <button ion-button *ngIf="!internetConnected" (click)="notify(\'Working offline..\')">\n        <ion-icon name="warning"></ion-icon>\n      </button>\n      <button ion-button (click)="createThread()" *ngIf="internetConnected">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n  <ion-toolbar no-border-top>\n    <ion-searchbar primary [(ngModel)]="queryText" (ionInput)="searchThreads()" placeholder="Search for a thread..">\n    </ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="reloadThreads($event)" *ngIf="segment==\'all\'">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <div *ngIf="loading">\n    <img src="assets/images/ring.gif" style="display:block; margin:auto" />\n  </div>\n\n  <ion-list *ngIf="!loading">\n    <forum-thread *ngFor="let thread of threads" [thread]="thread" (onViewComments)="viewComments($event)"></forum-thread>\n  </ion-list>\n\n  <ion-infinite-scroll (ionInfinite)="fetchNextThreads($event)" threshold="10px" *ngIf="(start > 0) && (queryText.trim().length == 0) && segment==\'all\' && internetConnected">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"C:\Projects\Attendant\src\pages\threads\threads.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_5__shared_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_8__shared_services_sqlite_service__["a" /* SqliteService */],
            __WEBPACK_IMPORTED_MODULE_6__shared_services_mappings_service__["a" /* MappingsService */],
            __WEBPACK_IMPORTED_MODULE_7__shared_services_items_service__["a" /* ItemsService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], ThreadsPage);
    return ThreadsPage;
}());

//# sourceMappingURL=threads.js.map

/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThreadCreatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_data_service__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ThreadCreatePage = /** @class */ (function () {
    function ThreadCreatePage(nav, loadingCtrl, viewCtrl, fb, authService, dataService) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.fb = fb;
        this.authService = authService;
        this.dataService = dataService;
    }
    ThreadCreatePage.prototype.ngOnInit = function () {
        console.log('in thread create..');
        this.createThreadForm = this.fb.group({
            'title': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(8)])],
            'question': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(10)])],
            'category': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(1)])]
        });
        this.title = this.createThreadForm.controls['title'];
        this.question = this.createThreadForm.controls['question'];
        this.category = this.createThreadForm.controls['category'];
    };
    ThreadCreatePage.prototype.cancelNewThread = function () {
        this.viewCtrl.dismiss();
    };
    ThreadCreatePage.prototype.onSubmit = function (thread) {
        var self = this;
        if (this.createThreadForm.valid) {
            var loader_1 = this.loadingCtrl.create({
                content: 'Posting thread...',
                dismissOnPageChange: true
            });
            loader_1.present();
            var uid_1 = self.authService.getLoggedInUser().uid;
            self.dataService.getUsername(uid_1).then(function (snapshot) {
                var username = snapshot.val();
                self.dataService.getTotalThreads().then(function (snapshot) {
                    var currentNumber = snapshot.val();
                    var newPriority = currentNumber === null ? 1 : (currentNumber + 1);
                    var newThread = {
                        key: null,
                        title: thread.title,
                        question: thread.question,
                        category: thread.category,
                        user: { uid: uid_1, username: username },
                        dateCreated: new Date().toString(),
                        comments: null
                    };
                    self.dataService.submitThread(newThread, newPriority)
                        .then(function (snapshot) {
                        loader_1.dismiss()
                            .then(function () {
                            self.viewCtrl.dismiss({
                                thread: newThread,
                                priority: newPriority
                            });
                        });
                    }, function (error) {
                        // The Promise was rejected.
                        console.error(error);
                        loader_1.dismiss();
                    });
                });
            });
        }
    };
    ThreadCreatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Projects\Attendant\src\pages\thread-create\thread-create.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>New Thread</ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="cancelNewThread()">\n        <ion-icon name="arrow-back"></ion-icon> Cancel\n      </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <form [formGroup]="createThreadForm" (ngSubmit)="onSubmit(createThreadForm.value)">\n        <ion-item [class.error]="!title.valid && title.touched">\n            <ion-label floating>Title</ion-label>\n            <ion-input type="text" value="" [formControl]="title"></ion-input>\n        </ion-item>\n        <div *ngIf="title.hasError(\'required\') && title.touched" class="error-box">* Title is required.</div>\n        <div *ngIf="title.hasError(\'minlength\') && title.touched" class="error-box">* Minimum password length is 8.</div>\n        <ion-item [class.error]="!question.valid && question.touched">\n            <ion-label floating>Question</ion-label>\n            <ion-textarea [formControl]="question" rows="6"></ion-textarea>\n        </ion-item>\n        <div *ngIf="question.hasError(\'required\') && question.touched" class="error-box">* Question is required.</div>\n        <div *ngIf="question.hasError(\'minlength\') && question.touched" class="error-box">* Type at least 100 characters.</div>\n        <ion-item>\n            <ion-label>Category</ion-label>\n            <ion-select multiple="false" [formControl]="category">\n                <ion-option value="components" checked="true">Components</ion-option>\n                <ion-option value="native">Native</ion-option>\n                <ion-option value="theming">Theming</ion-option>\n                <ion-option value="ionicons">Ionicons</ion-option>\n                <ion-option value="cli">CLI</ion-option>\n            </ion-select>\n        </ion-item>\n        <div *ngIf="category.hasError(\'minlength\')" class="error-box">* Select at least one category.</div>\n        <br/><br/>\n        <button ion-button type="submit" class="custom-button" [disabled]="!createThreadForm.valid" block>Submit</button>\n    </form>\n</ion-content>'/*ion-inline-end:"C:\Projects\Attendant\src\pages\thread-create\thread-create.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_data_service__["a" /* DataService */]])
    ], ThreadCreatePage);
    return ThreadCreatePage;
}());

//# sourceMappingURL=thread-create.js.map

/***/ }),

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThreadCommentsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__comment_create_comment_create__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_data_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_items_service__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_mappings_service__ = __webpack_require__(154);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ThreadCommentsPage = /** @class */ (function () {
    function ThreadCommentsPage(actionSheeCtrl, modalCtrl, toastCtrl, loadingCtrl, navParams, authService, itemsService, dataService, mappingsService) {
        this.actionSheeCtrl = actionSheeCtrl;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.itemsService = itemsService;
        this.dataService = dataService;
        this.mappingsService = mappingsService;
        this.commentsLoaded = false;
    }
    ThreadCommentsPage.prototype.ngOnInit = function () {
        var self = this;
        self.threadKey = self.navParams.get('threadKey');
        self.commentsLoaded = false;
        self.dataService.getThreadCommentsRef(self.threadKey).once('value', function (snapshot) {
            self.comments = self.mappingsService.getComments(snapshot);
            self.commentsLoaded = true;
        }, function (error) { });
    };
    ThreadCommentsPage.prototype.createComment = function () {
        var _this = this;
        var self = this;
        var modalPage = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__comment_create_comment_create__["a" /* CommentCreatePage */], {
            threadKey: this.threadKey
        });
        modalPage.onDidDismiss(function (commentData) {
            if (commentData) {
                var commentVals = commentData.comment;
                var commentUser = commentData.user;
                var createdComment = {
                    key: commentVals.key,
                    thread: commentVals.thread,
                    text: commentVals.text,
                    user: commentUser,
                    dateCreated: commentVals.dateCreated,
                    votesUp: null,
                    votesDown: null
                };
                self.comments.push(createdComment);
                self.scrollToBottom();
                var toast = _this.toastCtrl.create({
                    message: 'Comment created',
                    duration: 2000,
                    position: 'top'
                });
                toast.present();
            }
        });
        modalPage.present();
    };
    ThreadCommentsPage.prototype.scrollToBottom = function () {
        this.content.scrollToBottom();
    };
    ThreadCommentsPage.prototype.vote = function (like, comment) {
        var self = this;
        self.dataService.voteComment(comment.key, like, self.authService.getLoggedInUser().uid).then(function () {
            self.dataService.getCommentsRef().child(comment.key).once('value').then(function (snapshot) {
                comment = self.mappingsService.getComment(snapshot, comment.key);
                self.itemsService.setItem(self.comments, function (c) { return c.key === comment.key; }, comment);
            });
        });
    };
    ThreadCommentsPage.prototype.showCommentActions = function () {
        var self = this;
        var actionSheet = self.actionSheeCtrl.create({
            title: 'Thread Actions',
            buttons: [
                {
                    text: 'Add to favorites',
                    icon: 'heart',
                    handler: function () {
                        self.addThreadToFavorites();
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'close-circle',
                    role: 'cancel',
                    handler: function () { }
                }
            ]
        });
        actionSheet.present();
    };
    ThreadCommentsPage.prototype.addThreadToFavorites = function () {
        var self = this;
        var currentUser = self.authService.getLoggedInUser();
        if (currentUser != null) {
            self.dataService.addThreadToFavorites(currentUser.uid, self.threadKey)
                .then(function () {
                var toast = self.toastCtrl.create({
                    message: 'Added to favorites',
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            });
        }
        else {
            var toast = self.toastCtrl.create({
                message: 'This action is available only for authenticated users',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], ThreadCommentsPage.prototype, "content", void 0);
    ThreadCommentsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Projects\Attendant\src\pages\thread-comments\thread-comments.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Comments</ion-title>\n        <ion-buttons end>\n            <button ion-button (click)="showCommentActions()">\n        <ion-icon name="options"></ion-icon>\n      </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div *ngIf="!commentsLoaded">\n        <img src="assets/images/ring.gif" style="display:block; margin:auto" />\n    </div>\n    <ion-list *ngIf="commentsLoaded">\n        <ion-item *ngFor="let comment of comments" text-wrap>\n            <ion-card>\n\n                <ion-item>\n                    <ion-avatar item-left>\n                        <forum-user-avatar [user]="comment.user"></forum-user-avatar>\n                    </ion-avatar>\n                    <h2>{{comment.user.username}}</h2>\n                    <p>{{comment.dateCreated | date:\'medium\'}}</p>\n                </ion-item>\n\n                <ion-card-content class="left-border-primary">\n                    <p>{{comment.text}}</p>\n                </ion-card-content>\n\n                <ion-row class="left-border-primary">\n                    <ion-col>\n                        <button ion-button primary clear small (click)="vote(true,comment)">\n        <ion-icon name="arrow-dropup"></ion-icon>\n        <div>{{comment.votesUp}}</div>\n      </button>\n                    </ion-col>\n                    <ion-col>\n                        <button ion-button primary clear small (click)="vote(false,comment)">\n        <ion-icon name="arrow-dropdown"></ion-icon>\n        <div>{{comment.votesDown}}</div>\n      </button>\n                    </ion-col>\n                    <ion-col center text-center>\n                        <ion-note>\n                            {{comment.dateCreated | date:"MM/dd/yy"}}\n                        </ion-note>\n                    </ion-col>\n                </ion-row>\n\n            </ion-card>\n        </ion-item>\n    </ion-list>\n    \n    <ion-fab right bottom>\n        <button ion-fab color="primary"><ion-icon name="create" (click)="createComment()"></ion-icon></button>\n    </ion-fab>\n</ion-content>'/*ion-inline-end:"C:\Projects\Attendant\src\pages\thread-comments\thread-comments.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_5__shared_services_items_service__["a" /* ItemsService */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_6__shared_services_mappings_service__["a" /* MappingsService */]])
    ], ThreadCommentsPage);
    return ThreadCommentsPage;
}());

//# sourceMappingURL=thread-comments.js.map

/***/ }),

/***/ 477:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentCreatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_data_service__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CommentCreatePage = /** @class */ (function () {
    function CommentCreatePage(nav, navParams, loadingCtrl, viewCtrl, fb, authService, dataService) {
        this.nav = nav;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.fb = fb;
        this.authService = authService;
        this.dataService = dataService;
        this.loaded = false;
    }
    CommentCreatePage.prototype.ngOnInit = function () {
        this.threadKey = this.navParams.get('threadKey');
        this.createCommentForm = this.fb.group({
            'comment': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(10)])]
        });
        this.comment = this.createCommentForm.controls['comment'];
        this.loaded = true;
    };
    CommentCreatePage.prototype.cancelNewComment = function () {
        this.viewCtrl.dismiss();
    };
    CommentCreatePage.prototype.onSubmit = function (commentForm) {
        var self = this;
        if (this.createCommentForm.valid) {
            var loader_1 = this.loadingCtrl.create({
                content: 'Posting comment...',
                dismissOnPageChange: true
            });
            loader_1.present();
            var uid_1 = self.authService.getLoggedInUser().uid;
            self.dataService.getUsername(uid_1).then(function (snapshot) {
                var username = snapshot.val();
                var commentRef = self.dataService.getCommentsRef().push();
                var commentkey = commentRef.key;
                var user = { uid: uid_1, username: username };
                var newComment = {
                    key: commentkey,
                    text: commentForm.comment,
                    thread: self.threadKey,
                    user: user,
                    dateCreated: new Date().toString(),
                    votesUp: null,
                    votesDown: null
                };
                self.dataService.submitComment(self.threadKey, newComment)
                    .then(function (snapshot) {
                    loader_1.dismiss()
                        .then(function () {
                        self.viewCtrl.dismiss({
                            comment: newComment,
                            user: user
                        });
                    });
                }, function (error) {
                    // The Promise was rejected.
                    console.error(error);
                    loader_1.dismiss();
                });
            });
        }
    };
    CommentCreatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Projects\Attendant\src\pages\comment-create\comment-create.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>New Comment</ion-title>\n        <ion-buttons start>\n            <button ion-button (click)="cancelNewComment()">\n        <ion-icon name="arrow-back"></ion-icon> Cancel\n      </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <form [formGroup]="createCommentForm" (ngSubmit)="onSubmit(createCommentForm.value)" *ngIf="loaded">\n        <ion-item [class.error]="!comment.valid && comment.touched">\n            <ion-label floating>Comment</ion-label>\n            <ion-textarea [formControl]="comment" rows="10"></ion-textarea>\n        </ion-item>\n        <div *ngIf="comment.hasError(\'required\') && comment.touched" class="error-box">* Comment is required.</div>\n        <div *ngIf="comment.hasError(\'minlength\') && comment.touched" class="error-box">* Type at least 100 characters.</div>\n        <br/><br/>\n        <button ion-button type="submit" class="custom-button" [disabled]="!createCommentForm.valid" block>Submit</button>\n    </form>\n</ion-content>'/*ion-inline-end:"C:\Projects\Attendant\src\pages\comment-create\comment-create.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_data_service__["a" /* DataService */]])
    ], CommentCreatePage);
    return CommentCreatePage;
}());

//# sourceMappingURL=comment-create.js.map

/***/ }),

/***/ 478:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_data_service__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, loadingCtrl, actionSheeCtrl, authService, dataService) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.actionSheeCtrl = actionSheeCtrl;
        this.authService = authService;
        this.dataService = dataService;
        this.userDataLoaded = false;
        this.userProfile = {};
        this.firebaseAccount = {};
        this.userStatistics = {};
    }
    ProfilePage.prototype.ngOnInit = function () {
        this.loadUserProfile();
    };
    ProfilePage.prototype.loadUserProfile = function () {
        var self = this;
        self.userDataLoaded = false;
        self.getUserData().then(function (snapshot) {
            var userData = snapshot.val();
            self.getUserImage().then(function (url) {
                self.userProfile = {
                    username: userData.username,
                    dateOfBirth: userData.dateOfBirth,
                    image: url,
                    totalFavorites: userData.hasOwnProperty('favorites') === true ?
                        Object.keys(userData.favorites).length : 0
                };
                self.user = {
                    uid: self.firebaseAccount.uid,
                    username: userData.username
                };
                self.userDataLoaded = true;
            }).catch(function (error) {
                console.log(error.code);
                self.userProfile = {
                    username: userData.username,
                    dateOfBirth: userData.dateOfBirth,
                    image: 'assets/images/profile.png',
                    totalFavorites: userData.hasOwnProperty('favorites') === true ?
                        Object.keys(userData.favorites).length : 0
                };
                self.userDataLoaded = true;
            });
        });
        self.getUserThreads();
        self.getUserComments();
    };
    ProfilePage.prototype.getUserData = function () {
        var self = this;
        self.firebaseAccount = self.authService.getLoggedInUser();
        return self.dataService.getUser(self.authService.getLoggedInUser().uid);
    };
    ProfilePage.prototype.getUserImage = function () {
        var self = this;
        return self.dataService.getStorageRef().child('images/' + self.firebaseAccount.uid + '/profile.png').getDownloadURL();
    };
    ProfilePage.prototype.getUserThreads = function () {
        var self = this;
        self.dataService.getUserThreads(self.authService.getLoggedInUser().uid)
            .then(function (snapshot) {
            var userThreads = snapshot.val();
            if (userThreads !== null) {
                self.userStatistics.totalThreads = Object.keys(userThreads).length;
            }
            else {
                self.userStatistics.totalThread = 0;
            }
        });
    };
    ProfilePage.prototype.getUserComments = function () {
        var self = this;
        self.dataService.getUserComments(self.authService.getLoggedInUser().uid)
            .then(function (snapshot) {
            var userComments = snapshot.val();
            if (userComments !== null) {
                self.userStatistics.totalComments = Object.keys(userComments).length;
            }
            else {
                self.userStatistics.totalComments = 0;
            }
        });
    };
    ProfilePage.prototype.openImageOptions = function () {
        var self = this;
        var actionSheet = self.actionSheeCtrl.create({
            title: 'Upload new image from',
            buttons: [
                {
                    text: 'Camera',
                    icon: 'camera',
                    handler: function () {
                        self.openCamera(__WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Album',
                    icon: 'folder-open',
                    handler: function () {
                        self.openCamera(__WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].PictureSourceType.PHOTOLIBRARY);
                    }
                }
            ]
        });
        actionSheet.present();
    };
    ProfilePage.prototype.openCamera = function (pictureSourceType) {
        var self = this;
        var options = {
            quality: 95,
            destinationType: __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].DestinationType.DATA_URL,
            sourceType: pictureSourceType,
            encodingType: __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].EncodingType.PNG,
            targetWidth: 400,
            targetHeight: 400,
            saveToPhotoAlbum: true,
            correctOrientation: true
        };
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].getPicture(options).then(function (imageData) {
            var b64toBlob = function (b64Data, contentType, sliceSize) {
                if (contentType === void 0) { contentType = ''; }
                if (sliceSize === void 0) { sliceSize = 512; }
                var byteCharacters = atob(b64Data);
                var byteArrays = [];
                for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    var slice = byteCharacters.slice(offset, offset + sliceSize);
                    var byteNumbers = new Array(slice.length);
                    for (var i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }
                    var byteArray = new Uint8Array(byteNumbers);
                    byteArrays.push(byteArray);
                }
                var blob = new Blob(byteArrays, { type: contentType });
                return blob;
            };
            var capturedImage = b64toBlob(imageData, 'image/png');
            self.startUploading(capturedImage);
        }, function (error) {
            console.log('ERROR -> ' + JSON.stringify(error));
        });
    };
    ProfilePage.prototype.reload = function () {
        this.loadUserProfile();
    };
    ProfilePage.prototype.startUploading = function (file) {
        var self = this;
        var uid = self.authService.getLoggedInUser().uid;
        var progress = 0;
        // display loader
        var loader = this.loadingCtrl.create({
            content: 'Uploading image..',
        });
        loader.present();
        // Upload file and metadata to the object 'images/mountains.jpg'
        var metadata = {
            contentType: 'image/png',
            name: 'profile.png',
            cacheControl: 'no-cache',
        };
        var uploadTask = self.dataService.getStorageRef().child('images/' + uid + '/profile.png').put(file, metadata);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed', function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, function (error) {
            loader.dismiss().then(function () {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            });
        }, function () {
            loader.dismiss().then(function () {
                // Upload completed successfully, now we can get the download URL
                var downloadURL = uploadTask.snapshot.downloadURL;
                self.dataService.setUserImage(uid);
                self.reload();
            });
        });
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Projects\Attendant\src\pages\profile\profile.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n        <ion-icon name=\'menu\'></ion-icon>\n    </button>\n        <ion-title>Profile</ion-title>\n        <ion-buttons end>\n            <button ion-button (click)="openImageOptions()">\n            <ion-icon name="camera"></ion-icon>\n      </button>\n            <button ion-button (click)="reload()">\n        <ion-icon name="refresh"></ion-icon>\n      </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <div *ngIf="!userDataLoaded">\n        <img src="assets/images/ring.gif" style="display:block; margin:auto" />\n    </div>\n\n    <ion-list no-border *ngIf="userDataLoaded">\n\n        <ion-list-header>\n            Basic Info\n        </ion-list-header>\n        <ion-item>\n            <ion-thumbnail item-left>\n                <!--<img src="{{userProfile.image}}">-->\n                <forum-user-avatar [user]="user" *ngIf="userDataLoaded"></forum-user-avatar>\n            </ion-thumbnail>\n            <h2>{{userProfile.username}}</h2>\n            <p>{{firebaseAccount.email}}</p>\n        </ion-item>\n\n        <ion-item>\n            <ion-icon name=\'calendar\' item-left></ion-icon>\n            Date of Birth\n            <ion-note item-right>\n                {{userProfile.dateOfBirth}}\n            </ion-note>\n        </ion-item>\n\n        <ion-item>\n            <ion-icon name=\'cloud-upload\' item-left></ion-icon>\n            <ion-note item-right>\n                {{firebaseAccount.U}}\n            </ion-note>\n        </ion-item>\n\n    </ion-list>\n\n\n    <ion-list *ngIf="userDataLoaded">\n\n        <ion-list-header>\n            Activity\n        </ion-list-header>\n\n        <ion-item>\n            # Threads\n            <ion-icon name=\'text\' item-left></ion-icon>\n            <ion-badge item-right>{{userStatistics.totalThreads}}</ion-badge>\n        </ion-item>\n\n        <ion-item>\n            # Comments\n            <ion-icon name=\'quote\' item-left></ion-icon>\n            <ion-badge item-right>{{userStatistics.totalComments}}</ion-badge>\n        </ion-item>\n        <ion-item>\n            # Favorites\n            <ion-icon name=\'heart\' item-left></ion-icon>\n            <ion-badge item-right>{{userProfile.totalFavorites}}</ion-badge>\n        </ion-item>\n\n    </ion-list>\n</ion-content>'/*ion-inline-end:"C:\Projects\Attendant\src\pages\profile\profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_data_service__["a" /* DataService */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage.prototype.openUrl = function (url) {
        var browser = new __WEBPACK_IMPORTED_MODULE_2_ionic_native__["b" /* InAppBrowser */](url, '_blank', 'location=yes');
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Projects\Attendant\src\pages\about\about.html"*/'<ion-header>\n    <ion-navbar>\n        <button ion-button menuToggle>\n        <ion-icon name=\'menu\'></ion-icon>\n    </button>\n        <ion-title>About</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content padding>\n    <ion-card>\n        <img src="assets/images/wordpress.png" />\n        <ion-card-content>\n            <ion-card-title>\n                chsakell\'s Blog\n            </ion-card-title>\n            <p>\n                This app is a genuine contribution by Chris Sakellarios. Step by step walkthrough on how to build hybrid-mobile apps using\n                Ionic 2, Angular 2 and Firebase\n            </p>\n        </ion-card-content>\n        <ion-row no-padding>\n            <ion-col>\n                <button ion-button clear small danger>\n                <ion-icon name=\'book\'></ion-icon>\n                Post\n                </button>\n        </ion-col>\n            <ion-col text-center>\n                <button ion-button clear small danger (click)="openUrl(\'https://twitter.com/chsakellsblog\')">\n                <ion-icon name=\'twitter\'></ion-icon>\n                Twitter\n                </button>\n            </ion-col>\n            <ion-col text-center>\n                <button ion-button clear small danger (click)="openUrl(\'https://facebook.com/chsakells.blog\')">\n                <ion-icon name=\'facebook\'></ion-icon>\n                Facebook\n                </button>\n            </ion-col>\n        </ion-row>\n    </ion-card>\n    <ion-card>\n        <img src="assets/images/github.jpg" />\n        <ion-card-content>\n            <ion-card-title>\n                Github repository\n            </ion-card-title>\n            <p>\n                Application\'s source code is fully available on Github and distributed under MIT licence.\n            </p>\n        </ion-card-content>\n        <ion-row no-padding>\n            <ion-col>\n                <button ion-button clear small danger (click)="openUrl(\'https://github.com/chsakell/ionic2-angular2-firebase\')">\n                <ion-icon name=\'git-network\'></ion-icon>\n                Code\n                </button>\n        </ion-col>\n            <ion-col text-center>\n                <button ion-button clear small danger>\n                <ion-icon name=\'share\'></ion-icon>\n                Share\n                </button>\n            </ion-col>\n        </ion-row>\n    </ion-card>\n    <ion-card>\n        <img src="assets/images/firebase.png" />\n        <ion-card-content>\n            <ion-card-title>\n                Built on Firebase\n            </ion-card-title>\n            <p>\n                Application makes use of the powerfull Firebase data store.\n            </p>\n        </ion-card-content>\n    </ion-card>\n</ion-content>'/*ion-inline-end:"C:\Projects\Attendant\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signup_signup__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_data_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_services_auth_service__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginPage = /** @class */ (function () {
    function LoginPage(nav, loadingCtrl, toastCtrl, fb, dataService, authService) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.fb = fb;
        this.dataService = dataService;
        this.authService = authService;
    }
    LoginPage.prototype.ngOnInit = function () {
        this.loginFirebaseAccountForm = this.fb.group({
            'email': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            'password': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(5)])]
        });
        this.email = this.loginFirebaseAccountForm.controls['email'];
        this.password = this.loginFirebaseAccountForm.controls['password'];
    };
    LoginPage.prototype.onSubmit = function (signInForm) {
        var self = this;
        if (this.loginFirebaseAccountForm.valid) {
            var loader_1 = this.loadingCtrl.create({
                content: 'Signing in firebase..',
                dismissOnPageChange: true
            });
            loader_1.present();
            var user = {
                email: signInForm.email,
                password: signInForm.password
            };
            console.log(user);
            this.authService.signInUser(user.email, user.password)
                .then(function (result) {
                self.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                loader_1.dismiss().then(function () {
                    var toast = self.toastCtrl.create({
                        message: errorMessage,
                        duration: 4000,
                        position: 'top'
                    });
                    toast.present();
                });
            });
        }
    };
    LoginPage.prototype.register = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_4__signup_signup__["a" /* SignupPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Projects\Attendant\src\pages\login\login.html"*/'<ion-header>\n    <ion-navbar hideBackButton>\n        <ion-title>Login</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content padding>\n    <form [formGroup]="loginFirebaseAccountForm" (ngSubmit)="onSubmit(loginFirebaseAccountForm.value)">\n        <ion-item [class.error]="!email.valid && email.touched">\n            <ion-label floating>Email address</ion-label>\n            <ion-input type="text" value="" [formControl]="email"></ion-input>\n        </ion-item>\n        <div *ngIf="email.hasError(\'required\') && email.touched" class="error-box">* Email is required.</div>\n        <div *ngIf="email.hasError(\'pattern\') && email.touched" class="error-box">* Enter a valid email address.</div>\n        <ion-item [class.error]="!password.valid && password.touched">\n            <ion-label floating>Password</ion-label>\n            <ion-input type="password" value="" [formControl]="password"></ion-input>\n        </ion-item>\n        <div *ngIf="password.hasError(\'required\') && password.touched" class="error-box">* Password is required.</div>\n        <div *ngIf="password.hasError(\'minlength\') && password.touched" class="error-box">* Minimum password length is 5.</div>\n        <br/><br/>\n        <button ion-button type="submit" class="custom-button" [disabled]="!loginFirebaseAccountForm.valid" block>Sign in</button>\n        <br/>\n        <button ion-button clear (click)="register()">\n            <ion-icon name=\'flame\'></ion-icon>\n            Register a firebase account</button>\n        <ion-card padding>\n            <img src="assets/images/firebase.png" />\n            <ion-card-content>\n                <ion-card-title>\n                    Built on Firebase\n                </ion-card-title>\n                <p>\n                    Create a Firebase profile for free and use your email and password to sign in to Forum-App\n                </p>\n            </ion-card-content>\n        </ion-card>\n    </form>\n</ion-content>'/*ion-inline-end:"C:\Projects\Attendant\src\pages\login\login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_5__shared_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_6__shared_services_auth_service__["a" /* AuthService */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(486);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_about_about__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_comment_create_comment_create__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_thread_comments_thread_comments__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_thread_create_thread_create__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_threads_threads__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__shared_components_thread_component__ = __webpack_require__(817);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__shared_components_user_avatar_component__ = __webpack_require__(818);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_app_providers__ = __webpack_require__(819);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_platform_browser__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// Pages









// Custom components


// providers


var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* ForumApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_comment_create_comment_create__["a" /* CommentCreatePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_thread_comments_thread_comments__["a" /* ThreadCommentsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_thread_create_thread_create__["a" /* ThreadCreatePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_threads_threads__["a" /* ThreadsPage */],
                __WEBPACK_IMPORTED_MODULE_14__shared_components_thread_component__["a" /* ThreadComponent */],
                __WEBPACK_IMPORTED_MODULE_15__shared_components_user_avatar_component__["a" /* UserAvatarComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* ForumApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_17__angular_platform_browser__["a" /* BrowserModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* ForumApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_comment_create_comment_create__["a" /* CommentCreatePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_thread_comments_thread_comments__["a" /* ThreadCommentsPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_thread_create_thread_create__["a" /* ThreadCreatePage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_threads_threads__["a" /* ThreadsPage */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_16__providers_app_providers__["a" /* APP_PROVIDERS */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 524:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForumApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_data_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_sqlite_service__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__ = __webpack_require__(155);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ForumApp = /** @class */ (function () {
    function ForumApp(platform, dataService, authService, sqliteService, menu, events, modalCtrl) {
        this.dataService = dataService;
        this.authService = authService;
        this.sqliteService = sqliteService;
        this.menu = menu;
        this.events = events;
        this.modalCtrl = modalCtrl;
        var self = this;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            if (window.cordova) {
                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.
                __WEBPACK_IMPORTED_MODULE_2_ionic_native__["g" /* StatusBar */].styleDefault();
                self.watchForConnection();
                self.watchForDisconnect();
                __WEBPACK_IMPORTED_MODULE_2_ionic_native__["f" /* Splashscreen */].hide();
                console.log('in ready..');
                var array = platform.platforms();
                console.log(array);
                self.sqliteService.InitDatabase();
            }
        });
    }
    ForumApp.prototype.watchForConnection = function () {
        var self = this;
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["c" /* Network */].onConnect().subscribe(function () {
            console.log('network connected!');
            // We just got a connection but we need to wait briefly
            // before we determine the connection type.  Might need to wait
            // prior to doing any api requests as well.
            setTimeout(function () {
                console.log('we got a connection..');
                console.log('Firebase: Go Online..');
                self.dataService.goOnline();
                self.events.publish('network:connected', true);
            }, 3000);
        });
    };
    ForumApp.prototype.watchForDisconnect = function () {
        var self = this;
        // watch network for a disconnect
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["c" /* Network */].onDisconnect().subscribe(function () {
            console.log('network was disconnected :-(');
            console.log('Firebase: Go Offline..');
            //self.sqliteService.resetDatabase();
            self.dataService.goOffline();
            self.events.publish('network:connected', false);
        });
    };
    ForumApp.prototype.hideSplashScreen = function () {
        if (__WEBPACK_IMPORTED_MODULE_2_ionic_native__["f" /* Splashscreen */]) {
            setTimeout(function () {
                __WEBPACK_IMPORTED_MODULE_2_ionic_native__["f" /* Splashscreen */].hide();
            }, 100);
        }
    };
    ForumApp.prototype.ngOnInit = function () {
    };
    ForumApp.prototype.ngAfterViewInit = function () {
        var self = this;
        this.authService.onAuthStateChanged(function (user) {
            if (user === null) {
                self.menu.close();
                //self.nav.setRoot(LoginPage);
                var loginodal = self.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */]);
                loginodal.present();
            }
        });
    };
    ForumApp.prototype.openPage = function (page) {
        var viewCtrl = this.nav.getActive();
        // close the menu when clicking a link from the menu
        this.menu.close();
        if (page === 'signup') {
            if (!(viewCtrl.instance instanceof __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignupPage */]))
                this.nav.push(__WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignupPage */]);
        }
    };
    ForumApp.prototype.signout = function () {
        var self = this;
        self.menu.close();
        self.authService.signOut();
    };
    ForumApp.prototype.isUserLoggedIn = function () {
        var user = this.authService.getLoggedInUser();
        return user !== null;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('content'),
        __metadata("design:type", Object)
    ], ForumApp.prototype, "nav", void 0);
    ForumApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Projects\Attendant\src\app\app.html"*/'<ion-menu [content]="content">\n\n    <ion-toolbar>\n\n        <ion-title>Menu</ion-title>\n\n    </ion-toolbar>\n\n    <ion-content>\n\n        <ion-list no-border>\n\n            <ion-list-header>\n\n                Account\n\n            </ion-list-header>\n\n\n\n            <ion-item (click)="openPage(\'signup\')" *ngIf="!isUserLoggedIn()">\n\n                <ion-icon name=\'person-add\' item-left></ion-icon>\n\n                Register\n\n                <ion-icon name=\'arrow-dropright\' item-right secondary></ion-icon>\n\n            </ion-item>\n\n            <ion-item (click)="signout()" *ngIf="isUserLoggedIn()">\n\n                <ion-icon name=\'log-out\' item-left></ion-icon>\n\n                Sign out\n\n                <ion-icon name=\'arrow-dropright\' item-right secondary></ion-icon>\n\n            </ion-item>\n\n        </ion-list>\n\n\n\n    </ion-content>\n\n</ion-menu>\n\n<ion-nav #content [root]="rootPage"></ion-nav>'/*ion-inline-end:"C:\Projects\Attendant\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_3__shared_services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_5__shared_services_sqlite_service__["a" /* SqliteService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
    ], ForumApp);
    return ForumApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(813);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ItemsService = /** @class */ (function () {
    function ItemsService() {
    }
    ItemsService.prototype.getKeys = function (object) {
        return __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.keysIn(object);
    };
    ItemsService.prototype.reversedItems = function (array) {
        return __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.reverse(array);
    };
    ItemsService.prototype.groupByBoolean = function (object, value) {
        var result = 0;
        if (object == null)
            return result;
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.map(__WEBPACK_IMPORTED_MODULE_1_lodash___default.a.shuffle(object), function (val) {
            if (val === value)
                result++;
        });
        return result;
    };
    /*
    Returns object's keys lenght
    */
    ItemsService.prototype.getObjectKeysSize = function (obj) {
        if (obj == null) {
            return 0;
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.size(obj);
        }
    };
    /*
    Removes an item from an array using the lodash library
    */
    ItemsService.prototype.removeItemFromArray = function (array, item) {
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.remove(array, function (current) {
            return JSON.stringify(current) === JSON.stringify(item);
        });
    };
    ItemsService.prototype.removeItems = function (array, predicate) {
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.remove(array, predicate);
    };
    ItemsService.prototype.includesItem = function (array, predicate) {
        var result = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.filter(array, predicate);
        return result.length > 0;
    };
    /*
    Finds a specific item in an array using a predicate and replaces it
    */
    ItemsService.prototype.setItem = function (array, predicate, item) {
        var _oldItem = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.find(array, predicate);
        if (_oldItem) {
            var index = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.indexOf(array, _oldItem);
            array.splice(index, 1, item);
        }
        else {
            array.push(item);
        }
    };
    /*
    Adds an item to zero index
    */
    ItemsService.prototype.addItemToStart = function (array, item) {
        array.splice(0, 0, item);
    };
    /*
    From an array of type T, select all values of type R for property
    */
    ItemsService.prototype.getPropertyValues = function (array, property) {
        var result = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.map(array, property);
        return result;
    };
    /*
    Util method to serialize a string to a specific Type
    */
    ItemsService.prototype.getSerialized = function (arg) {
        return JSON.parse(JSON.stringify(arg));
    };
    ItemsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], ItemsService);
    return ItemsService;
}());

//# sourceMappingURL=items.service.js.map

/***/ }),

/***/ 815:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckedValidator; });
var CheckedValidator = /** @class */ (function () {
    function CheckedValidator() {
    }
    CheckedValidator.isChecked = function (control) {
        var valid = control.value === false || control.value === 'false';
        if (valid) {
            return { isChecked: true };
        }
        return null;
    };
    return CheckedValidator;
}());

//# sourceMappingURL=checked.validator.js.map

/***/ }),

/***/ 816:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailValidator; });
var EmailValidator = /** @class */ (function () {
    function EmailValidator() {
    }
    EmailValidator.isValid = function (control) {
        var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var valid = emailReg.test(control.value);
        if (!valid) {
            return { isValid: true };
        }
        return null;
    };
    return EmailValidator;
}());

//# sourceMappingURL=email.validator.js.map

/***/ }),

/***/ 817:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThreadComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_data_service__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ThreadComponent = /** @class */ (function () {
    function ThreadComponent(dataService) {
        var _this = this;
        this.dataService = dataService;
        this.onViewComments = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        // Notice function declarion to keep the right this reference
        this.onCommentAdded = function (childSnapshot, prevChildKey) {
            console.log(childSnapshot.val());
            var self = _this;
            // Attention: only number of comments is supposed to changed.
            // Otherwise you should run some checks..
            self.thread.comments = childSnapshot.val();
        };
    }
    ThreadComponent.prototype.ngOnInit = function () {
        var self = this;
        self.dataService.getThreadsRef().child(self.thread.key).on('child_changed', self.onCommentAdded);
    };
    ThreadComponent.prototype.ngOnDestroy = function () {
        console.log('destroying..');
        var self = this;
        self.dataService.getThreadsRef().child(self.thread.key).off('child_changed', self.onCommentAdded);
    };
    ThreadComponent.prototype.viewComments = function (key) {
        this.onViewComments.emit(key);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], ThreadComponent.prototype, "thread", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], ThreadComponent.prototype, "onViewComments", void 0);
    ThreadComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'forum-thread',template:/*ion-inline-start:"C:\Projects\Attendant\src\shared\components\thread.component.html"*/'<ion-item text-wrap>\n    <ion-card>\n\n        <ion-item>\n            <ion-avatar item-left>\n                <forum-user-avatar [user]="thread.user"></forum-user-avatar>\n            </ion-avatar>\n            <h2>{{thread.user.username}}</h2>\n            <p>{{thread.dateCreated | date:\'medium\'}}</p>\n        </ion-item>\n\n        <!--<img src="img/advance-card-bttf.png">-->\n        <div class="thread-card-title wordwrap">\n            {{thread.title}}\n        </div>\n        <div class="thread-card-question wordwrap left-border-primary">\n            {{thread.question}}\n        </div>\n\n        <ion-row class="left-border-primary">\n            <ion-col>\n                <button color="primary" clear small (click)="viewComments(thread.key)">\n        <ion-icon name="quote"></ion-icon>\n        <div>{{thread.comments}} Comments</div>\n      </button>\n            </ion-col>\n            <ion-col center text-center>\n                <ion-note>\n                    {{thread.category}}\n                </ion-note>\n            </ion-col>\n        </ion-row>\n    </ion-card>\n</ion-item>'/*ion-inline-end:"C:\Projects\Attendant\src\shared\components\thread.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_data_service__["a" /* DataService */]])
    ], ThreadComponent);
    return ThreadComponent;
}());

//# sourceMappingURL=thread.component.js.map

/***/ }),

/***/ 818:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserAvatarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_native__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_data_service__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserAvatarComponent = /** @class */ (function () {
    function UserAvatarComponent(dataService) {
        this.dataService = dataService;
        this.imageLoaded = false;
    }
    UserAvatarComponent.prototype.ngOnInit = function () {
        var self = this;
        var firebaseConnected = self.dataService.isFirebaseConnected();
        if (self.user.uid === 'default' || !firebaseConnected) {
            self.imageUrl = 'assets/images/profile.png';
            self.imageLoaded = true;
        }
        else {
            self.dataService.getStorageRef().child('images/' + self.user.uid + '/profile.png').getDownloadURL().then(function (url) {
                self.imageUrl = url.split('?')[0] + '?alt=media' + '&t=' + (new Date().getTime());
                self.imageLoaded = true;
            });
        }
        /*
    let defaultUrl = self.dataService.getDefaultImageUrl();
    if (defaultUrl == null) {
        self.imageUrl = 'images/profile.png';
        self.imageLoaded = true;
        console.log('get from firebase');
        /*
        self.dataService.getStorageRef().child('images/' + self.user.uid + '/profile.png').getDownloadURL().then(function (url) {
            self.imageUrl = url.split('?')[0] + '?alt=media' + '&t=' + (new Date().getTime());
            self.imageLoaded = true;
        });
        
    } else {
        this.imageUrl = defaultUrl.replace('default', self.user.uid) + '&t=' + (new Date().getTime());
        self.imageLoaded = true;
    }*/
    };
    UserAvatarComponent.prototype.zoom = function () {
        __WEBPACK_IMPORTED_MODULE_1_ionic_native__["d" /* PhotoViewer */].show(this.imageUrl, this.user.username, { share: false });
    };
    UserAvatarComponent.prototype.getUserImage = function () {
        var self = this;
        return self.dataService.getStorageRef().child('images/' + self.user.uid + '/profile.png').getDownloadURL();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], UserAvatarComponent.prototype, "user", void 0);
    UserAvatarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'forum-user-avatar',
            template: " <img *ngIf=\"imageLoaded\" src=\"{{imageUrl}}\" (click)=\"zoom()\">"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_data_service__["a" /* DataService */]])
    ], UserAvatarComponent);
    return UserAvatarComponent;
}());

//# sourceMappingURL=user-avatar.component.js.map

/***/ }),

/***/ 819:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_PROVIDERS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_services_auth_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_data_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_sqlite_service__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_mappings_service__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_items_service__ = __webpack_require__(66);





var APP_PROVIDERS = [
    __WEBPACK_IMPORTED_MODULE_0__shared_services_auth_service__["a" /* AuthService */],
    __WEBPACK_IMPORTED_MODULE_1__shared_services_data_service__["a" /* DataService */],
    __WEBPACK_IMPORTED_MODULE_4__shared_services_items_service__["a" /* ItemsService */],
    __WEBPACK_IMPORTED_MODULE_2__shared_services_sqlite_service__["a" /* SqliteService */],
    __WEBPACK_IMPORTED_MODULE_3__shared_services_mappings_service__["a" /* MappingsService */]
];
//# sourceMappingURL=app.providers.js.map

/***/ })

},[481]);
//# sourceMappingURL=main.js.map