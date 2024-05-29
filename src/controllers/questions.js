const CREATE_QUESTION = async (req, res) => {
    try {
      const question = new QuestionModel({
        id: uuidv4(),
        ...req.body,
      });
  
      console.log(question)
  
      const response = await question.save([]);
  
      
  
      return res
        .status(201)
        .json({ status: "Question was added", response: response });
    } catch (err) {
      console.log("HANDLED ERROR: ", err);
      return res.status(500).json({ message: "error happend" });


    }
 
  };

  
const GET_ALL_QUESTIONS = async (req, res) => {
  const questionList=[]

  try {
    questionList.unshift({
     id,
     user_id,
     replies:[],
     likes:[]

    })
    const questions = await QuestionModel.find()//({ userId: req.body.userId });
    return res
    .json({ questions: questions});
    
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(500).json({ message: "error happend" });
  }
};

  export{
    CREATE_QUESTION,GET_ALL_QUESTIONS 
  }