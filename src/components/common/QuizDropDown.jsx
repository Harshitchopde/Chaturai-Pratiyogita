
const QuizzesDropdown = ({isOpen,setIsOpen,dropdownRef}) => {
    return (
        <div className="relative" ref={dropdownRef}
           >
            <button className="text-black hover:bg-gray-200 rounded-md" 
                onClick={() => setIsOpen(!isOpen)}>
                Quizzes
            </button>

         
        </div>
    );
};

export default QuizzesDropdown;
