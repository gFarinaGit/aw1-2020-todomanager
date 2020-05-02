# aw1-2020-todomanager
Web application developed during the labs in 2020 "Web Application I" course at PoliTO

### How to use
Node required, so works fine on linux and macOS.
* Clone this repository `git clone https://github.com/gFarinaGit/aw1-2020-todomanager`
* Move into server folder `cd aw1-2020-todomanager/server`
* Run `npm install`
* Run the server `node server.js`
 
You can run the server with `nodemon` to automatically refresh it after changes.

### Changelog
Version beta 1.1: 
* added edit mode (still buggy!)
* added delete mode
* added possibility to check a task (still buggy!)
* bug fixes on old features

Version beta 1.2:
* fixed project filters update after operations
* fixed issues on tasks list update after edit
* added possibility to uncheck a task

### Main Issues:
* some ui issues about positioning of edit and delete buttons
* when deadline is more than 20 days from today, it is displayed as expired (bug of `setTimeout()` function) 




