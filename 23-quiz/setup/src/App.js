import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'

function App() {
  const {waiting, loading, index, correct, questions, nextQuestion, checkAnswer} = useGlobalContext();

  if(waiting){
    return <SetupForm />
  }

  if(loading){
    return <Loading />
  }

  console.log(questions);
  const {question, correct_answer, incorrect_answers} = questions[index];
  // const answers = [...incorrect_answers, correct_answer];
  // By default in api last one is our answer always so to randomize answer
  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if(tempIndex === 3){
    answers.push(correct_answer);
  }else{
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers: {correct} / {index}
        </p>
        <article className="container">
          {/* As question is coming as html, so we have to display in string */}
          <h2 dangerouslySetInnerHTML={{__html: question}}/>
          <div className="btn-container">
            {
              answers.map((answer, index) => {
                return(
                  <button className="answer-btn" key={index} onClick={() => checkAnswer(correct_answer === answer)} dangerouslySetInnerHTML={{__html: answer}} />
                )
              })
            }
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>next question</button>
      </section>
    </main>
  )
}

export default App
