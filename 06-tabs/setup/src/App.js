import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'

const url = 'https://course-api.com/react-tabs-project'

function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [index, setIndex] = useState(0);

  const fetchJobs = async() => {
    const res = await fetch(url);
    const newJobs = await res.json();
    setJobs(newJobs);
    setLoading(false);
  }

  useEffect(() => {
    fetchJobs();
  },[]);

  if(loading){
    return(
      <section className='section loading'>
        <h1>Loading...</h1>
      </section>
    )
  }

  const {company, dates, title, duties} = jobs[index];
  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {
            jobs.map((job, idx) => {
              return(
                <button
                key={job.id}
                onClick={() => setIndex(idx)}
                className={`job-btn ${idx === index && 'active-btn'}`}
                >
                  {job.company}
                </button>
              )
            })
          }
        </div>
      
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className='job-date'>{dates}</p>
          {
            duties.map((duty, idx) => {
              return(
                <div key={idx} className="job-desc">
                  <FaAngleDoubleRight className='job-icon'></FaAngleDoubleRight>
                  <p>{duty}</p>
                </div>
              )
            })
          }
        </article>
      </div>
      <button className="btn">more info</button>
    </section>
  )
}

export default App
