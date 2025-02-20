import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { quizCategories } from "../../data/quizCategories";

const BannerQuiz = ({setIsOpen}) => {
  const navigate = useNavigate();
  return (
    <div>
      <AnimatePresence>
        {
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 ,stiffness:100}}
            className="absolute top-0 shadow-lg flex items-center flex-wrap sm:justify-around shadow-purple-300  left-0 w-full h-full bg-white/90 backdrop-blur-md px-2 sm:px-6 rounded-2xl overflow-y-auto">
           {
            quizCategories.map((category,i)=>(
                <div className= {`flex flex-col  w-full sm:w-auto border-b border-b-gray-500 sm:border-b-0`}>
                    <p className=" font-bold  text-sm sm:text-xl">{category.category}</p>
                    <p className=" leading-3 text-[0.7rem]  sm:text-[0.75rem] text-gray-400">{category.description}</p>
                    <div className=" sm:mt-4 mt-1 text-[0.75rem] leading-3 sm:text-sm  gap-y-1 ">{
                        category.quizzes.map((item,i)=>(
                            <Link to={item.link}>
                            <div  onClick={()=>setIsOpen(false)} className= {`hover:underline ${item?.status==="available" ? "bg-green-100":item?.status==="willmaking"? "bg-yellow-100":"bg-gray-100"}`}>{item.name}</div>
                            </Link>
                        ))
                    }</div>
                </div>
                
            ))
           }
          </motion.div>
        }
      </AnimatePresence>
    </div>
  );
};

export default BannerQuiz;
