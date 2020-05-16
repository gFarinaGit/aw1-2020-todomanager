import React from 'react';

const icon =
    <svg className="bi bi-check-box" width="30" height="30" viewBox="0 0 16 16" fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd"
              d="M15.354 2.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L8 9.293l6.646-6.647a.5.5 0 01.708 0z"
              clipRule="evenodd"/>
        <path fillRule="evenodd"
              d="M1.5 13A1.5 1.5 0 003 14.5h10a1.5 1.5 0 001.5-1.5V8a.5.5 0 00-1 0v5a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5V3a.5.5 0 01.5-.5h8a.5.5 0 000-1H3A1.5 1.5 0 001.5 3v10z"
              clipRule="evenodd"/>
    </svg>;

const usrImg =
    <svg className="bi bi-people-circle" width="30" height="30" viewBox="0 0 16 16" fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
        <path
            d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z"/>
        <path fillRule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
        <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clipRule="evenodd"/>
    </svg>;

const sharedImg =
    <svg className="bi bi-people-circle user-image" width="20" height="20" viewBox="0 0 16 16"
         fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z"/>
        <path fillRule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
        <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clipRule="evenodd"/>
    </svg>;

const editImg =
    <svg className="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd"
              d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"
              clipRule="evenodd"/>
        <path fillRule="evenodd"
              d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z"
              clipRule="evenodd"/>
    </svg>;

const deleteImg =
    <svg className="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
         xmlns="http://www.w3.org/2000/svg">
        <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
        <path fillRule="evenodd"
              d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          clipRule="evenodd"/>
    </svg>


export { icon, usrImg, sharedImg, editImg, deleteImg }