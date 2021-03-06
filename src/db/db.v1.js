import Dexie from "dexie"

const db = new Dexie("QuizQuestions")

const dbSchemaV1 = {
  quizQuestion:
    "++id, name, question, *submittedAnswers, *correctAnswers, correctAnswersCount, currentScore"
}

db.version(1).stores(dbSchemaV1)

export const saveToDB = (
  {
    parentQuizName,
    question,
    submittedAnswers,
    correctAnswers,
    correctAnswersCount,
    currentScore
  },
  onSuccess
) => {
  db.open().catch(err => "Failed to open db: " + (err.stack || err))

  db.quizQuestion
    .put({
      name: parentQuizName,
      question,
      submittedAnswers,
      correctAnswers,
      correctAnswersCount,
      timestamp: new Date().toISOString(),
      score: currentScore
    })
    .then(() => {
      db.quizQuestion.orderBy("id").last(record => console.log(record))
      onSuccess()
    })
}
