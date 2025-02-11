import { useEffect } from "react"

export const useOnClickOutside = (ref,handler)=>{
    useEffect(()=>{
        // check if the listener function to be called on click/touch events
        const listener = (event) =>{
            // if the click/touch event originated inside the ref element do nothing
            if(!ref.current || ref.current.contains(event.target)){
                return;
            }
            // otherwise caled handler funcation
            handler(event);
        };
    // Add event listeners for mousedown and touchstart events on the document
        document.addEventListener("mousedown",listener);
        document.addEventListener("touchstart",listener);
    // Cleanup function to remove the event listeners when the component unmounts or when the ref/handler dependencies change
        return ()=>{
            document.removeEventListener("mousedown",listener);
            document.removeEventListener("touchstart",listener);
        }

    },[ref,handler])
}