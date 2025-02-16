import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PublishIcon from "@mui/icons-material/Publish";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import { MdCancel } from "react-icons/md";
import toast from "react-hot-toast";
import ConformationPopUp from "../../../common/ConformationPopUp";
import { deleteQuiz, getInstructorQuiz, updateOnlyQuiz, updateQuiz } from "../../../../services/operations/quiz.Apis";
import { QUIZ_STATUS } from "../../../../utils/constants";
import { publishQuiz, unPublishQuiz } from "../../../../slices/quizzesSlice";
import { Link } from "react-router-dom";

const Instructor = () => {
  const { instructorQuiz } = useSelector((state) => state.quizzes);
  const {token} = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  console.log("Instrucot quiz : ",instructorQuiz);
  useEffect(()=>{
    const fetchInstructorQuiz = async()=>{
        dispatch(getInstructorQuiz(token))
    }
    if(!instructorQuiz || instructorQuiz.length===0){
      fetchInstructorQuiz();
    }
  },[])
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [conformationModel,setConformationModel] = useState(null);
  // Filter and search quizzes
  const filteredQuizzes = instructorQuiz
    ?.filter(
      (quiz) =>
        quiz.quizName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.quizDesc.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((quiz) => (difficultyFilter ? quiz.difficulty === difficultyFilter : true))
    .filter((quiz) => (statusFilter ? quiz.status === statusFilter : true))
    .sort((a, b) => {
      if (sortOption === "date") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOption === "students") return (b.studentEnrolled?.length || 0) - (a.studentEnrolled?.length || 0);
      return 0;
    });
    const handlePublish = async(quizId)=>{
      //  toast.success("Publish : ",quizId)
      const formData = new FormData();
      formData.append("status",QUIZ_STATUS.PUBLISHED)
      formData.append("quizId",quizId);
      const res = await updateOnlyQuiz(formData,token);
      if(res){
          dispatch(publishQuiz(quizId))
          toast.success("Published : ",quizId);
      }
    }
    const handleUnPublish = async(quizId)=>{
      toast.success("UnPublish: ",quizId)
      const formData = new FormData();
      formData.append("status",QUIZ_STATUS.DRAFT);
      formData.append("quizId",quizId);
      const res = await updateOnlyQuiz(formData,token);
      if(res){
        dispatch(unPublishQuiz(quizId));
        toast.success("UnPublish : ",quizId)
      }
    }
    const handleDelete = async(quizId)=>{
      dispatch(deleteQuiz(quizId,token));
      setConformationModel(null);
    }
    const handleEdit = (quizId)=>{
      toast.error("Currently Not available!")
    }
  return (
   <>
    <Box p={1}>
      {/* Title */}
     <Box  display={"flex"} justifyContent={"space-between"} mb={3}>
       <Typography variant="h5">Instructor's Quizzes</Typography>
       <Typography variant="subtitle1">📊 Total Quizzes: {instructorQuiz?.length}</Typography>
     </Box>

      {/* Filters & Search */}
      <Stack direction={isMobile ? "column" : "row"} spacing={3} mb={3}>
        <TextField
          label="Search Quizzes"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        >
        
        </TextField>
        <FormControl fullWidth>
          <InputLabel>Difficulty</InputLabel>
          <Select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Any">Any</MenuItem>
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Hard">Hard</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)} >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Draft">Draft</MenuItem>
            <MenuItem value="Published">Published</MenuItem>
          </Select>
        </FormControl>
      </Stack>
   
      {/* Table with Responsive Container */}
      <TableContainer component={Paper}   elevation={2} sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow  className=" bg-gray-200">
              <TableCell><strong>Quiz Name</strong></TableCell>
              {!isMobile && <TableCell><strong>Description</strong></TableCell>}
              {!isMobile && <TableCell><strong>Status</strong></TableCell>}
              <TableCell><strong>Duration</strong></TableCell>
              {!isMobile && <TableCell><strong>Difficulty</strong></TableCell>}
              {!isMobile && <TableCell><strong>Students</strong></TableCell>}
              {/* <TableCell><strong>Students</strong></TableCell> */}
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQuizzes?.map((quiz) => (
              <TableRow key={quiz._id}>
                <TableCell>
                  <Link to={`/dashboard/instructor/${quiz._id}`}>
                  <div className=" hover:text-blue-900 flex text-[0.75rem] sm:text-sm">{quiz.quizName}</div>
                  </Link>
                </TableCell>
                {!isMobile && <TableCell>{quiz.quizDesc}</TableCell>}
                {!isMobile && <TableCell>
                  <Chip label={quiz.status} color={quiz.status === "Published" ? "success" : "default"} />
                </TableCell>}
                <TableCell>{quiz.timeDuration} mins</TableCell>
                {!isMobile && <TableCell>
                  <div className={` p-1 text-[0.75rem] sm:text-sm rounded-lg flex justify-center items-center ${quiz?.difficulty==="Hard"?" text-red-600 bg-red-100":
                                      quiz?.difficulty==="Medium"?" text-yellow-600 bg-yellow-100":
                                        quiz?.difficulty==="Easy"?" text-green-600 bg-green-100":" text-gray-600 bg-gray-100" }`}>{quiz.difficulty}</div>
                  </TableCell>}
               {!isMobile &&  <TableCell>{quiz.studentEnrolled?.length || 0}</TableCell>}
                <TableCell>
                  <IconButton onClick={()=>handleEdit(quiz._id)} color="primary"><EditIcon sx={{"fontSize":"16px"}} /></IconButton>
                  <IconButton onClick={()=>setConformationModel({
                    text1:"Delete the Quiz",
                    text2:"This Quiz Will be deleted!",
                    btn1Text:"Delete",
                    btn2Text:"Cancel",
                    btn1Handler:()=>handleDelete(quiz._id),
                    btn2Handler:()=>setConformationModel(null)

                  })} color="error"><DeleteIcon sx={{"fontSize":"16px"}} /></IconButton>
                  {quiz.status === "Draft" ? (
                    <IconButton className=" relative group " onClick={()=>handlePublish(quiz._id)} color="success">
                      <div className=" absolute group-hover:block hidden -top-2 -right-2 bg-black  text-white px-1 rounded-md text-[0.75rem]  sm:text-sm">Publish</div>
                      <PublishIcon sx={{"fontSize":"16px"}}/>
                      </IconButton>
                  ) : (
                    <IconButton className=" relative group" onClick={()=>handleUnPublish(quiz._id)} color="secondary">
                      <div className=" absolute hidden -top-2 bg-black text-white  px-1 rounded-md -right-2 sm:text-sm text-[0.75rem] group-hover:block ">UnPublish</div>
                      <UnpublishedIcon sx={{"fontSize":"16px"}}/>
                      </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    {/* Conformation Pop Up for delete */}
    {conformationModel && (
      <ConformationPopUp modelData={conformationModel}/>
    )}
   </>
  );
};

export default Instructor;
