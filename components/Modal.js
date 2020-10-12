import React from 'react'


function Modal({children,title,show,toggleModal}) {
    
    return (
        <div className={`${show ? 'opacity-1' : 'opacity-0 pointer-events-none'} z-20  p fixed w-full max-h-full top-0 left-0 flex items-center justify-center`}>
        <div className="modal-overlay absolute w-full max-h-full bg-gray-900 opacity-50"></div>
        
        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          
          <div onClick={() => toggleModal(false)} className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
            <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
            <span className="text-sm">(Esc)</span>
          </div>
    
          
          <div className="modal-content max-h-full overflow-scroll py-4 text-left px-6">
     
            <div className="flex justify-between items-center pb-3">
              <p className="text-2xl text-teal-900 font-bold">{title}</p>
              <div className="modal-close cursor-pointer z-50">
                <svg onClick={() => toggleModal(false)} className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
              </div>
            </div>
    
         {children}
    
            
          </div>
        </div>
      </div>
    )
}

export default Modal
